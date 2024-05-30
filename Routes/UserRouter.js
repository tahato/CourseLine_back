const express = require("express");
const router = express.Router();
const userController = require("../Controllers/UserController");
const { verifyToken } = require("../Middleware/tokenAuth");
const { imageUpload } = require("../Middleware/upload");
// join a classe (byu a course)
router.put("/classe/:id", verifyToken, userController.addCourseClasse);
// delete course from user document
router.put(
  "delete/course/:id",
  verifyToken,
  imageUpload,
  userController.removeDeletedCourse
);

// update user
router.put("/:id", verifyToken, imageUpload, userController.updateUser);

module.exports = router;
