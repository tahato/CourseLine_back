const User = require("../Models/User");

// read all users..........................
exports.readUsers = async (req, res) => {
 
    try {
      
      const user = await User.find()
      .populate('course');
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
  
// Update a course ...............................................
exports.updateCourse = async (req, res) => {
    try {
      const { school, module, level, category, price, description } = req.body;
      const updatedCourse = await Course.findByIdAndUpdate(
        req.params.id,
        { school, module, level, category, price, description },
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
  