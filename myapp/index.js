const express = require('express');

const app=express();

app.get("/date",(request,response)=>{

    let date=new Date();

    
    response.send(`todays date is ${date}`)

});

let _dirname="H:\\Desktop\\Node js\\Calculator\\myapp"
app.get("/page",(request,response)=>{

    let date=new Date();
    response.sendFile('./page.html',{ root: _dirname });

});

app.listen(3000)