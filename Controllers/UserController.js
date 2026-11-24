const User = require("../Models/User");

//  add course and classe (old join step, replaced by POST /classe/:id/join) ....
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
      return res.status(404).json({ message: "User does not exist" });
    }
    res.json({ updatedUser, message: "User succefuly Updated" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
