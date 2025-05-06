const express = require('express');
const { cloudinary } = require('../cloudinary');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const metadataFilePath = path.join(__dirname, '../uploads/metadata.json');

/**
 * POST /restore
 * Restores an image to Cloudinary from local storage if it has been deleted from Cloudinary.
 */
router.post('/', async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Image ID is required' });
  }

  // Read metadata file
  const metadata = JSON.parse(fs.readFileSync(metadataFilePath));

  // Find the image by ID
  const image = metadata.find((item) => item.id === id);

  if (!image) {
    return res.status(404).json({ error: 'Image not found in metadata' });
  }

  const localPath = image.localPath;

  // Check if the file exists in local storage
  if (!fs.existsSync(localPath)) {
    return res.status(404).json({ error: 'File not found in local storage' });
  }

  try {
    // Upload the file back to Cloudinary
    const result = await cloudinary.uploader.upload(localPath);

    // Update metadata with new Cloudinary URL
    image.cloudinaryUrl = result.secure_url;

    // Save updated metadata
    fs.writeFileSync(metadataFilePath, JSON.stringify(metadata, null, 2));

    res.json({
      message: 'Image restored to Cloudinary successfully',
      cloudinaryUrl: result.secure_url,
    });
  } catch (error) {
    console.error('Error restoring image to Cloudinary:', error);
    res.status(500).json({ error: 'Failed to restore image to Cloudinary' });
  }
});

module.exports = router;