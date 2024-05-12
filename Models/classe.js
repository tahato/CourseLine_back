const mongoose = require("mongoose");
const classeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  day: {
    type: String,
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
});
module.exports = mongoose.model("classe", classeSchema);
