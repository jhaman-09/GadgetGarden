import React from "react";
import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";

const CancelPayment = () => {
  return (
    <div className="container mx-auto p-6 mt-6">
      <div className="flex flex-col items-center justify-center gap-6 bg-white text-red-700 rounded-lg shadow-lg p-8 border-2 border-red-400">
        <div className="flex items-center justify-center bg-red-200 rounded-full p-4 shadow-lg">
          <ImCross className="text-6xl text-red-600" />
        </div>
        <h1 className="text-center text-4xl font-bold">Payment Failed 😒</h1>
        <p className="text-lg text-gray-600 text-center">
          Unfortunately, your payment was not successful. Please try again or
          contact support if the problem persists.
        </p>
      </div>

      <Link to="/cart" className="flex items-center justify-center my-6">
        <button className="text-center px-6 py-3 bg-red-600 text-white font-semibold rounded-full shadow-md hover:bg-red-700 transition-all">
          Try Again 🔄
        </button>
      </Link>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-500">
          Need help?{" "}
          <Link
            to="https://www.linkedin.com/in/aman-kumar-jha-3b254823b/"
            className="text-red-600 hover:underline"
          >
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CancelPayment;
