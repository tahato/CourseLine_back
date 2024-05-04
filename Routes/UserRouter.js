const express = require("express");
const router = express.Router();
const userController = require("../Controllers/AuthController");
const { imageUpload } = require("../Middleware/upload");
router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
