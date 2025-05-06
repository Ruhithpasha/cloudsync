import { useState, useEffect } from 'react';
import ImagePreview from './Components/ImagePreview';
import FileSelector from './Components/FileSelector';
import UploadButton from './Components/UploadButton';
import RestorePopup from './Components/RestorePopup';
import { checkImageExists, fetchLocalImages, restoreImage } from './api';
import LocalImages from './Components/LocalImages';

/**
 * App Component
 * Main application component that manages the state and logic for image preview and upload.
 */
function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isRestorePopupVisible, setIsRestorePopupVisible] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [localImages, setLocalImages] = useState([]);

  useEffect(() => {
    // Fetch local images on component mount
    const loadLocalImages = async () => {
      try {
        const data = await fetchLocalImages();
        setLocalImages(data.images);
      } catch (error) {
        console.error('Error fetching local images:', error);
      }
    };

    loadLocalImages();
  }, []);

  /**
   * handleFileChange
   * Handles the file selection event and sets the selected image for preview.
   * @param {Event} event - The file input change event.
   */
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));

      // Check if the image exists in Cloudinary
      const imageExists = await checkImageExists(file.name);
      if (!imageExists) {
        setIsRestorePopupVisible(true);
      }
    }
  };

  /**
   * handleUpload
   * Handles the upload process by sending the selected file to the backend server.
   */
  const handleUpload = async () => {
    if (!selectedImage) {
      alert("No file selected.");
      return;
    }

    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Unexpected response format: Non-JSON response received");
        }

        const errorText = await response.json();
        throw new Error(`Upload failed: ${errorText.error}`);
      }

      const data = await response.json();
      alert("File uploaded successfully!");
      console.log("Uploaded file metadata:", data);
      setUploadSuccess(true);
    } catch (err) {
      console.error("Error during upload:", err);
      alert("Failed to upload: " + err.message);
      setUploadSuccess(false);
    } finally {
      setSelectedImage(null);
    }
  };

  const handleRestoreConfirm = async (id) => {
    try {
      const response = await restoreImage(id);
      console.log('Image restored successfully:', response);
      setIsRestorePopupVisible(false);
    } catch (error) {
      console.error('Error restoring image:', error);
    }
  };

  const handleRestoreCancel = () => {
    setIsRestorePopupVisible(false);
  };

  return (
    <div className="App p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Image Preview and Upload</h1>

      <ImagePreview selectedImage={selectedImage} />

      <div className="flex justify-center gap-4">
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <FileSelector onFileChange={handleFileChange} />
        <UploadButton onUpload={handleUpload} />
      </div>

      {uploadSuccess && (
        <p className="text-center text-green-500 mt-4">File has been uploaded successfully!</p>
      )}

      <RestorePopup
        isVisible={isRestorePopupVisible}
        onConfirm={handleRestoreConfirm}
        onCancel={handleRestoreCancel}
      />

      <hr className="my-6" />

      <LocalImages
        images={localImages}
        onRestore={(id) => {
          setIsRestorePopupVisible(true);
          handleRestoreConfirm(id);
        }}
      />
    </div>
  );
}

export default App;
