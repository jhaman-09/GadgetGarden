import React, { useState } from "react";
import displayCurrency from "../helper/displayCurrency";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";

{
  /* Product Card.... */
}

const AdminProductCard = ({ data, setAllProduct }) => {
  const [editPruduct, setEditProduct] = useState(false);

  const toInteger = (num) => {
    return Math.floor(num);
  };

  return (
    <div className="p-4 text-black rounded  hover:transition-all">
      <div className="w-40 flex">
        <div>
          <div className="w-32 h-32 flex justify-center items-center">
            <img
              src={data?.productImage[0]}
              alt="Product_Image"
              className="mx-auto object-fill h-full"
            />
          </div>
          <h1 className="text-ellipsis line-clamp-2">{data?.productName}</h1>
        </div>
      </div>

      <div>
        <span className="flex">
          <p className="font-semibold">{displayCurrency(data?.sellingPrice)}</p>
          <p className="px-2 text-green-700 font-semibold">
            {toInteger(data.discount)}% off
          </p>
        </span>
        <div
          className="w-fit ml-auto p-2  border-2 border-black hover:border-2 hover:border-primary hover:shadow-lg rounded-full cursor-pointer"
          onClick={() => setEditProduct(true)}
        >
          <MdModeEditOutline className="" />
        </div>
      </div>

      {editPruduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          // fetchData={fetchData}
          setAllProduct={setAllProduct}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
