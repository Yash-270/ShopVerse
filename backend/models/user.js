const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const userSchema=new mongoose.Schema({
     name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        unique: true,
        lowercase: true,
        sparse: true, 
        trim: true
    },
    contact: {
        type: Number,
        unique: true,
        sparse: true
    },
    password:{
        required: true,
        type: String
        
    },
    role:{
        type:String,
        enum:['Customer','admin','Seller'],
        default: 'Customer'
    },
    age:{
        type:String
    },
    gender:{
        type:String
    },
    otp:{
        type: String
    },

    otpExpire: {
        type: Date
    },

    signupVerify: {
        type: Boolean,
        default: false
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


userSchema.methods.comparePassword=async function(customerPassword){
    try{
        const isMatch=await bcrypt.compare(customerPassword,this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}
const User=mongoose.model('User',userSchema);
module.exports=User;