require("dotenv").config();
const express=require("express");
const db=require("./db");
const cors=require("cors");
const app=express();

const PORT=process.env.PORT;
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());//body parser

const userRoute=require("./routes/userRoute");
app.use("/user",userRoute);
const productRoute=require("./routes/productRoute");
app.use("/product",productRoute);
const orderRoute=require("./routes/orderRoute");
app.use("/order",orderRoute);
const addressRoute=require("./routes/addressRoute");
app.use("/address",addressRoute);
const cartRoute = require("./routes/cartRoute");
app.use("/cart",cartRoute);
const paymentRoute = require("./routes/paymentRoute");
app.use("/payment",paymentRoute);
app.listen(PORT,()=>{
    console.log("Run");
});


