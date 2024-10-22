import React from "react";
import { Link } from "react-router-dom";
import displayCurrency from "../helper/displayCurrency";
import { useFetchAddToCart } from "../hooks/useFetchAddToCart";

const HorizontalProductCard = (props) => {
  const fetchAddToCart = useFetchAddToCart();

  const handleAddToCart = async (e, _id) => {
    await fetchAddToCart(e, _id);
  };

  return (
    <Link
      to={
        props.recommended
          ? "/product/" + props?.product?._id
          : "product/" + props?.product?._id
      }
      className={
        props.design
          ? `w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow h-[148px] ${props?.design}`
          : `w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow`
      }
    >
      <div
        className={
          props?.design
            ? `bg-slate-200 h-full p-4 min-w-[280px] md:min-w-[133px] flex justify-center items-center`
            : `bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center`
        }
      >
        <img
          src={props?.product?.productImage[0]}
          alt="product_img"
          className={
            props?.design
              ? `object-scale-down h-full hover:scale-110 transition-all`
              : `object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply`
          }
        ></img>
      </div>

      <div className={props.design ? `p-4 md:grid hidden` : `p-4 grid gap-3`}>
        <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
          {props?.product?.productName}
        </h2>

        <span
          className={`flex gap-2 items-center ${
            props?.design ? "lg:text-base" : "gap-6"
          }`}
        >
          <p className="capitalize text-slate-500">
            {props?.product?.category}
          </p>
          <p
            className={`text-green-900 font-semibold ${
              !props?.design
                ? "text-white lg:text-md font-medium bg-green-800 rounded-full px-2"
                : ""
            } `}
          >
            {Math.floor(props?.product?.discount)}% off
          </p>
        </span>

        <div className={props.design ? `flex gap-2` : `flex gap-3`}>
          <p className="text-primary font-medium">
            {displayCurrency(props?.product?.sellingPrice)}
          </p>
          <p className="text-primary font-medium line-through">
            {displayCurrency(props?.product?.price)}
          </p>
        </div>
        <button
          className={
            props.design
              ? `text-sm bg-primary hover:bg-secondary text-white px-3 py-1 rounded-full`
              : `text-sm bg-primary hover:bg-secondary text-white px-3 py-3 rounded-full`
          }
          onClick={(e) => handleAddToCart(e, props?.product?._id)}
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default HorizontalProductCard;
