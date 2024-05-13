const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const connect = require("./config/connect");
app.use(express.json());
app.use(cors());

const authRouter = require("./Routes/AuthRouter");
const userRouter = require("./Routes/UserRouter");
const courseRouter = require("./Routes/CourseRouter");
const calsseRouter = require("./Routes/ClasseRouter");
const meetRouter = require("./Routes/MeetRouter");



app.use("/auth",authRouter);
app.use("/user",userRouter);
app.use("/course",courseRouter)
app.use("/classe",calsseRouter)
app.use("/meet",meetRouter);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port`,process.env.PORT);
});