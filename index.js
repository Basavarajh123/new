

const express = require('express');
const cors=require('cors');
const {open}= require('sqlite');
const sqlite3= require('sqlite3');
const path = require('path');
const dbPath = path.join(__dirname,"User.db");

let database=null;



const app=express();
app.use(express.json());



const inittializeDbAndServer=async()=>{
    try{
        database = await open({
            filename:dbPath,
            driver:sqlite3.Database
        })
    
        app.listen(4000,()=>{
            console.log('Listening at http://localhost:4000')
        
        })

    }catch(error){
        console.log(`DB Error :${error.message}`);
        process.exit(1);
    }
   



}

inittializeDbAndServer();

app.get('/',(req,res)=>{

    res.send('Hello Welcome to Tech World');
})


app.get('/users',async(req,res)=>{
    const sqlQuery=`SELECT * FROM User`
    const data = await database.all(sqlQuery);
    res.send(data);
    
})

app.post("/signup",async(req,res)=>{

    const{name,email,password}= req.body;

    const sqlQuery=`INSERT INTO User(username,email,password)
                                VALUES("${name}","${email}","${password}")
    
    `
    await database.run(sqlQuery);
    res.send('User Added Successfully');
})

app.post("/login", async(req,res)=>{
    const {email,password}= req.body;
    const sqlQuery=`SELECT * FROM User WHERE email="${email}" and password="${password}";`;
    const data = await database.get(sqlQuery);
    if (data!== undefined){
        res.send('User Credentail are Correct');
    }
})



module.exports= app;