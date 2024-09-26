import React from "react";
import Button from "./Button";

interface ModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-black p-6 rounded shadow-lg shadow-teal-700 w-96">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <Button
            onClick={onCancel}
            theme="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            theme="primary"
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
