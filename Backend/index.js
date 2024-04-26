const express= require("express");

require("dotenv").config();
const cors=require("cors");
const { connection } = require("mongoose");
app=express()


app.use(cors({
    origin:"*"
}))

app.use(express.json());

app.use("/", dragdropRouter)


app.listen(process.env.port, async()=>{
    try{
await connection;
console.log(`port is running on ${process.port.env}`);
    }
    catch(err){
        console.log(err)
    }
})