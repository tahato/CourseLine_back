const express = require("express");
const router = express.Router();
const userController = require("../Controllers/UserController");
const {imageUpload}=require('../Middleware/upload')
// join a classe (byu a course)
router.put("/classe/:id", userController.addCourseClasse);
// update user


module.exports=router;