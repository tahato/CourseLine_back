const express = require("express");
const router = express.Router();
const { wrapController } = require("../Middleware/asyncHandler");
const ClasseController = wrapController(require("../Controllers/ClasseController"));
const { verifyToken, requireRole, requireSelf } = require("../Middleware/tokenAuth");

const teacher = [verifyToken, requireRole("teacher")];
const student = [verifyToken, requireRole("student")];

// create classe (teacher, own course only)
router.post("/", teacher, ClasseController.create);
// get classes for a specified course (public, without meeting links)
router.get("/course", ClasseController.getClassesByCourseId);
// a student joins a classe: updates classe, course and user in one call
router.post("/:id/join", student, ClasseController.join);
// old join step (classe only), kept until the frontend uses /:id/join (Phase 5)
router.put("/student/:id", student, ClasseController.joinClasse);
// Add Meet Link (classe owner only)
router.put("/link/:id", teacher, ClasseController.addUrl);
// update Classe (classe owner only)
router.put("/:id", teacher, ClasseController.updateClasse);
// get one classe (owner or member)
router.get("/:id", verifyToken, ClasseController.getClasseById);
// delete classe (classe owner only)
router.delete("/delete/:id", teacher, ClasseController.deleteClasse);
// get classes for specified user (own classes only)
router.get("/user/:userId", verifyToken, requireSelf("userId"), ClasseController.getClasseByUser);
// delete classes for deleted course (course owner only)
router.delete("/course/:id", teacher, ClasseController.deleteClasseByCourse);

module.exports = router;
