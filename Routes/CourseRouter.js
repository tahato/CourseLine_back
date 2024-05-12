const express = require("express");
const router = express.Router();
const CourseController = require("../Controllers/CourseController");
const { imageUpload } = require("../Middleware/upload");
// create course
router.post("/create", CourseController.create);
// get  courses by pages
router.get("/", CourseController.getAllCourses);
// get all modules for search bar
router.get("/module", CourseController.getModules);
// get courses for a specified user
router.get("/user/:userId", CourseController.getCourseByUser);
// delete course

router.delete("/delete/:id", CourseController.deleteCourse);

module.exports = router;
