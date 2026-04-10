const express =require("express");
const router=express.Router();
const {jwtAuth,generateToken}=require("../middlewear/jwt");
const userController=require("../controllers/userController");

router.post("/signup",userController.signup);

router.post("/login",userController.login);

router.post("/otp-sent",userController.otpSent);

router.post("/otp-verify",userController.otpVerify);

router.put("/forget-password",userController.forgetPassword);

router.get("/profile",jwtAuth,userController.profile);

router.put("/profile/password",jwtAuth,userController.changePassword);

router.put("/profile/update",jwtAuth,userController.updateProfile);

router.put("/profile/keyedit",jwtAuth,userController.keyEdit);

module.exports=router;








// router.post("/signup",async (req,res)=>{
//     try{
//         const {identify,type,name,password,role}=req.body;
    
//         const query =
//             type === "email"
//                 ? { email: identify.toLowerCase() }
//                 : { contact: identify };

//         const user = await User.findOne(query);
//         if (type === "email") {
//           if (!user || user.signupVerify !== true) {
//               return res.status(400).json({ error: "OTP not verified" });
//           }
//         }
//         if (type === "contact") {
//     // agar user exist karta hai to duplicate mat hone do
//         if (user) {
//             return res.status(400).json({ error: "Mobile already registered" });
//         }

//         // naya user create karo
//         const newUser = await User.create({
//             contact: identify,
//             name,
//             password,
//             role: "Customer"
//         });

//         const token = generateToken({
//             id: newUser._id,
//             role: newUser.role
//         });

//         return res.status(200).json({ token });
//     }
//         user.name = name;
//         user.password = password;
//         if (role && ["Customer","admin","Seller"].includes(role)) {
//             user.role = role;
//         } else {
//             user.role = "Customer";
//         }

//        // user.role = role;
//         user.signupVerify = false;

//         await user.save();
//         console.log("data saved")
//         const payload={
//             id: user._id,
//             role: user.role
//         }
//         const token=generateToken(payload);
//         res.status(200).json({token});
//     }
//     catch(err){
//         console.error(err.message);
//         res.status(500).json({error: 'Internal Server Error'});
//     }
// });

// router.post("/login", async(req,res)=>{
//     try{
//         const {identify,type,password}=req.body;

//         // if(!identify || !type || !password){
//         //     return res.status(400).json({ error: "Missing fields" });
//         // }

//         // type = type.toLowerCase();


//         // if(type!="email" && type!="contact"){
//         //     return res.status(400).json({ error: "Invalid login type" });
//         // }
        
//         // identify =
//         // type === "email"
//         //     ? identify.toLowerCase().trim()
//         //     : identify.trim();

//         const query =
//             type === "email"
//             ? { email: identify.toLowerCase() }
//             : { contact: identify };

//         const user=await User.findOne(query);
//         if(!user || !(await user.comparePassword(password))){
//             return res.status(401).json({error: 'Invalid username or Password'});
//         }
//         const payload={
//             id: user._id,
//             role: user.role
//         }
//         const token=generateToken(payload);
//         res.status(200).json({token});
//     }
//     catch(err){
//         console.log(err.message);
//         res.status(500).json({error: 'Internal Server Error'});
//     }
// });

// router.post("/otp-sent", async (req, res) => {
//   try {
//     const { identify, type, purpose } = req.body;

//     if (!identify || !type || !purpose) {
//       return res.status(400).json({ error: "Missing fields" });
//     }

//     if (type === "contact") {
//       return res.status(400).json({
//         message: "Phone OTP is disabled"
//       });
//     }

//     const query =
//       type === "email"
//         ? { email: identify.toLowerCase() }
//         : { contact: identify };

//     let user = await User.findOne(query);

//     if (!user && purpose === "signup") {
//       user = await User.create({
//       name: "temp",   // ✅ required field
//       email: type === "email" ? identify.toLowerCase() : undefined,
//       password: "temp12345",
//       role: "Customer",   
//       signupVerify: false
//   });
// }


//     if (!user) {
//       return res.status(400).json({ error: "Invalid user" });
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     user.otp = otp;
//     user.otpExpire = Date.now() + 10 * 60 * 1000;
//     await user.save();

//     // Send email only when type is email
//     if (type === "email") {
//       try {
//         await transporter.sendMail({
//           from: process.env.MAIL_FROM,   // 👈 IMPORTANT
//           to: user.email,
//           subject:
//             purpose === "signup"
//               ? "Signup verification OTP"
//               : "Password reset OTP",
//           text: `Your OTP is ${otp}`
//         });
//       } catch (mailErr) {
//         console.error("Mail error:", mailErr);
//         return res.status(500).json({ error: "Failed to send OTP email" });
//       }
//     }
    

//     res.status(200).json({ message: "OTP sent" });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });



// router.post("/otp-verify", async (req, res) => {
//   try {
//     let { identify, type, otp, purpose } = req.body;

//     if (!identify || !type || !otp) {
//       return res.status(400).json({ message: "Missing fields" });
//     }

//     type = type.toLowerCase();

//     if (type !== "email") {
//       return res.status(400).json({ message: "Invalid type" });
//     }

//     identify =
//       type === "email"
//         ? identify.toLowerCase().trim()
//         : identify.trim();

//     const query =
//       type === "email"
//         ? { email: identify }
//         : { contact: identify };

//     const user = await User.findOne(query);

//     if (!user || !user.otp || !user.otpExpire) {
//       return res.status(400).json({ message: "OTP not found" });
//     }

//     otp = String(otp).trim();

//     if (user.otp !== otp) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }

//     if (new Date(user.otpExpire).getTime() < Date.now()) {
//       return res.status(400).json({ message: "OTP expired" });
//     }

//     if (purpose === "signup") {
//       user.signupVerify = true;
//     }

//     user.otp = null;
//     user.otpExpire = null;

//     await user.save({ validateBeforeSave: false });

//     res.status(200).json({ message: "OTP verified" });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });


// router.put('/forget-password',async (req,res)=>{
//     try {
//         let {identify,type,password,conf}=req.body;
//         const query =
//             type === "email"
//             ? { email: identify.toLowerCase() }
//             : { contact: identify };
//         if(password !== conf){
//             return res.status(400).json({ message: "Not Matched" });
//         }
//         const user=await User.findOne(query);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         user.password=password;
//         user.otp=null;
//         user.otpExpire=null;

//         await user.save();
//         res.status(200).json({ message: "Password Updated" });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: "Server error" });
//     }
// });

// router.get("/profile",jwtAuth,async(req,res)=>{
//     try{
//         const id= req.user.id;
//         const user=await User.findById(id);
//         res.status(200).json(user);
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({ error: "Server error" });
//     }
// });

// router.put("/profile/password",jwtAuth,async(req,res)=>{
//     try{
//         const {currPass,newPass}= req.body;
//         if(!currPass || !newPass){
//             return res.status(400).json({ error: "Both passwords are required" });
//         }
//         const user=await User.findById(req.user.id);

//         if(!(await user.comparePassword(currPass))){
//             return res.status(404).json({error: 'Invalid Password'});
//         }
//         if(currPass===newPass){
//             return res.status(400).json({ error: "New password must be different" });
//         }

//         user.password= newPass;
//         await user.save();
//         console.log("Password is changed");
//         console.log('data updated');
//         res.status(200).json({Message: " Updated"});
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({ error: "Server error" });
//     }
// });




// router.put("/profile/update",jwtAuth,async(req,res)=>{
//     try{
//         const updateData={};
//         if(req.body.name) updateData.name=req.body.name;
//         if(req.body.age) updateData.age=req.body.age;
//         if(req.body.gender) updateData.gender=req.body.gender;

//         const user=await User.findByIdAndUpdate(
//             req.user.id,
//             {$set: updateData},
//             {new: true}
//         );
//         res.json({message: "Updated Successfully"});
//     }
//      catch(err){
//         console.log(err);
//         res.status(500).json({ error: "Server error" });
//     }
// });

// router.put("/profile/keyedit",jwtAuth, async (req, res) => {
//   try{
//     const { identify, type } = req.body;

//     // const query =
//     //   type === "email"
//     //     ? { email: identify.toLowerCase() }
//     //     : { contact: identify };

//     const user=await User.findById(req.user.id);
//     if (!user) {
//       return res.status(400).json({ error: "Invalid user" });
//     }

//     if(type==="email"){
//         user.email=identify.toLowerCase();
//     }
//     else{
//         user.contact=identify;
//     }
//     await user.save();
    

//     res.json({ message: "Updated Successfully" });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });



// module.exports=router;

// //const user = await User.findOne(query);

    
//     // const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     // user.pendingIdentify = identify;  
//     // user.pendingType = type;         
//     // user.otp = otp;
//     // user.otpExpire = Date.now() + 10 * 60 * 1000;

//     // await user.save();

//     // // mail only if email
//     // if (type === "email") {
//     //   await transporter.sendMail({
//     //     to: identify,
//     //     subject: "OTP",
//     //     text: `Your OTP is ${otp}`
//     //   });
//     // }
//     // router.put("/profile/keyupdate", jwtAuth, async (req, res) => {
// //   try {

// //     const { otp } = req.body;

// //     const user = await User.findById(req.user.id);

// //     if (
// //       !user ||
// //       !user.pendingIdentify ||
// //       user.otp !== String(otp) ||
// //       user.otpExpire < Date.now()
// //     ) {
// //       return res.status(400).json({ message: "Invalid or expired OTP" });
// //     }

// //     if (user.pendingType === "email") {
// //       user.email = user.pendingIdentify.toLowerCase();
// //     } else {
// //       user.contact = user.pendingIdentify;
// //     }

// //     user.pendingIdentify = null;
// //     user.pendingType = null;
// //     user.otp = null;
// //     user.otpExpire = null;

// //     await user.save();

// //     res.json({ message: "Updated Successfully" });

// //   } catch (err) {
// //     console.log(err);
// //     res.status(500).json({ error: "Server error" });
// //   }
// // });