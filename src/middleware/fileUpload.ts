import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './public/images');
  },

  filename: (req, file, callback) => {
    callback(null, file.originalname.toLowerCase().split(' ').join('-'));
  },
});

export const upload = multer({ storage });
