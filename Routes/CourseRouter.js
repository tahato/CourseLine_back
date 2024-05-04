const express = require("express");
const router = express.Router();
const CourseController = require("../Controllers/CourseController");
const { imageUpload } = require("../Middleware/upload");
// create course
router.post("/create", CourseController.create);
// get  courses by pages
router.get("/", CourseController.getAllCourses);

module.exports = router;
