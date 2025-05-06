/**
 * ImagePreview Component
 * Displays a preview of the selected image or a placeholder message if no image is selected.
 * @param {string} selectedImage - The URL of the selected image.
 */
const ImagePreview = ({ selectedImage }) => {
  return (
    <div className="w-72 h-72 border-2 border-dashed border-gray-300 flex items-center justify-center mx-auto my-4">
      {selectedImage ? (
        <img src={selectedImage} alt="Preview" className="max-w-full max-h-full" />
      ) : (
        <p className="text-gray-500">No image selected</p>
      )}
    </div>
  );
};

export default ImagePreview;