const express = require("express");
const { getMeeting } = require("../Controllers/MeetController");

const router = express.Router();


router.get("/", getMeeting);

module.exports = router;