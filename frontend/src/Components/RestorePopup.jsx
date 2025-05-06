import React from 'react';

/**
 * RestorePopup Component
 * Displays a confirmation popup asking for permission to restore an image to Cloudinary.
 * @param {boolean} isVisible - Controls the visibility of the popup.
 * @param {function} onConfirm - Callback function when the user confirms the restore action.
 * @param {function} onCancel - Callback function when the user cancels the restore action.
 */
const RestorePopup = ({ isVisible, onConfirm, onCancel }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <h2 className="text-lg font-bold mb-4">Restore Image</h2>
        <p className="mb-4">The image is missing from Cloudinary. Do you want to restore it?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Yes, Restore
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestorePopup;