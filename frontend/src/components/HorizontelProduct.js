import React, { useRef } from "react";
import HorizontalProductCardLoading from "./HorizontalProductCardLoading";
import HorizontalProductCard from "./HorizontalProductCard";
import { TypeAnimation } from "react-type-animation";

const HorizontelProduct = ({ heading, data, loading }) => {
  const loadingCardArray = new Array(13).fill(null);

  const scrollElement = useRef();

  return (
    <div className="container px-4 mx-auto relative my-6 scrollBar-none">
      {!loading ? (
        <h1 className={`text-2xl font-semibold py-4`}>{heading}</h1>
      ) : (
        <div className="flex items-center">
          <p className="transition-all animate-pulse text-2xl font-semibold py-4">
            Loading
          </p>
          <TypeAnimation
            className="transition-all animate-pulse cursor-none ease-in-out text-2xl font-semibold py-4"
            sequence={[".......", 1000, "", 1000]}
            wrapper="span"
            speed={20}
            repeat={Infinity}
            style={{ fontSize: "2em", display: "inline-block" }}
          />
        </div>
      )}

      <div
        className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        {loading
          ? loadingCardArray.map((product, index) => (
              <HorizontalProductCardLoading design={"flex"} key={index} />
            ))
          : data.map((product) => (
              <HorizontalProductCard
                product={product}
                key={product?.productName}
                design={"flex"}
              />
            ))}
      </div>
    </div>
  );
};

export default HorizontelProduct;
