/**
 * UploadButton Component
 * Renders a button that triggers the upload process when clicked.
 * @param {function} onUpload - Callback function to handle the upload process.
 */
const UploadButton = ({ onUpload }) => {
  return (
    <button
      onClick={onUpload}
      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
    >
      Upload
    </button>
  );
};

export default UploadButton;