const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  school: {
    type: String,
    required: true,

  },
  module:{
    type:String,
    require:true,
  },
  level:{
    type:String,
    require:true,
  },
  
  category: {
    type: String,
    require: true,
  },
  price:{
    type:Number,
    require:true,
  },
  description: {
    type: String,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
module.exports = mongoose.model("Course", courseSchema);
