const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    fullName: {
      type: String,
      required: true
    },

    contact: {
      type: String,
      required: true
    },

    addressLine: {
      type: String,
      required: true
    },

    city: String,
    state: String,
    pincode: String,

    gender: String,

    isActive: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);
