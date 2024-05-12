const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const connect = require("./config/connect");
app.use(express.json());
app.use(cors());

const userRouter = require("./Routes/UserRouter");
const courseRouter = require("./Routes/CourseRouter");
const calsseRouter = require("./Routes/ClasseRouter");
const meetRouter = require("./Routes/MeetRouter");


// const fetch = require("cross-fetch");

// const API_KEY =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmFwcGVhci5pbiIsImF1ZCI6Imh0dHBzOi8vYXBpLmFwcGVhci5pbi92MSIsImV4cCI6OTAwNzE5OTI1NDc0MDk5MSwiaWF0IjoxNzE1Mjk1Mjc0LCJvcmdhbml6YXRpb25JZCI6MjMyMTY4LCJqdGkiOiIwMmEwOTY2MS00ZWY3LTQyNmMtYTAwNi1kODllMDIyYjkyYTYifQ.g9zwbEadBnB9t6Fl2HhpDXTZwyYwaZrzgYdGkiuYEdI";

// const data = {
//   endDate: "2099-02-18T14:23:00.000Z",
//   fields: ["hostRoomUrl"],
// };

// function getResponse() {
//   return fetch("https://api.whereby.dev/v1/meetings", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${API_KEY}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
// }

// getResponse().then(async (res) => {
//   console.log("Status code:", res.status);
//   const data = await res.json();
//   console.log("Room URL:", data.roomUrl);
//   console.log("Host room URL:", data.hostRoomUrl);
// });


app.use("/meet",meetRouter);
app.use("/auth",userRouter);
app.use("/course",courseRouter)
app.use("/classe",calsseRouter)
app.listen(process.env.PORT, () => {
  console.log(`server is running on port`);
});