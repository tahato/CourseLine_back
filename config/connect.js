const mongoose = require("mongoose");
require("dotenv").config();
mongoose
  .connect(process.env.URL)
  .then(() => console.log("connected with database"))
  .catch(() => console.log("connection failed"));