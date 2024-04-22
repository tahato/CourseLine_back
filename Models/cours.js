const mongoose = require("mongoose");
const coursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
 date: {
    type: Date,
    required: true,
  },
  duree:{
    type:Number,
    required:true,
  },
  teacher:{
    type:mongoose.Schema.Types.ObjectId ,
    ref:"User"
      },
    
  
});
module.exports = mongoose.model("Cours", coursSchema);
