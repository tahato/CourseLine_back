const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const connect = require("./config/connect");
const userRouter = require("./Routes/UserRouter");
app.use(express.json());

app.use("/auth",userRouter)
app.listen(process.env.PORT, () => {
  console.log(`server is running on port`);
});