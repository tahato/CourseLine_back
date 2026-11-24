const fs = require("fs/promises");
const multer = require("multer");
const upload = require("../config/multer");
const cloudinary = require("../config/cloudinaryConfig");

// Single "image" field: uploads it to Cloudinary and puts the URL in req.body.image.
// Multer writes the file to a temp folder first; it is always deleted afterwards.
exports.imageUpload = (req, res, next) => {
  upload.single("image")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).send("Multer error: " + err.message);
    } else if (err) {
      return res.status(400).send("Error: " + err.message);
    }
    if (!req.file) {
      return next();
    }
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      req.body.image = result.secure_url;
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error uploading image to Cloudinary");
    } finally {
      await fs.unlink(req.file.path).catch(() => {});
    }
    next();
  });
};
