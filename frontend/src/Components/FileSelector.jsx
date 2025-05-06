/**
 * FileSelector Component
 * Renders a button that triggers the file input dialog when clicked.
 * @param {function} onFileChange - Callback function to handle file selection.
 */
const FileSelector = ({ onFileChange }) => {
  return (
    <button
      onClick={() => document.getElementById('fileInput').click()}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
    >
      Select File
    </button>
  );
};

export default FileSelector;