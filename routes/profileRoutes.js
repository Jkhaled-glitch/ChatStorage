const express = require('express');
const router = express.Router();
const { uploaded,upload } = require('../controllers/profileController');


router.post("/", upload.single('file'), (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  next();
}, uploaded);

module.exports = router;
