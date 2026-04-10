const Product=require("../models/product");
const Address=require("../models/address");
//const {jwtAuth,generateToken}=require("../middlewear/jwt");
const Cart = require("../models/cart");


exports.productAdd=async (req,res)=>{
    try{
        if(req.user.role!== 'admin' &&  req.user.role!== 'Seller'){
            return res.status(404).json({message: 'user has not admin status'})
        }
        const Prod=new Product({...req.body,seller: req.user.id});
        const savedProduct=await Prod.save();
       // await redisClient.flushAll();
        console.log('data saved');
        res.status(200).json(savedProduct);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

exports.productUpdate=async (req,res)=>{
  try{
    
        if (req.user.role !== 'admin' && req.user.role !== 'Seller') {
            return res.status(403).json({
                message: 'Not authorized'
            });
        }

        const id = req.params.id;
         console.log("EDIT ID:", id);
        const prod = await Product.findById(id);
          console.log("FOUND PRODUCT:", prod);

        // ✅ FIX 1 — check product exists
        if (!prod) {

            return res.status(404).json({
                message: "Product not found"
            });

        }

        // ✅ FIX 2 — check seller safely
        if (
            req.user.role === "Seller" &&
            prod.seller &&
            prod.seller.toString() !== req.user.id
        ) {

            return res.status(403).json({
                message: "Not your product"
            });

        }

        const updateData={};
        if(req.body.title)updateData.title=req.body.title;
        if(req.body.price)updateData.price=req.body.price;
        if(req.body.about)updateData.about=req.body.about;
        if(req.body.image)updateData.image=req.body.image;
        if(req.body.category)updateData.category=req.body.category;
        if(req.body.type)updateData.type=req.body.type;
        if(req.body.brand)updateData.brand=req.body.brand;
        if(req.body.color)updateData.color=req.body.color;
        if(req.body.gender)updateData.gender=req.body.gender;
        if(req.body.skinType)updateData.skinType=req.body.skinType;
        if(req.body.size)updateData.size=req.body.size;
        if(req.body.fabric)updateData.fabric=req.body.fabric;
        const edi=await Product.findByIdAndUpdate(
            id,
            {$set: updateData},
            {new: true}
        )
        res.json({ message: "Product updated", product: edi });
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
};


exports.productRemove=async (req,res)=>{
    try{
        if(req.user.role!== 'admin' &&  req.user.role!== 'Seller'){
            return res.status(404).json({message: 'user has not admin status'})
        }
        const id=req.params.id;
        const prod=await Product.findById(id);

        if (!prod) {

            return res.status(404).json({
                message: "Product not found"
            });

            }

            // ✅ THEN check seller
        if (
            req.user.role === "Seller" &&
            prod.seller &&
            prod.seller.toString() !== req.user.id
        ) {

        return res.status(403).json({
            message: "Not your product"
        });

        }

        // if(req.user.role==="Seller" && prod.seller.toString() !== req.user.id){
        //     return res.status(403).json({ message: "Not your prodcut" });
        // }
        const del=await Product.findByIdAndDelete(id);
         if(!del){
            return res.status(404).json({error: 'Product not found'});
        }
        console.log("Deleted");
        res.status(200).json({ message: "Product deleted successfully" });
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

exports.productList=async (req,res)=>{
    try{
    const {
      category,
      type,
      search,

      fabric,
      size,
      color,
      brand,
      gender,
      skinType,
      minPrice,
      maxPrice
    } = req.query;

    const filter = {};

    if(req.user && req.user.role === "Seller"){
        filter.seller = req.user.id;
    }
   
    if (category) filter.category=category;
    if (type) filter.type=type;
    if (fabric) filter.fabric =fabric;
    if (size) filter.size = size;
    if (color) filter.color = color;
    if (brand) filter.brand = brand;
    if (gender) filter.gender = gender;
    if (skinType) filter.skinType = skinType;


    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { type: { $regex: search, $options: "i" } }
      ];
    }

    if(minPrice || maxPrice){
        filter.price={}
        if(minPrice) filter.price.$gte= Number(minPrice);
        if(maxPrice) filter.price.$lte= Number(maxPrice);
    }

    const prod=await Product.find(filter).sort({created: -1});
     res.json(prod);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};


exports.productId=async (req,res)=>{
    try{
        const id=req.params.id;
        const prod=await Product.findById(id);
        if (!prod) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(prod);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
};



exports.cartAdd=async (req,res)=>{
    try{
        const id=req.params.id;
        const quantity=Number(req.body.quantity) || 1;

        const prod=await Product.findById(id);
        if (!prod) {
            return res.status(404).json({ message: "Product not found" });
        }
        const address = await Address.findOne({
            user: req.user.id,
            isActive: true
        }); 
        const cart=await Cart.create({
            items: [
            {
                product: id,
                quantity: quantity
            }
            ],
            user: req.user.id,
        });
        res.status(200).json({message: 'Add to Cart successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
};
