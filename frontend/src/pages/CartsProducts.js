import React, { useState } from "react";
import { Link } from "react-router-dom";

const CartsProducts = () => {
  const [data, setData] = useState([]);

  return (
    <div className="container p-4 mx-auto rounded">
      {data.length !== 0 ? (
        <div className="mx-24">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-center text-4xl">No Data Sir..!</h1>
            <Link to={"/"} className="bg-secondary px-4 py-2 text-white">
              <button className="rounded-full">Continue</button>
            </Link>
          </div>
        </div>
      ) : (
        <div class="grid grid-cols-2 h-screen mx-24">
          <div class="bg-blue-500 flex items-center justify-center">
            <div className=""></div>
          </div>

          <div class="bg-green-500 flex items-center justify-center"></div>
        </div>
      )}
    </div>
  );
};

export default CartsProducts;
