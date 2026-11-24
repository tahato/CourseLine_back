const express = require("express");
const router = express.Router();
const { wrapController } = require("../Middleware/asyncHandler");
const userController = wrapController(require("../Controllers/UserController"));
const { verifyToken, requireSelf } = require("../Middleware/tokenAuth");
const { imageUpload } = require("../Middleware/upload");

// every /user/:id route acts on the caller's own account only
const self = [verifyToken, requireSelf("id")];

// old join step (user only), kept until the frontend uses POST /classe/:id/join (Phase 5)
router.put("/classe/:id", self, userController.addCourseClasse);

// update user (ownership checked before any image upload)
router.put("/:id", self, imageUpload, userController.updateUser);

module.exports = router;
