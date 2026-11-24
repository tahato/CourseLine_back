const express = require("express");
const router = express.Router();
const { wrapController } = require("../Middleware/asyncHandler");
const CourseController = wrapController(require("../Controllers/CourseController"));
const { verifyToken, requireRole } = require("../Middleware/tokenAuth");

const teacher = [verifyToken, requireRole("teacher")];

// create course (owner = logged-in teacher)
router.post("/create", teacher, CourseController.create);
// get courses by pages (optional ?module= search)
router.get("/", CourseController.getAllCourses);
// get all modules for search bar
router.get("/module", CourseController.getModules);
// get courses for a specified user
router.get("/user/:userId", verifyToken, CourseController.getCourseByUser);
// update course (owner only)
router.put("/:id", teacher, CourseController.updateCourse);
// delete course (owner only) + its classes + references on users
router.delete("/delete/:id", teacher, CourseController.deleteCourse);

module.exports = router;
