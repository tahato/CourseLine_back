const express = require("express");
const router = express.Router();
const ClasseController = require("../Controllers/ClasseController");
const {verifyToken}=require("../Middleware/tokenAuth")
// create course
router.post("/",verifyToken, ClasseController.create);
// get classes for a specified course
router.get("/course", ClasseController.getClassesByCourseId);
// get classes for a specified course
router.put("/student/:id",verifyToken, ClasseController.joinClasse);
// Add Meet Link
router.put("/link/:id", ClasseController.addUrl);
// update Classe
router.put("/:id",verifyToken, ClasseController.updateClasse);
// get one classe
router.get("/:id",verifyToken, ClasseController.getClasseById);
// delete classe
router.delete("/delete/:id",verifyToken, ClasseController.deleteClasse);
// get classes for specified user
router.get("/user/:userId",verifyToken, ClasseController.getClasseByUser);
// delete classes for deleted course
router.delete("/course/:id",verifyToken, ClasseController.deleteClasseByCourse);

module.exports = router;

