const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

/**
 * GET /images
 * Fetches all images stored in the local `uploads` folder.
 */
router.get('/', (req, res) => {
  const uploadsDir = path.join(__dirname, '../uploads');

  // Check if the uploads directory exists
  if (!fs.existsSync(uploadsDir)) {
    return res.status(404).json({ error: 'Uploads directory not found' });
  }

  // Read all files in the uploads directory
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.error('Error reading uploads directory:', err);
      return res.status(500).json({ error: 'Failed to fetch images' });
    }

    // Return the list of image file names
    res.json({ images: files });
  });
});

module.exports = router;