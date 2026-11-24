const express = require("express");
const router = express.Router();
const { wrapController } = require("../Middleware/asyncHandler");
const userController = wrapController(require("../Controllers/UserController"));
const { verifyToken, requireSelf } = require("../Middleware/tokenAuth");
const { imageUpload } = require("../Middleware/upload");

// every /user/:id route acts on the caller's own account only
const self = [verifyToken, requireSelf("id")];

// update user (ownership checked before any image upload)
router.put("/:id", self, imageUpload, userController.updateUser);

module.exports = router;
