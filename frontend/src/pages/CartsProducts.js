import React from "react";
import { Link } from "react-router-dom";
import displayCurrency from "../helper/displayCurrency";
import { useSelector } from "react-redux";
import { useFetchAddToCart } from "../hooks/useFetchAddToCart";
import { useReduceFromCart } from "../hooks/useReduceFromCart";
import { RiDeleteBin7Line } from "react-icons/ri";
import { useFetchDeleteProductFromCart } from "../hooks/useDeleteProductFromCart";
import { usePaymentGateway } from "../hooks/usePaymentGateway";

const CartsProducts = () => {
  const { cartProducts } = useSelector((store) => store.user);
  const fetchAddToCart = useFetchAddToCart();
  const fetchReduceCart = useReduceFromCart();
  const fetchDeleteProduct = useFetchDeleteProductFromCart();
  const paymentGateway = usePaymentGateway();

  const handleAddToCart = async (e, _id) => {
    await fetchAddToCart(e, _id);
  };

  const handleReduceFromCart = async (e, _id) => {
    await fetchReduceCart(e, _id);
  };

  const handleDeleteProductItemFromCArt = async (e, _id) => {
    await fetchDeleteProduct(e, _id);
  };

  const handlePayment = async () => {
    await paymentGateway(cartProducts);
  };

  return (
    <div className="container p-4 mx-auto rounded">
      {cartProducts && cartProducts.length === 0 ? (
        <div className="mx-24">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-center text-4xl">No Data Sir..!</h1>
            <Link to={"/"} className="bg-primary px-4 py-2 text-white">
              <button className="rounded-full">Continue</button>
            </Link>
          </div>
        </div>
      ) : (
        // {Cart Products Details}

        <div class="grid md:grid-cols-3 mx-4 md:mx-24 gap-4 md:gap-8 ">
          <div className="h-screen md:col-span-2 overflow-y-scroll">
            <div class=" grid gap-4 ">
              {cartProducts &&
                cartProducts.map((cartItem) => {
                  return (
                    <div
                      className="bg-white h-[225px]"
                      key={cartItem?.product?._id}
                    >
                      <div className="grid grid-cols-2 md:grid-cols-3 h-full">
                        <div className="col-span-1 w-full h-full bg-slate-300 flex md:flex-row flex-col items-center justify-center rounded-l-lg rounded-r-lg relative">
                          <div className="md:w-44 md:h-44 h-32 w-32 flex items-center justify-center mb-4">
                            <img
                              alt="product_img"
                              className="h-full w-full object-contain mix-blend-multiply p-2 hover:object-scale-down transition-all"
                              src={cartItem?.product?.productImage[0]}
                            />
                          </div>
                          <div className="font-semibold bg-white rounded-full px-2 py-0.5 shadow-md md:absolute md:top-1 md:right-1">
                            <span className="text-green-900 flex">
                              {Math.floor(cartItem?.product?.discount)}%{" "}
                              <p className="text-green-900 px-1">off</p>
                            </span>
                          </div>
                        </div>

                        <div className="md:col-span-2 relative">
                          <div className="flex items-center justify-center ">
                            <div className="flex flex-col items-center justify-between gap-2 md:gap-3">
                              <p className="bg-primary px-4 py-0.5 text-white hover:bg-white border-2 hover:border-primary hover:text-primary transition-all rounded-full md:mt-4 mt-3 shadow-lg">
                                {cartItem?.product?.brandName}
                              </p>

                              <h1 className="text-md md:text-lg px-4 text-ellipsis line-clamp-1 ">
                                {cartItem?.product?.productName}
                              </h1>
                              <p className="capitalize text-slate-500">
                                {cartItem?.product?.category}
                              </p>
                              <div className="flex md:flex-row flex-col gap-2 md:gap-4 items-center justify-between ">
                                <p className="text-primary font-medium md:text-lg text-md ml-2">
                                  {displayCurrency(
                                    cartItem?.product?.sellingPrice
                                  )}
                                </p>
                                <p className="text-slate-600 font-semibold text-lg line-through">
                                  {displayCurrency(cartItem?.product?.price)}
                                </p>
                              </div>
                              <div className="flex items-center gap-3">
                                <button
                                  className="border border-primary text-primary hover:bg-primary hover:text-white md:w-8 md:h-8 w-6 h-6 flex justify-center items-center rounded"
                                  onClick={(e) =>
                                    handleReduceFromCart(
                                      e,
                                      cartItem?.product?._id
                                    )
                                  }
                                >
                                  -
                                </button>
                                <span>{cartItem?.quantity}</span>
                                <button
                                  className="border border-primary text-primary hover:bg-primary hover:text-white md:w-8 md:h-8 w-6 h-6 flex justify-center items-center rounded"
                                  onClick={(e) =>
                                    handleAddToCart(e, cartItem?.product?._id)
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>

                          <div
                            className="absolute top-2 right-2 md:top-5 md:right-4 text-lg md:text-xl cursor-pointer hover:text-primary"
                            onClick={(e) =>
                              handleDeleteProductItemFromCArt(
                                e,
                                cartItem?.product?._id
                              )
                            }
                          >
                            <RiDeleteBin7Line />
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
              <p>
                {cartProducts &&
                  cartProducts.reduce(
                    (acc, cartItem) => acc + cartItem?.quantity,
                    0
                  )}
              </p>
            </div>
            <div className="flex justify-between mt-2">
              <p>Total Price</p>
              <p>
                {displayCurrency(
                  cartProducts &&
                    cartProducts
                      .reduce(
                        (acc, cartItem) =>
                          acc +
                          cartItem?.product?.sellingPrice * cartItem?.quantity,
                        0
                      )
                      .toFixed(2)
                )}
              </p>
            </div>
            <button
              className="mt-6 w-full bg-primary text-white px-4 py-2 rounded-lg border hover:border-2 hover:border-primary hover:bg-white hover:text-primary hover:shadow-md"
              onClick={handlePayment}
            >
              Buy Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartsProducts;
