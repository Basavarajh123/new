

const express = require('express');



const app=express();
app.use(express.json());



app.get('/',(req,res)=>{

    res.send('Hello Welcome to Tech World');
})


app.get('/login',(req,res)=>{
    res.send('Wel Come Basavaraj')
})

app.listen(4000,()=>{
    console.log('Listening at port http://localhost:4000');

})

module.exports= app;