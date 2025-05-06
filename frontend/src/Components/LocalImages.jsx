import React, { useEffect, useState } from 'react';

/**
 * LocalImages Component
 * Fetches and displays all images available in the local storage (uploads folder).
 */
const LocalImages = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch images from the backend
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:5000/images');
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        setImages(data.images);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Local Images</h2>
      <div className="grid grid-cols-3 gap-4">
        {images.length > 0 ? (
          images.map((image, index) => (
            <div key={index} className="border rounded shadow">
              <img
                src={`http://localhost:5000/uploads/${image}`}
                alt={image}
                className="w-full h-48 object-cover"
              />
              <p className="text-center p-2 text-sm">{image}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No images found in local storage.</p>
        )}
      </div>
    </div>
  );
};

export default LocalImages;