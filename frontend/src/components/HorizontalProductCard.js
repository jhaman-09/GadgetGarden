import React from 'react'
import { Link } from 'react-router-dom'
import displayCurrency from '../helper/displayCurrency'

const HorizontalProductCard = ({product}) => {
  return (
    <Link
      to={"/product/" + product?._id}
      className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow"
    >
      <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
        <img
          src={product?.productImage[0]}
          alt="product_img"
          className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
        ></img>
      </div>

      <div className="p-4 grid">
        <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
          {product?.productName}
        </h2>
        <p className="capitalize text-slate-500">{product?.category}</p>

        <div className="flex gap-3">
          <p className="text-primary font-medium">{displayCurrency(product?.sellingPrice)}</p>
          <p className="text-primary font-medium line-through">{displayCurrency(product?.price)}</p>
        </div>
        <button className='text-sm bg-primary hover:bg-secondary text-white px-3 py-0.5 rounded-full'>Add to Cart</button>
      </div>
    </Link>
  );
}

export default HorizontalProductCard