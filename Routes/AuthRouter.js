const express = require("express");
const router = express.Router();
const authController = require("../Controllers/AuthController");
const { imageUpload } = require("../Middleware/upload");
// register
router.post("/register", authController.register);
// login
router.post("/login", authController.login);

module.exports = router;
