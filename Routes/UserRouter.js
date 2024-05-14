const express = require("express");
const router = express.Router();
const userController = require("../Controllers/UserController");
const {verifyToken}=require("../Middleware/tokenAuth")
const {imageUpload}=require('../Middleware/upload')
// join a classe (byu a course)
router.put("/classe/:id",verifyToken, userController.addCourseClasse);
router.put("/:id",verifyToken,imageUpload, userController.updateUser);
// update user


module.exports=router;