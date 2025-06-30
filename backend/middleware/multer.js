import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this folder exists in your backend root
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // To prevent duplicate filenames
  }
});

const upload = multer({ storage });

export default upload;
