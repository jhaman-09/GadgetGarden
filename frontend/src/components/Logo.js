import React from "react";

const Logo = ({ w, h }) => {
  return (
    <div className={`w-${w} h-${h}`}>
      <h1 className="text-primary md:text-2xl text-lg  font-bold">GadgetGarden</h1>
    </div>
  );
};

export default Logo;
