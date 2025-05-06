const express = require('express');
const { cloudinary } = require('../cloudinary');
const { upload } = require('../middlewares/multer');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const router = express.Router();

const metadataFilePath = path.join(__dirname, '../uploads/metadata.json');

// Ensure metadata file exists
if (!fs.existsSync(metadataFilePath)) {
  fs.writeFileSync(metadataFilePath, JSON.stringify([]));
}

/**
 * GET /upload
 * Displays a message indicating the purpose of the endpoint.
 */
router.get('/', (req, res) => {
  res.send('Welcome to the /upload endpoint! Use POST to upload files.');
});

/**
 * POST /upload
 * Handles image uploads, saves them locally, and uploads them to Cloudinary.
 */
router.post('/', upload.single('image'), async (req, res) => {
  try {
    console.log('Request received at /upload');
    console.log('File received:', req.file);

    const localPath = req.file.path;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(localPath);

    console.log('Cloudinary URL:', result.secure_url);

    const uniqueId = uuidv4();
    const metadata = {
      id: uniqueId,
      cloudinaryUrl: result.secure_url,
      localPath: req.file.path,
      originalName: req.file.originalname,
      uploadDate: new Date().toISOString(),
    };

    // Read existing metadata
    const existingMetadata = JSON.parse(fs.readFileSync(metadataFilePath));

    // Add new metadata
    existingMetadata.push(metadata);

    // Save updated metadata
    fs.writeFileSync(metadataFilePath, JSON.stringify(existingMetadata, null, 2));

    res.json(metadata);
    console.log('Response sent from /upload route');
  } catch (error) {
    console.error('Error in upload route:', error);
    res.status(500).json({ error: 'Failed to process upload' });
  }
});

module.exports = router;