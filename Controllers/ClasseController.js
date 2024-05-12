const Classe = require("../Models/classe");
const mongoose = require("mongoose");

function isValidObjectId(id) {
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  return objectIdRegex.test(id);
}

exports.create = async (req, res) => {
  const { name, day, startTime, endTime, user, course } = req.body;
  console.log(typeof startTime);
  try {
    const classe = new Classe({
      name,
      day,
      startTime,
      endTime,
      user,
      course,
    });
    await classe.save();
    return res.status(200).send("Classe created");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.getClassesByCourseId = async (req, res) => {
  const courseId = req.query.courseId;
  const course = new mongoose.Types.ObjectId(courseId);
  if (!isValidObjectId(course)) {
    return res.status(400).json({ message: "Invalid course ID format" });
  }
  try {
    const classe = await Classe.find({ course });

    console.log(classe.lethg);
    if (!classe || classe.length == 0) {
      return res.status(404).send("classe not found");
    }
    res.json(classe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//  ...read classes for one user...............
exports.getClasseByUser = async (req, res) => {
  const user = new mongoose.Types.ObjectId(req.params.userId);
  if (!isValidObjectId(user)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }
  try {
    const classe = await Classe.find({ user: user });

    if (!classe) {
      return res.status(404).json({ message: "course not found" });
    }
    res.json(classe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Delete a course
exports.deleteClasse = async (req, res) => {
  try {
    const deletedclasse = await Classe.findByIdAndDelete(req.params.id);
    if (!deletedclasse) {
      return res.status(404).json({ message: "classe dose not existe" });
    }
    res.json({ message: "classe deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//   get one classe............................................
exports.getClasseById = async (req, res) => {
// res.json(req.params.id.trim());
const id =req.params.id.trim()

  try {
    const classe = await Classe.findById(id);
    if (!classe) {
      return res.status(404).json({ message: "classe not found" });
    }
    res.json(classe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a course ...............................................
exports.updateClasse = async (req, res) => {
  try {
    const { name, day, startTime, endTime } = req.body;
    const updatedClasse= await Classe.findByIdAndUpdate(
      req.params.id,
      { name, day, startTime, endTime },
      { new: true }
    );
    if (!updatedClasse) {
      return res.status(404).json({ message: "Classe dose not existe" });
    }
    res.json("Classe succefuly Updated");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


