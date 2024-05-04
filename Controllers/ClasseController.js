const Classe = require("../Models/classe");
exports.create = async (req, res) => {
  const { name, day, startTime, endTime, user } = req.body;
  try {
    const classe = new Classe({
      name,
      day,
      startTime,
      endTime,
      user,
    });
    await Classe.save();
    return res.status(200).send("Classe created");
  } catch (err) {
    res.status(400).send(err.message);
  }
};
// read all courses..........................
exports.getUserClasses = async (req, res) => {
  try {
    const classe = await Classe.find({user:req.params.id});
    if (!classe) {
      return res.status(404).json({ message: "you have no courses" });
    }
    res.json(classe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//   get one course............................................
// read all courses..........................
exports.getCourseClasses = async (req, res) => {
  try {
    const classe = await Classe.find({course:req.params.id});
    if (!classe) {
      return res.status(404).json({ message: "you have no courses" });
    }
    res.json(classe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//   get one course............................................
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "course not found" });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a course ...............................................
exports.updateCourse = async (req, res) => {
  try {
    const { text, likes, author } = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      // { text, likes, author },
      { new: true }
    );
    if (!updatedCourse) {
      return res.status(404).json({ message: "Course dose not existe" });
    }
    res.json(updatedCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  try {
    const deletedcourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedcourse) {
      return res.status(404).json({ message: "Course dose not existe" });
    }
    res.json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
