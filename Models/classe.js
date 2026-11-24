const mongoose = require("mongoose");
const classeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
    enum: {
      values: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      message: "Please choose a day for the classe",
    },
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },

  user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  roomUrl: {
    type:String,
    default:"",
  },

  roomUrlExpiresAt: {
    type: Date,
  
  }
});
module.exports = mongoose.model("classe", classeSchema);


