const express =require("express");
const router=express.Router();
//const User=require("../models/user");
//const Product=require("../models/product");
const Order=require("../models/order");
//const transporter = require("../utils/email");
const {jwtAuth,generateToken}=require("../middlewear/jwt");
const orderController=require("../controllers/orderController");

router.get("/review", jwtAuth,orderController.adminView);

router.put("/edit/:id", jwtAuth,orderController.edit);

router.get("/seller",jwtAuth,orderController.sellerView);

router.get("/myorder",jwtAuth,orderController.customerView);

module.exports=router;






// router.get("/review", jwtAuth, async (req, res) => {
//     try{
//     if (req.user.role !== "admin")
//         return res.status(403).json("Not admin");

//     const  od= await Order.find()
//         .populate("address")
//         .populate("items.product")
//         .populate("user");

//     const result = od.flatMap(order =>
//       order.items.map(item => ({
//         _id: item._id,
//         product: item.product,
//         quantity: item.quantity,
//         user: order.user,
//         address: order.address,
//         status: order.status,
//         dstatus: order.dstatus,
//         orderId: order._id
//       }))
//     );

//     res.status(200).json(result);
//     }catch(err){
//         console.log(err);
//         res.status(500).json({error: 'Internal Server Error'});
//     }
// });


// router.put("/edit/:id", jwtAuth, async (req, res) => {
//   try {

//     if (!req.user || !req.user.id) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }
    
//      if (req.user.role === "Customer") {
//       return res.status(403).json({ message: "Not allowed" });
//     }

//     const status = req.body.status?.toUpperCase();

//     if (!["PLACED","SHIPPED","DELIVERED","CANCELLED"].includes(status)) {
//       return res.status(400).json({ message: "Invalid status" });
//     }
//     const result = await Order.findById(req.params.id)
//       .populate("items.product")
//       .populate("user");

//     if (!result) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//    if (!result.items.length || !result.user)
//   {
//       return res.status(400).json({
//         message: " data corrupted"
//       });
//     }

//     // const user = await User.findById(req.user.id);
//     // if (!user) {
//     //   return res.status(401).json({ message: "User not found" });
//     // }

   

//     if (req.user.role === "Seller"){
//       const item=result.items[0];
//       if(!item.product || item.product.seller.toString()!=req.user.id){
//            return res.status(403).json({ message: "Not your product" });
//       }
//     }

//     result.status = status;
//     await result.save();

//     // EMAIL SAFE
//     try {
//       console.log("📧 SENDING MAIL TO:", result.user.email);
//       if (!result.user?.email) {
//       console.log("User email missing. Mail not sent.");
//     } else {
//       await transporter.sendMail({
//       from: '"ProductPlace" <no-reply@productplace.com>', // 👈 ADD THIS
//       to: result.user.email,
//       subject: "Your Order ",
//       text: ` ${result.user.name},

//     Your order for "${result.items[0].product.title}" has been ${status}.

//     Regards,
//     Product Place Team`
//     });
//    }
//     } catch (mailErr) {
//       console.error("MAIL ERROR:", mailErr.message);
//     }

//     res.status(200).json(result);

//   } catch (err) {
//     console.error("EDIT STATUS ERROR:", err);
//     res.status(500).json({ error: err.message });
//   }
// });


// router.get("/seller",jwtAuth,async(req,res)=>{

//     try{
//     if(req.user.role !== "Seller")
//           return res.status(403).json({message: 'user has not recruiter status'});
    
//     const od = await Order.find()
//       .populate("items.product")
//       .populate("user")
//       .populate("address");



//     // ❗ jo job match nahi hui → null ho jaati hai
//     const result = od.flatMap(order =>
//       order.items
//         .filter(item =>
//           item.product &&
//           item.product.seller.toString() === req.user.id
//         )
//         .map(item => ({
//           _id: item._id,
//           product: item.product,
//           quantity: item.quantity,
//           user: order.user,
//           address: order.address,
//           dstatus: order.dstatus,
//           status: order.status,
//           orderId: order._id,
//         }))
//     );

//     res.status(200).json(result);
//   } catch(err){
//     console.log(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }

// });

// router.get("/myorder",jwtAuth,async(req,res)=>{
//     try{
//         const od=await Order.find({user: req.user.id})
//         .populate("items.product")
//         .populate("address");
//         const result = od.flatMap(order =>
//           order.items.map(item => ({
//             _id: item._id,
//             product: item.product,
//             quantity: item.quantity,
//             status: order.status,
            
//             orderId: order._id
//         }))
//       );

//       res.status(200).json(result);
//     }catch(err){
//         console.log(err);
//         res.status(500).json({error: 'Internal Server Error'});
//     }
// });

