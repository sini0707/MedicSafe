// Modal.js
import  { useEffect, useRef } from "react";

const Modal = ({ show, onClose, children, addPre, submit }) => {

  console.log(submit,"submit")

  const textareaRef = useRef(null);

  const handleText = (e) => {
    addPre(e.target.value);
  };

  const handleSubmit = () => {
    console.log("Submitting modal form...");
    submit()
  
    onClose();
  };

  useEffect(() => {
   
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
              placeholder="Type your message"
              onChange={(e) => handleText(e)}
              autoFocus
              className="w-full p-2 border border-gray-300 rounded mt-4"
            />
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
