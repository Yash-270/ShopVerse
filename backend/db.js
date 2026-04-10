require("dotenv").config();
const mongoose=require("mongoose");
const url=process.env.MONGODB_URL;
console.log("Env check",url);

if(!url){
    console.log();
    process.exit(1);
}

mongoose.connect(url)
    .then(()=>console.log("Mongo Connected"))
    .catch(err=> console.log("MongoDB Error ❌", err));

const db=mongoose.connection
db.on("connected",()=>{
    console.log("MongoDB Connected");
});

db.on("disconnected",()=>{
    console.log("MongoDB disconnected");
});

module.exports=db;