const mongoose = require("mongoose");
const Course = require("../Models/course");
const Classe = require("../Models/classe");
const User = require("../Models/User");

exports.create = async (req, res) => {
  const { school, module, level, category, price, description } = req.body;
  try {
    const course = new Course({
      school,
      category,
      level,
      module,
      price,
      description,
      user: req.userId, // owner comes from the token, never from the body
    });
    await course.save();
    return res.status(200).send("Course created");
  } catch (err) {
    res.status(400).send(err.message);
  }
};
// read all courses..........................
exports.getAllCourses = async (req, res) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const pageSize = 12;
  try {
    const totalCount = await Course.countDocuments();
    const totalPages = Math.ceil(totalCount / pageSize);
    const course = await Course.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .populate("user");
    if (!course) {
      return res.status(404).json({ message: "you have no courses" });
    }
    res.json({ course, totalPages });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// read all Modules..........................
exports.getModules = async (req, res) => {
  try {
    const mol = await Course.distinct("module");
    if (!mol) {
      return res.status(404).json({ message: "you have no courses" });
    }
    res.json(mol);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//   get  courses for a user............................................
exports.getCourseByUser = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.userId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }
  const userid = new mongoose.Types.ObjectId(req.params.userId);
  try {
    const course = await Course.find({ user: userid }).populate("user");
    if (!course || course.length == 0) {
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
    const { school, module, level, category, price, description } = req.body;
    const updatedCourse = await Course.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { school, module, level, category, price, description },
      { new: true, runValidators: true }
    );
    if (!updatedCourse) {
      return res.status(404).json({ message: "Course dose not existe" });
    }
    res.json(updatedCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a course, its classes, and every reference to them on users
exports.deleteCourse = async (req, res) => {
  try {
    // only the teacher who owns the course can delete it
    const deletedcourse = await Course.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });
    if (!deletedcourse) {
      return res.status(404).json({ message: "Course dose not existe" });
    }
    const classeIds = await Classe.find({ course: deletedcourse._id }).distinct("_id");
    await Classe.deleteMany({ _id: { $in: classeIds } });
    await User.updateMany(
      { $or: [{ course: deletedcourse._id }, { classe: { $in: classeIds } }] },
      { $pull: { course: deletedcourse._id, classe: { $in: classeIds } } }
    );
    res.json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Add a student to a course
exports.joinCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id.trim(),
      {
        $addToSet: {
          students: req.userId, // a student can only add themself
        },
      },
      { new: true }
    );
    if (!course) {
      0;
      return res.status(404).json({ message: "User does not exist" });
    }
    res.json("you have successfuly joined the classe");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
