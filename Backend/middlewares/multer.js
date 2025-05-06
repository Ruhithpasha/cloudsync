const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { cloudinary } = require('../cloudinary');

// Configure multer for local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

/**
 * Middleware to upload image to Cloudinary after saving locally.
 */
const uploadToCloudinary = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const localPath = req.file.path;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(localPath);

    // Attach Cloudinary URL to the request object
    req.cloudinaryUrl = result.secure_url;

    next();
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    res.status(500).json({ error: 'Failed to upload to Cloudinary' });
  }
};

module.exports = { upload, uploadToCloudinary };