const multer = require('multer');

// @desc    upload profile image
// @route   POST /users/:userId/profile
// @access  Private



const uploaded = async (req, res) => {
  const profile = req.file;
  const publicUrl = req.protocol + '://' + req.get('host') + '/profiles/' + profile.filename;
  res.status(200).json({ url: publicUrl });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'profiles');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

module.exports = {
  uploaded,
  upload
}