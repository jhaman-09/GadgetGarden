import React from "react";
import displayCurrency from "../helper/displayCurrency";
import { useFetchAddToCart } from "../hooks/useAddToCarthCart";
import { Link } from "react-router-dom";

const VarticalyShowProducts = ({ data, loading }) => {
  const loadingCardArray = new Array(13).fill(null);

  const fetchAddToCart = useFetchAddToCart();

  const handleAddToCart = async (e, _id) => {
    await fetchAddToCart(e, _id);
  };

  return (
    <div className="container px-4 mx-auto relative my-6 scrollBar-none">
      {!loading ? (
        <h1 className="text-2xl font-semibold py-4">{`Search Items: ${data.length}`}</h1>
      ) : (
        <h1 className="text-2xl font-semibold py-4">{`Search Items: 0`}</h1>
      )}

      {data.length === 0 && (
        <h1 className="text-secondary text-center text-2xl md:text-4xl">
          No Data Found Sir....!
        </h1>
      )}

      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] gap-3 justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all">
        {loading
          ? loadingCardArray.map((product, index) => (
              <div
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow"
                key={index}
              >
                <div className="bg-orange-500 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse flex justify-center items-center"></div>

                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200">
                    {" "}
                  </h2>
                  <p className="capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200  py-2"></p>
                  <div className="flex gap-3">
                    <p className="text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2"></p>
                    <p className="text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2"></p>
                  </div>
                  <button className="text-sm  text-white px-3  rounded-full bg-slate-200  py-2 animate-pulse"></button>
                </div>
              </div>
            ))
          : data.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product?._id}`}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow"
              >
                <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex gap-4 justify-center items-center">
                  <img
                    src={product?.productImage[0]}
                    alt="product_img"
                    className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                  ></img>
                </div>

                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                    {product?.productName}
                  </h2>
                  <p className="capitalize text-slate-500">
                    {product?.category}
                  </p>

                  <div className="flex gap-3">
                    <p className="text-primary font-medium">
                      {displayCurrency(product?.sellingPrice)}
                    </p>
                    <p className="text-primary font-medium line-through">
                      {displayCurrency(product?.price)}
                    </p>
                  </div>
                  <button
                    className="text-sm bg-primary hover:bg-secondary text-white px-3 py-3 rounded-full"
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default VarticalyShowProducts;
