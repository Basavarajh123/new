

const express = require('express');
const cors=require('cors');
const {open}= require('sqlite');
const sqlite3= require('sqlite3');
const path = require('path');
const dbPath = path.join(__dirname,"User.db");

let database=null;



const app=express();
app.use(express.json());
app.use(cors());


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



module.exports= app;