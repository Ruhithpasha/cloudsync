// This file connects the frontend with the backend.
// Specifically, it connects the `App.jsx` file in the frontend to the `index.js` file in the backend.

const API_BASE_URL = 'http://localhost:5000';

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const checkImageExists = async (publicId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cloudinary/check/${publicId}`);
    if (response.status === 404) {
      return false; // Image does not exist
    }
    if (!response.ok) {
      throw new Error('Failed to check image existence');
    }
    return true; // Image exists
  } catch (error) {
    console.error('Error checking image existence:', error);
    throw error;
  }
};

export const fetchLocalImages = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/images`);
    if (!response.ok) {
      throw new Error('Failed to fetch local images');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching local images:', error);
    throw error;
  }
};

export const restoreImage = async (filename) => {
  try {
    const response = await fetch(`${API_BASE_URL}/restore`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filename }),
    });

    if (!response.ok) {
      throw new Error('Failed to restore image');
    }

    return await response.json();
  } catch (error) {
    console.error('Error restoring image:', error);
    throw error;
  }
};