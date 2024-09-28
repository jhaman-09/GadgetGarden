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
    // <div className="container p-4 mx-auto rounded">
    //   {data.length === 0 ? (
    //     <div className="mx-24">
    //       <div className="flex flex-col items-center justify-center">
    //         <h1 className="text-center text-4xl">No Data Sir..!</h1>
    //         <Link to={"/"} className="bg-secondary px-4 py-2 text-white">
    //           <button className="rounded-full">Continue</button>
    //         </Link>
    //       </div>
    //     </div>
    //   ) : (
    //     <div class="grid grid-cols-2 h-screen mx-24">
    //       <div class="bg-blue-500 flex items-center justify-center">
    //         <div className=""></div>
    //       </div>

    //       <div class="bg-green-500 flex items-center justify-center"></div>
    //     </div>
    //   )}
    // </div>

    <div className="container p-4 mx-auto rounded">
      {data.length === 0 ? (
        <div className="mx-24">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-center text-4xl">No Data Sir..!</h1>
            <Link to={"/"} className="bg-secondary px-4 py-2 text-white">
              <button className="rounded-full">Continue Shopping</button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4 h-screen mx-24">
          {/* Left side: Cart items */}
          <div className="col-span-2 p-4">
            {data.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between mb-4 p-4 bg-gray-100 rounded-lg shadow-sm"
              >
                {/* Product Image */}
                <img
                  src={product?.productImage[0]}
                  alt={product?.productName}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                {/* Product details */}
                <div className="ml-4 flex-grow">
                  <h2 className="text-xl font-semibold">{product?.brandName}</h2>
                  <p className="text-gray-600">Price: ${product?.price}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <button className="px-2 py-1 bg-gray-300 rounded">-</button>
                    <span className="px-3 py-1 bg-white border border-gray-300 rounded">
                      {product?.quantity}
                    </span>
                    <button className="px-2 py-1 bg-gray-300 rounded">+</button>
                  </div>
                </div>

                {/* Total for this product */}
                <div className="text-right">
                  <p className="text-lg font-bold">
                    ${(product.price * product?.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right side: Summary & Buy now */}
          <div className="col-span-1 p-4 bg-gray-100 rounded-lg shadow-sm">
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
