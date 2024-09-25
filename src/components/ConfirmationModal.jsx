import React from "react";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  details = [],
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
}) => {
  if (!isOpen) return null; // Modal is not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-screen-lg mx-auto">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">{title}</h2>

        <div className="space-y-2">
          {details.map((detail, index) => (
            <p key={index} className="text-gray-700">
              <strong>{detail.label}:</strong> {detail.value}
            </p>
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-indigo-200 text-indigo-700 px-4 py-2 rounded mr-4 hover:bg-indigo-300"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
