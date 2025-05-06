const cloudinary = require('cloudinary').v2;

/**
 * connectCloudinary
 * Configures and connects to the Cloudinary service using environment variables.
 */
const connectCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  console.log('Connected to Cloudinary');
};

/**
 * checkImageExists
 * Checks if an image exists in Cloudinary by its public ID.
 * @param {string} publicId - The public ID of the image in Cloudinary.
 * @returns {Promise<boolean>} - Returns true if the image exists, false otherwise.
 */
const checkImageExists = async (publicId) => {
  try {
    const result = await cloudinary.api.resource(publicId);
    return !!result;
  } catch (error) {
    if (error.http_code === 404) {
      return false; // Image does not exist
    }
    console.error('Error checking image existence in Cloudinary:', error);
    throw error;
  }
};

module.exports = { connectCloudinary, cloudinary, checkImageExists };