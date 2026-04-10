const mongoose=require("mongoose");
const productSchema=new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true
    },

    price: {
      type: Number,
      required: true
    },

    about: {
      type: String
    },

    image: {
      type: String, // image URL
      required: true
    },

    // ✅ main category (mens, females, beauty, kids, etc)
    category: {
      type: String,
      required: true,
      index: true
    },

    // ✅ sub category / type (shirt, pant, watch, facewash etc)
    type: {
      type: String,
      required: true,
      index: true
    },

    // ✅ common brand (sab ke liye ek hi field)
    brand: {
      type: String
    },

    // ✅ stock
    stock:{
      type:String,
      enum:["instock","outstock"],
      default:"instock"
    },

    // ✅ common filters
    color: String,
    size: String,
    gender: String,

    // ✅ clothes / saree / suit etc
    fabric: String,

    // ✅ beauty
    skinType: String,

    // ✅ extra flexible attributes (future safe)
    attributes: {
      type: Map,
      of: String
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Product=mongoose.model("Product",productSchema);
module.exports=Product;