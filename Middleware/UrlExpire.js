const mongoose = require("mongoose");
const Classe = require("../Models/classe");

exports.cleanUrl = async (req, res, next) => {
  const id = req.params.id.trim();
  console.log(id);
  try {
    await setTimeout(() => {
      console.log("iddddddddddddddddddd" , id);

      const classe = Classe.findById(
        id
      );
      console.log("classss", classe);

      // if (!classe) {
      //   return next();
      // }
    }, 5000);
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
