const Classe = require("../Models/classe");
const Course = require("../Models/course");
const User = require("../Models/User");
const mongoose = require("mongoose");

const isValidObjectId = (id) =>
  typeof id === "string" && /^[0-9a-fA-F]{24}$/.test(id.trim());

// A classe is owned by the teacher who owns its course.
// Returns the classe if req.userId owns it, otherwise sends 404/403 and returns null.
async function findOwnedClasse(req, res) {
  const id = String(req.params.id || "").trim();
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid classe ID format" });
    return null;
  }
  const classe = await Classe.findById(id).populate("course", "user");
  if (!classe) {
    res.status(404).json({ message: "Classe dose not existe" });
    return null;
  }
  if (!classe.course || String(classe.course.user) !== req.userId) {
    res.status(403).json({ message: "You can only manage your own classes" });
    return null;
  }
  return classe;
}

exports.create = async (req, res) => {
  const { name, day, startTime, endTime, course } = req.body;
  if (!isValidObjectId(course)) {
    return res.status(400).send("Invalid course ID format");
  }
  try {
    const ownedCourse = await Course.findOne({ _id: course, user: req.userId });
    if (!ownedCourse) {
      return res.status(403).send("You can only add classes to your own courses");
    }
    const existingclasse = await Classe.findOne({
      $or: [{ day, startTime, user: req.userId }, { name, course }],
    });
    if (existingclasse) {
      return res.status(400).send("classe alredy exist");
    }
    const classe = new Classe({
      name,
      day,
      startTime,
      endTime,
      user: [req.userId], // the teacher is the first member
      course,
    });
    await classe.save();
    return res.status(200).send("Classe created");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Public listing: the meeting link is never exposed here
exports.getClassesByCourseId = async (req, res) => {
  const courseId = req.query.courseId;
  if (!isValidObjectId(courseId)) {
    return res.status(400).json({ message: "Invalid course ID format" });
  }
  const course = new mongoose.Types.ObjectId(courseId.trim());
  try {
    const classe = await Classe.find({ course })
      .select("-roomUrl -roomUrlExpiresAt")
      .populate("course");
    if (!classe || classe.length == 0) {
      return res.status(404).send("classe not found");
    }
    res.json(classe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  ...read classes for one user (own classes only)...............
exports.getClasseByUser = async (req, res) => {
  if (!isValidObjectId(req.params.userId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }
  const user = new mongoose.Types.ObjectId(req.params.userId.trim());
  try {
    const classe = await Classe.find({ user: user });

    if (!classe) {
      return res.status(404).json({ message: "classe not found" });
    }
    res.json(classe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a classe
exports.deleteClasse = async (req, res) => {
  try {
    const classe = await findOwnedClasse(req, res);
    if (!classe) return;
    await classe.deleteOne();
    await User.updateMany({ classe: classe._id }, { $pull: { classe: classe._id } });
    res.json({ message: "classe deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// delete classses of deleted course
exports.deleteClasseByCourse = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid course ID format" });
  }
  const courseId = req.params.id.trim();
  try {
    // the course may already be deleted (the front deletes it first),
    // so ownership is checked on the classes' own teacher membership too
    const course = await Course.findById(courseId);
    if (course && String(course.user) !== req.userId) {
      return res
        .status(403)
        .json({ message: "You can only manage your own classes" });
    }
    const filter = course
      ? { course: courseId }
      : { course: courseId, "user.0": req.userId };
    const classeIds = await Classe.find(filter).distinct("_id");
    await Classe.deleteMany({ _id: { $in: classeIds } });
    await User.updateMany(
      { classe: { $in: classeIds } },
      { $pull: { classe: { $in: classeIds } } }
    );
    res.json({ message: "classe deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//   get one classe: only its teacher or its members............
exports.getClasseById = async (req, res) => {
  const id = req.params.id.trim();
  try {
    const classe = await Classe.findById(id).populate("course");
    if (!classe) {
      return res.status(404).json({ message: "classe not found" });
    }
    const isOwner = classe.course && String(classe.course.user) === req.userId;
    const isMember = classe.user.some((u) => String(u) === req.userId);
    if (!isOwner && !isMember) {
      return res
        .status(403)
        .json({ message: "Join this classe to see its details" });
    }
    res.json(classe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a classe ...............................................
exports.updateClasse = async (req, res) => {
  try {
    const classe = await findOwnedClasse(req, res);
    if (!classe) return;
    const { name, day, startTime, endTime } = req.body;
    Object.assign(classe, { name, day, startTime, endTime });
    await classe.save();
    res.json("Classe succefuly Updated");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// a student joins a classe (adds themself only)
exports.joinClasse = async (req, res) => {
  try {
    const classe = await Classe.findByIdAndUpdate(
      req.params.id.trim(),
      {
        $addToSet: {
          user: req.userId,
        },
      },
      { new: true }
    );
    if (!classe) {
      return res.status(404).json({ message: "Classe dose not existe" });
    }
    res.json(" user added to classe");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// a student joins a classe: classe, course and user are updated together
// POST /classe/:id/join  ->  { user, message }
exports.join = async (req, res) => {
  const id = String(req.params.id || "").trim();
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid classe ID format" });
  }
  const classe = await Classe.findById(id);
  if (!classe || !classe.course) {
    return res.status(404).json({ message: "Classe dose not existe" });
  }
  const course = await Course.findById(classe.course);
  if (!course) {
    return res.status(404).json({ message: "Course dose not existe" });
  }
  // $addToSet makes every step safe to repeat if a request is retried
  await Classe.updateOne({ _id: classe._id }, { $addToSet: { user: req.userId } });
  await Course.updateOne({ _id: course._id }, { $addToSet: { students: req.userId } });
  const user = await User.findByIdAndUpdate(
    req.userId,
    { $addToSet: { course: course._id, classe: classe._id } },
    { new: true }
  )
    .populate("classe")
    .populate({ path: "course", populate: { path: "user", model: "User" } });
  if (!user) {
    return res.status(404).json({ message: "User does not exist" });
  }
  res.json({ user, message: "you have successfuly joined the classe" });
};

// add url google meet (classe owner only)
exports.addUrl = async (req, res) => {
  const { url } = req.body;
  try {
    const classe = await findOwnedClasse(req, res);
    if (!classe) return;
    classe.roomUrl = url;
    await classe.save();
    res.json("Link successfuly shared");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
