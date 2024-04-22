const express = require('express')
const router = express.Router()
const userController = require('../Controllers/AuthController')
const {imageUpload}=require('../Middleware/upload')
router.post("/register",imageUpload,userController.register)
router.post("/login",userController.login)
router.get("/",(req,res)=>res.send("helll"))

module.exports = router;