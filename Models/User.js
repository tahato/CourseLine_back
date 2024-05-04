const mongoose = require("mongoose");
const userShema = new mongoose.Schema({
  image:{
    type:String,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters long"],
  },
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+.[^\s@]+$/,
    lowercase: true,
    trim: true,
    unique: true,
  },
  role:{
    type:String,
    enum:["student","teacher"],
  },
  isAdmin:{
    type:Boolean,
    default:false
  },
  course:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Course"
  },
  classe:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Classe"
  }
},
{
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
      },
    },
  },
);
module.exports = mongoose.model("User", userShema);
