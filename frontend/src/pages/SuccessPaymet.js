import React from "react";
import { Link } from "react-router-dom";

const SuccessPaymet = () => {
  return (
    <>
      <div className="bg-green-400 text-black container mx-auto p-4">
        <h1 className="text-center text-2xl font-semibold animate-bounce">
          Payment Successful...!👍
        </h1>
      </div>

      <Link to={"/"} className="flex items-center justify-center my-4">
        <button className="text-center px-4 py-2 bg-yellow-600 hover:text-black transition-all text-white rounded-md">
          Continue Sopping 🖤🖤
        </button>
      </Link>
    </>
  );
};

export default SuccessPaymet;
