const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
app.use(cors());
const connect = require("./config/connect");
app.use(express.json());
const userRouter = require("./Routes/UserRouter");
const courseRouter = require("./Routes/CourseRouter");

app.use("/auth",userRouter);
app.use("/course",courseRouter)
app.listen(process.env.PORT, () => {
  console.log(`server is running on port`);
});