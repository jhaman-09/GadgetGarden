import React, { useEffect, useState } from "react";
import { endPoint } from "../helper/api.js";
import { Link } from "react-router-dom";

const CategoryProductList = ({ categoryList, loading }) => {
  const categoryLoading = new Array(13).fill(null);
  return (
    <div className="container mx-auto p-4 scrollBar-none">
      <div className="flex justify-between items-center gap-2 overflow-y-scroll scrollbar-none">
        {" "}
        {/* scrollBar-none = custom tailwind css */}
        {loading
          ? categoryLoading.map((ele, idx) => {
              return (
                <div
                  className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-300 animate-pulse"
                  key={"categoryList" + idx}
                ></div>
              );
            })
          : categoryList?.map((product, idx) => {
              return (
                <Link
                  to={"/product-category?category=" + product?.category}
                  key={product?.productName + idx}
                  className="cursor-pointer"
                >
                  <div className="h-16 w-16 bg-slate-100 rounded-full md:w-20 md:h-20 overflow-hidden p-4 justify-center">
                    <img
                      src={product?.productImage[0]}
                      alt={product?.productName}
                      className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                    />
                  </div>
                  <p className="text-center text-sm md:text-base capitalize">
                    {product?.category}
                  </p>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryProductList;
