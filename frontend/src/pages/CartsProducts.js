import React, { useEffect, useState } from "react";
import { json, Link } from "react-router-dom";
import { useFetchCartAllProduct } from "../hooks/useFetchCartAllProduct";

const CartsProducts = () => {
  const [data, setData] = useState([]);

  const { getAllCartProducts } = useFetchCartAllProduct();

  useEffect(() => {
    const fetchCartData = async () => {
      const cartData = await getAllCartProducts();
      if (cartData.success) {
        setData(cartData.data);
      }
    };

    fetchCartData();
  }, []);

  console.log(data);

  return (
    <div className="container p-4 mx-auto rounded">
      {data.length === 0 ? (
        <div className="mx-24">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-center text-4xl">No Data Sir..!</h1>
            <Link to={"/"} className="bg-secondary px-4 py-2 text-white">
              <button className="rounded-full">Continue</button>
            </Link>
          </div>
        </div>
      ) : (
        // {Cart Products Details}

        <div class="grid md:grid-cols-3 mx-10 md:mx-24 gap-4 md:gap-8 ">
          <div className="h-screen md:col-span-2 overflow-y-scroll">
            <div class=" grid gap-4 ">
              {data.map((product, index) => {
                return (
                  <div className="bg-white h-[225px]">
                    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
                      <div className="col-span-1 w-full h-full bg-slate-300 flex md:flex-row flex-col items-center justify-center rounded-l-lg relative">
                        <div className="md:w-44 md:h-44 h-32 w-32 flex items-center justify-center mb-4">
                          <img
                            alt="product_img"
                            className="h-full w-full object-contain mix-blend-multiply p-2 hover:object-scale-down transition-all"
                            src={product?.productImage[0]}
                          />
                        </div>
                        <div className="font-semibold bg-white rounded-full px-2 py-0.5 shadow-md md:absolute md:top-1 md:right-1">
                          <span className="text-green-900 flex">
                            {Math.floor(product?.discount)}%{" "}
                            <p className="text-green-900 px-1">off</p>
                          </span>
                        </div>
                      </div>

                      <div className="md:col-span-2 rounded-r-lg">
                        <div className="flex items-center justify-center">
                          <div className="flex items-center">
                            <p className="bg-secondary px-4 py-2 text-white">
                              {product?.brandName}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* {Cart Summary of Products} */}
          <div className="p-4 bg-gray-100 rounded-lg shadow-lg h-[225px]">
            <h3 className="text-xl font-semibold mb-4">Cart Summary</h3>
            <div className="flex justify-between">
              <p>Total Items:</p>
              <p>{data.reduce((acc, product) => acc + product?.quantity, 0)}</p>
            </div>
            <div className="flex justify-between mt-2">
              <p>Total Price:</p>
              <p>
                $
                {data
                  .reduce(
                    (acc, product) => acc + product.price * product.quantity,
                    0
                  )
                  .toFixed(2)}
              </p>
            </div>
            <button className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Buy Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartsProducts;
