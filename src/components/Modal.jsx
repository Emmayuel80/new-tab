import React from "react";
import { FiX } from "react-icons/fi";

const Modal = ({ children, title, open, setOpen }) => {
  return (
    <div>
      {open && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-60 transition-opacity"
            aria-hidden="true"
          ></div>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                <div className="bg-gray-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="text-white">
                    <div className="mt-3 text-center mb-5 sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium"
                        id="modal-title"
                      >
                        {title}
                      </h3>
                      {/* Close button */}
                      <div className="absolute top-2 right-2 mt-4 mr-4">
                        <button
                          onClick={() => setOpen(false)}
                          className="text-white hover:text-gray-300"
                        >
                          <FiX className="w-5 h-5" />
                        </button>
                      </div>
                      {children}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
