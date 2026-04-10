const express =require("express");
const router=express.Router();
const {jwtAuth,generateToken}=require("../middlewear/jwt");
const addressController=require("../controllers/addressController");

router.post("/",jwtAuth,addressController.addressAdd);

router.put("/:id",jwtAuth,addressController.addressUpdate);

router.put("/select/:id",jwtAuth,addressController.addressSelect);

router.delete("/:id",jwtAuth,addressController.addressRemove);

router.get("/list",jwtAuth,addressController.addressList);

module.exports=router;




// router.post("/",jwtAuth,async(req,res)=>{
//     try{
//         if (req.user.role !== "Customer") {
//             return res.status(403).json({ error: "Not allowed" });
//         }
//         const data=req.body;
//         if(data.isActive === true){
//             await Address.updateMany(
//                 {user: req.user.id},
//                 {$set: {isActive: false}}
//             );
//         }
//         const add=await Address.create({...data,user: req.user.id});
//         res.status(200).json("Address added");
//     }catch(err){
//         console.log(err.message);
//         res.status(500).json({error: 'Internal Server Error'});
//     }
// });

// router.put("/:id",jwtAuth,async (req,res)=>{
//     try{
//         if (req.user.role !== "Customer") {
//             return res.status(403).json({ error: "Not allowed" });
//         }
        
//         const id=req.params.id;
//         const updateData={};
//         if(req.body.fullName)updateData.fullName=req.body.fullName;
//         if(req.body.contact)updateData.contact=req.body.contact;
//         if(req.body.addressLine)updateData.addressLine=req.body.addressLine;
//         if(req.body.city)updateData.city=req.body.city;
//         if(req.body.state)updateData.state=req.body.state;
//         if(req.body.pincode)updateData.pincode=req.body.pincode;
//         if(req.body.gender)updateData.gender=req.body.gender;

//         if (req.body.isActive === true) {
//             await Address.updateMany(
//                 { user: req.user.id },
//                 { $set: { isActive: false } }
//             );
//             updateData.isActive = true;
//         }
//         const upd=await Address.findOneAndUpdate(
//             { _id: id,user: req.user.id},
//             {$set: updateData},
//             {new: true}
//         )
//         res.json({ message: "Address updated", upd });
//     }
//     catch(err){
//         console.log(err.message);
//         res.status(500).json({error: 'Internal Server Error'});
//     }
// });

// router.put("/select/:id",jwtAuth,async (req,res)=>{
//     try{
//         if (req.user.role !== "Customer") {
//             return res.status(403).json({ error: "Not allowed" });
//         }
        
//         const id=req.params.id;
//         await Address.updateMany(
//             {user: req.user.id},
//             {$set: {isActive: false}}
//         );
//         const sel=await Address.findOneAndUpdate(
//             { _id: id,user: req.user.id},
//             {$set: {isActive: true}},
//             {new: true}
//         );
//         res.status(200).json(sel);
//     } catch(err){
//         console.log(err);
//         res.status(500).json({error: 'Internal Server Error'});
//     }
// });

// router.delete("/:id",jwtAuth,async (req,res)=>{
//     try{
//         if (req.user.role !== "Customer") {
//             return res.status(403).json({ error: "Not allowed" });
//         }

//         const id=req.params.id;
//         const del=await Address.findByIdAndDelete({_id: id ,user: req.user.id});
//          if(!del){
//             return res.status(404).json({error: 'Address not found'});
//         }
//         console.log("Deleted");
//         res.json({ message: "Address deleted"});
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({error: 'Internal Server Error'});
//     }
// });

// router.get("/list",jwtAuth,async (req,res)=>{
//     try{
//         if (req.user.role !== "Customer") {
//             return res.status(403).json({ error: "Not allowed" });
//         }
//         const add=await Address.find({user: req.user.id});
//         res.status(200).json(add);
//     }catch(err){
//         console.log(err);
//         res.status(500).json({error: 'Internal Server Error'});
//     }
// });



