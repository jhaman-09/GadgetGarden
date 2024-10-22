import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineDoneOutline } from "react-icons/md";

const SuccessPayment = () => {
  return (
    <div className="container mx-auto p-6 mt-6">
      <div className="flex flex-col items-center justify-center gap-4 bg-gradient-to-r from-green-400 to-green-600 rounded-lg shadow-lg p-6">
        <p className="text-4xl bg-white text-green-600 rounded-full p-4 shadow-lg">
          <MdOutlineDoneOutline className="text-5xl" />
        </p>
        <div className="flex md:gap-2 items-center justify-center">
          <p className="text-center ml-12 text-3xl font-bold text-white animate-bounce tracking-wide">
            Payment Successful!
          </p>
          <p className="md:mb-1 text-3xl font-bold text-white animate-bounce tracking-wide">
            🎉👍
          </p>
        </div>
        <p className="text-lg text-white text-opacity-90">
          Thank you for your purchase. Your payment was processed successfully.
        </p>
      </div>

      <Link to="/" className="flex items-center justify-center my-6">
        <button className="text-center px-6 py-3 bg-white text-green-600 font-semibold rounded-full shadow-md hover:bg-gray-100 hover:text-green-800 transition-all">
          Continue Shopping 🖤🖤
        </button>
      </Link>
    </div>
  );
};

export default SuccessPayment;
