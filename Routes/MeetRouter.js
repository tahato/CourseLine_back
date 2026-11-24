const express = require("express");
const { asyncHandler } = require("../Middleware/asyncHandler");
const { getMeeting } = require("../Controllers/MeetController");

const router = express.Router();


router.get("/", asyncHandler(getMeeting));

module.exports = router;