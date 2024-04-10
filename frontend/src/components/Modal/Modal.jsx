// Modal.js
import React, { useEffect, useRef } from "react";

const Modal = ({ show, onClose, children }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    // Focus the textarea when the modal is opened
    if (show) {
      textareaRef.current.focus();
    }
  }, [show]);

  return (
    <>
      {show && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
          <div className="modal-overlay fixed w-full h-full"></div>
          <div className="modal-content bg-white rounded-lg shadow-lg p-8">
            <button
              className="modal-close-btn absolute top-0 right-0 p-4 text-gray-500"
              onClick={onClose}
            >
              &times;
            </button>
            {children}
            <textarea
              ref={textareaRef}
              rows={4}
              cols={50}
              placeholder="Enter your reply"
              autoFocus
              className="w-full p-2 border border-gray-300 rounded mt-4"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
