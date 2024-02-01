import React from 'react';

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md">
        <p className="text-lg mb-4">{message}</p>
        <div className="flex justify-end">
          <button className="text-blue-500 mr-4" onClick={onCancel}>
            Cancel
          </button>
          <button className="text-red-500" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
