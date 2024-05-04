const Course = require("../Models/course");
exports.create = async (req, res) => {
  const { school, module, level, category, price, description,user } = req.body;
  try {
    const course = new Course({
      school,
      category,
      level,
      module,
      price,
      description,
      user,
    });
    await course.save();
    return res.status(200).send("Course created");
  } catch (err) {
    res.status(400).send(err.message);
  }
};
// read all courses..........................
exports.getAllCourses = async (req, res) => {
  const page = req.query.page || 1;
  console.log(req.query);
  const pageSize = 10;
  const totalCount = await Course.countDocuments();
  const totalPages = Math.ceil(totalCount / pageSize);
    try {
      
      const course = await Course.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .populate('user');
      if (!course) {
        return res.status(404).json({ message: "you have no courses" });
       
      }
      res.json({course,totalPages});
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
//   get one course............................................
  exports.getCourseById = async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
      if (!course) {
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
  
  // Delete a course
  exports.deleteCourse = async (req, res) => {
    try {
      const deletedcourse = await Course.findByIdAndDelete(req.params.id);
      if (!deletedcourse) {
        return res.status(404).json({ message: "Course dose not existe" });
      }
      res.json({ message: "Course deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
 