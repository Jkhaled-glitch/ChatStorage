const multer = require('multer');

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith('image/') ||
    file.mimetype === 'text/plain' ||
    file.mimetype === 'application/pdf'
  ) {
    cb(null, true);
  } else {
    cb(new Error('File type not Supported'), false);
  }
};

const uploadfileMiddleware = (destination)=>{

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destination);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });

  const upload = multer({
    storage: storage,
    fileFilter: fileFilter
  });

  return upload.single('file');

}

module.exports = uploadfileMiddleware;
