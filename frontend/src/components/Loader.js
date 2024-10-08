import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid border-opacity-75"></div>
      <p className="mt-4 text-blue-500 text-lg">Loading...</p>
    </div>
  );
};

export default Loader;
