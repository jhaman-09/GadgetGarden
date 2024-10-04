import React from 'react'
import { Link } from 'react-router-dom';

const CanclePayment = () => {
  return (
    <>
      <div className="bg-red-400 text-black container mx-auto p-4">
        <h1 className="text-center text-2xl font-semibold animate-pulse">
          Payment failed...! 😒
        </h1>
      </div>

      <Link to={"/cart"}  className="flex items-center justify-center my-4">
        <button className="text-center px-4 py-2 bg-slate-400 transition-all hover:bg-slate-600 text-white rounded-md">
          Try Again
        </button>
      </Link>
    </>
  );
}

export default CanclePayment