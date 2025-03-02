const express = require('express');
require("dotenv").config();

const connectDB = require('./dbconnection');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

connectDB().then(()=>{
    console.log("Connected to MongoDB");
}).catch(err =>{
    console.error(err);
});

app.get('/',(req,res)=>{
    res.send('server is running....');
})


app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
