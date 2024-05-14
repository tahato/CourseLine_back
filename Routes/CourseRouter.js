const express = require("express");
const router = express.Router();
const CourseController = require("../Controllers/CourseController");
const {verifyToken}=require("../Middleware/tokenAuth")

// create course
router.post("/create",verifyToken, CourseController.create);
// get  courses by pages
router.get("/", CourseController.getAllCourses);
// get all modules for search bar
router.get("/module", CourseController.getModules);
// add student to course
router.put("/student/:id",verifyToken, CourseController.joinCourse);
// get courses for a specified user
router.get("/user/:userId",verifyToken, CourseController.getCourseByUser);
// delete course

router.delete("/delete/:id",verifyToken, CourseController.deleteCourse);

module.exports = router;
