import React from "react";

const Loader = ({w,h}) => {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ width: w ? `${w}px` : "100%", height: h ? `${h}px` : "100vh" }}
    >
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-solid border-opacity-75"></div>
      <p className="mt-4 text-primary text-lg">Loading...</p>
    </div>
  );
};

export default Loader;
