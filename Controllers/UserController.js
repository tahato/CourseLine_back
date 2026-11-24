const User = require("../Models/User");

// edit profil
exports.updateUser = async (req, res) => {
  try {
    // only fields that were sent with a value are changed, so empty ones never wipe saved data
    const changes = {};
    for (const key of ["tel", "adresse", "birthday", "description"]) {
      const value = req.body[key];
      if (value !== undefined && value !== null && String(value).trim() !== "") {
        changes[key] = value;
      }
    }
    // the photo URL only comes from a real upload (set by imageUpload), never from the client
    if (req.file && req.body.image) {
      changes.image = req.body.image;
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id.trim(),
      changes,
      { new: true, runValidators: true }
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
