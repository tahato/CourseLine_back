const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  school: {
    type: String,
    required: true,
  },
  module: {
    type: String,
    required: true,
    trim: true,
  },
  level: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "The price cannot be negative"],
  },
  description: {
    type: String,
  },

  user: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "User" 
    },
  students:[ {
     type: mongoose.Schema.Types.ObjectId,
     ref: "User" 
    }],
});
module.exports = mongoose.model("Course", courseSchema);
