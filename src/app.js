const path=require('path');
const hbs=require('hbs');
const express = require('express');
const app=express();

const portNo=process.env.PORT || 8000;
const staticPath=path.join(__dirname,"../public");
const templatePath=path.join(__dirname,"../template/views");
const partialsPath=path.join(__dirname,"../template/partials"); 

app.set('view engine','hbs');
app.set('views',templatePath);

hbs.registerPartials(partialsPath);
app.use(express.static(staticPath));

app.get("/",(req,res)=>{
    res.render("index");
})
app.get("/about",(req,res)=>{
    res.render("about");
})
app.get("/weather",(req,res)=>{
    res.render("weather");
})
app.get("*",(req,res)=>{
    res.render("404error");
})

app.listen(portNo,()=>{
    console.log(`Listening to port number ${portNo}`);
})