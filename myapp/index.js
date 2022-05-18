const express = require('express');
const mysql = require('mysql2')

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database:"sakila"
})


connection.connect(function(err) {
  if (err){ throw error}
  console.log('You are connected')

  connection.query("SELECT * FROM actor", function (err, result) {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    console.log(result);
  });
  
})

const app=express();

let _dirname="H:\\Desktop\\Node js\\Calculator\\myapp"

app.get("/date",(request,response)=>{

    let date=new Date();

    
    response.send(`todays date is ${date}`)

});

app.get("/page",(request,response)=>{

    let date=new Date();
    response.sendFile("./page.html",{ root: _dirname });

});

app.listen(3300)