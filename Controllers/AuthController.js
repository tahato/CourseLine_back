const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;
  const image = req.image;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send("Email already in use");
  }
  try {
    const hashelPassword = await bcrypt.hash(password, 8);
    const user = new User({
      username,
      email,
      password: hashelPassword,
      role,
      image,
    });
    await user.save();
    res.json("Registration successful");
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("No user found with this email");
    }
    await bcrypt.compare(password, user.password);
    const token = jwt.sign({ userid: user._id }, "secret", { expiresIn: "1h" });
    res.status(200).json({ user, token });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
