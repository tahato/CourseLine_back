const express = require("express");
const router = express.Router();
const ClasseController = require("../Controllers/ClasseController");



// create course
router.post("/", ClasseController.create);
// get classes for a specified course
router.get("/course", ClasseController.getClassesByCourseId);
// get classes for a specified course
router.put("/student/:id", ClasseController.joinClasse);
// Add Meet Link
router.put("/link/:id", ClasseController.addUrl);
// update Classe
router.put("/:id", ClasseController.updateClasse);
// get one classe
router.get("/:id",ClasseController.getClasseById);
// delete classe
router.delete("/delete/:id", ClasseController.deleteClasse);
// get classes for specified user
router.get("/user/:userId",ClasseController.getClasseByUser);


module.exports = router;
