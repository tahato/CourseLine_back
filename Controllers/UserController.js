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
    );
    if (!user) {
      0;
      return res.status(404).json({ message: "User does not exist" });
    }
    res.json("you have successfuly joined the classe");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.updateUser = async (req, res) => {
console.log(req.body);
try {
  const { tel,adresse,birthday,description,image} = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id.trim(),
    { tel,adresse,birthday,description,image },
    { new: true }
  );
  if (!updatedUser) {
    return res.status(404).json({ message: "Classe dose not existe" });
  }
  res.json("User succefuly Updated");
} catch (err) {
  res.status(400).json({ message: err.message });
}
};
