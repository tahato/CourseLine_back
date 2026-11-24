const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { lastName, firstName, email, password, role } = req.body;
  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).send("Email and password are required");
  }
  if (!["student", "teacher"].includes(role)) {
    return res.status(400).send("Please choose a role: student or teacher");
  }
  try {
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).send("Email already exist");
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
  const regExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*-/?&])[A-Za-z\d@$!%*-/?&]{8,}$/;
  if (!regExp.test(password)) {
    return res
      .status(400)
      .send(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character "
      );
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
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).send("Wrong Email or password");
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRETE, {
      expiresIn: "1h",
    });
    res.status(200).json({ user, token });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
