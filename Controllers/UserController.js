const User = require("../Models/User");

// read all users..........................
exports.readUsers = async (req, res) => {
  try {
    const user = await User.find().populate("course");
    if (!user) {
      return res.status(404).json({ message: "No Users found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//   get one User............................................
exports.getCourseById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("course");
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//  add course and classe ............................................
exports.addCourseClasse = async (req, res) => {
  const { courseId, classeId } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id.trim(),
      {
        $addToSet: {
          course: courseId,
          classe: classeId,
        },
      },
      { new: true }
    )
      .populate("classe")
      .populate({
        path: "course",
        populate: {
          path: "user",
          model: "User",
        },
      });
    if (!user) {
      0;
      return res.status(404).json({ message: "User does not exist" });
    }
    res.json({ user, message: "you have successfuly joined the classe" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// edit profil
exports.updateUser = async (req, res) => {
  try {
    const { tel, adresse, birthday, description, image } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id.trim(),
      { tel, adresse, birthday, description, image },
      { new: true }
    )
      .populate("classe")
      .populate({
        path: "course",
        populate: {
          path: "user",
          model: "User",
        },
      });
    if (!updatedUser) {
      return res.status(404).json({ message: "Classe dose not existe" });
    }
    res.json({ updatedUser, message: "User succefuly Updated" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// delete course
exports.removeDeletedCourse = async (req, res) => {
  const { courseId } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id.trim(),
      {
        $pull: {
          course: courseId,
        },
      },
      { new: true }
    );
    if (!user) {
      0;
      return res.status(404).json({ message: "User does not exist" });
    }
    res.json("course deleted from student");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
