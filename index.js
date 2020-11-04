const express = require('express');

const app = express();

const hostname= '0.0.0.0';
const port = process.env.PORT || 3000;


app.listen(port,hostname,  () =>{

    console.log(  ` http://${hostname}:${port}/`    )
})

app.get('/', (req,res)=>{
    res.send('Hello world')
})