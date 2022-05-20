const express = require('express');
const nodem=require('nodemon')
const mysql = require('mysql2')

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database:"sakila"
})


connection.connect(function(err) {
  if (err){ throw error} 
  else console.log('You are connected')
  
})

const app=express();
app.use(express.json());

let _dirname="H:\\Desktop\\Node js\\Calculator\\myapp";

let html=`<form action="/test" method="POST" target="/test">
<input type="text" placeholder="First Name" id="fname"/>
<input type="text" placeholder="Last Name" id="lname"/>
<button type="submit">Submit</button>
</form>`;



app.post("/test",(request,response)=>{
 let fname=html.getElementById("fname").value;
  console.log(fname )


  
  const {first_name,last_name}={"first_name":"suri","last_name":"venkat"};

  connection.query(`insert into actor (first_name,last_name) values("${first_name}","${last_name}")`)
  connection.query(`select count(*) as num from actor`,function(err,result){
    let {num}=result[0]
    console.log(num)
    response.send(`${num}`)
  })


  
});

app.get("/date/:id", async (request,response)=>{
  let {id}=request.params;
console.log(id)
  let test=connection.query(`select * from actor where actor_id="${id}"`,function(err,result){
    response.send(result)
  })
  


});




app.get("/date/:id/:name",(request,response)=>{
  let {id,name}=request.params;
  //console.log(test.id);
  connection.query(`Update actor set first_name="${name}" where actor_id=${id}`, function (err, result) {
    // if any error while executing above query, throw error
    if (err) throw err;

    console.log(result)
    response.send("Updated successfully234")
  });
});

app.get("/date",(request,response)=>{
    connection.query("SELECT * FROM actor", function (err, result) {
      // if any error while executing above query, throw error
      if (err) throw err;
      // if there is no error, you have the result
      //let {actor_id,first_name,last_name}=result[0];
      console.log("suri3");
      //console.log(actor_id)
      let dum = `<div><table border="2px">
      <th>actor_id</th>
      <th>first_name</th>
      <th>last_name</th>
      <th>last_update</th>
      <tr>`;

      result.forEach(element => {
        let { actor_id, first_name, last_name, last_update } = element;
        dum +=
          `<td>${actor_id.toString()}</td>
      <td>${first_name}</td>
      <td>${last_name}</td>
      <td>${last_update}</td>
      <tr>`;


      });
      dum += `</table> </div>`;
      response.send(`${dum}`);
    });
  
  console.log("suri")

});

app.get("/page",(request,response)=>{

    let date=new Date();
    response.send(html);

});

app.listen(3000)