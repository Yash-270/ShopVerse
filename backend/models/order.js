const mongoose=require("mongoose");
const orderSchema=new mongoose.Schema({
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true
    },
    user:{
       type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, 
    paymentId:{
        type: String
    },
    items:[
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity:{
                type: Number,
                default: 1
            }
        }
    ],
    status:{
        type: String,
        enum: ["PLACED","SHIPPED","DELIVERED","CANCELLED"],
        default: "PLACED"
    },

    dstatus:{
        type: String,
        enum: ["PENDING","PREPAID","POSTPAID"],
        default: "PENDING"
    },

    totalAmount: {
        type: Number,
        required: true
    },

    payment:{
        type: String,
        enum:["COD", "ONLINE"],
        default: "COD"
    },

    orderAt: {
        type: Date,
        default: Date.now
    }
    },
   { timestamps: true }
);

const Order=mongoose.model("Order",orderSchema);
module.exports=Order;