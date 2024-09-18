import React from "react";
import { CgClose } from "react-icons/cg";

const DisplayImageFullScreen = ({ onClose, imageUrl }) => {
  return (
    <div className="top-0 bottom-0 left-0 right-0 fixed flex justify-center items-center">
      <div className="bg-white shadow-lg rounded max-w-5xl mx-auto p-4">
        <div
          className="cursor-pointer w-fit ml-auto text-2xl hover:bg-secondary"
          onClick={onClose}
        >
          <CgClose />
        </div>
        <div className="flex justify-center  items-center p-4 max-w-[80vh] max-h-[80vh]">
          <img
            src={imageUrl}
            alt="image-full-screen-to-show"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayImageFullScreen;
