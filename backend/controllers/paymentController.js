require("dotenv").config();
const Order=require("../models/order");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET
});

exports.OnlinePayment=async (req,res)=>{

  if(req.user.role !== "Customer") {
      return res.status(403).json({ error: "Not allowed" });
    }
    console.log("KEY:", process.env.RAZORPAY_KEY);
    console.log("SECRET:", process.env.RAZORPAY_SECRET);


  const { amount } = req.body;

  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR"
  });

  res.json(order);
};

exports.CashPayment=async (req,res)=>{

  if(req.user.role !== "Customer") {
      return res.status(403).json({ error: "Not allowed" });
    }
  const { productId, addressId, quantity, totalAmount } = req.body;

  const order = await Order.create({
    user: req.user.id,
    address: addressId,
    items: [
      {
        product: productId,
        quantity
      }
    ],
    totalAmount,
    payment: "COD",
    dstatus: "POSTPAID"
  });

  res.status(200).json(order);
};

exports.verifyPayment=async (req,res)=>{
  
  if(req.user.role !== "Customer") {
      return res.status(403).json({ error: "Not allowed" });
    }
  const {
    productId,
    addressId,
    quantity,
    totalAmount,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body)
    .digest("hex");

  if (expected !== razorpay_signature) {
    return res.status(400).json({ error: "Invalid payment" });
  }

  const order = await Order.create({
    user: req.user.id,
    items: [
      {
        product: productId,
        quantity
      }
    ],
    totalAmount,
    address: addressId,
    paymentId: razorpay_payment_id,
    payment: "ONLINE",
    dstatus: "PREPAID"
  });

  res.status(200).json(order);
};
