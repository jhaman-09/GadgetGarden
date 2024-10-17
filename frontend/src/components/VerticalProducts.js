import React, { useRef } from "react";
import HorizontalProductCardLoading from "./HorizontalProductCardLoading";
import HorizontalProductCard from "./HorizontalProductCard";

const VerticalProducts = ({ heading, data, loading, recommended }) => {
  const loadingCardArray = new Array(13).fill(null);

  const scrollElement = useRef();

  return (
    <div className="container p-4 mx-auto rounded relative my-6 scrollBar-none">
      <h1 className="text-2xl font-semibold py-4">{heading}</h1>

      <div
        className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        {loading
          ? loadingCardArray.map((index) => (
              <HorizontalProductCardLoading key={index} />
            ))
          : data !== null &&
            data.map((product) => (
              <HorizontalProductCard
                product={product}
                key={product?.productName}
                recommended={recommended}
              />
            ))}
      </div>
    </div>
  );
};

export default VerticalProducts;
