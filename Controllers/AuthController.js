const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { lastName, firstName, email, password, role } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send("Email already exist");
  }
  try {
    const hashelPassword = await bcrypt.hash(password, 8);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashelPassword,
      role,
    });
    await user.save();
    return res.status(200).send("Regestration successfull");
  } catch (err) {
    res.status(400).send("email is invalid");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email })
      .populate("classe")
      .populate({
        path: "course",
        populate: {
          path: "user",
          model: "User",
        },
      });
    if (!user) {
      return res.status(404).send("Wrong Email or password");
    }
    await bcrypt.compare(password, user.password);
    const token = jwt.sign({ userid: user._id }, process.env.SCRETE, { expiresIn: "1h" });
    res.status(200).json({ user, token });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
