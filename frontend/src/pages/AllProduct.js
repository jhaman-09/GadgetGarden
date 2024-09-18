import React, { useState } from "react";
import AdminProductCard from "../components/AdminProductCard";
import UploadProduct from "../components/UploadProduct";

const AllProduct = () => {
  const [showProductUpload, setShowProductUpload] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const handleFetchAllProductData = async () => {
    // const res = await fetch("", {
    //   headers: {},
    //   credentials: "include",
    //   method: "POST",
    // });
  };


  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Products</h2>
        <button
          className="border-2 px-2 py-1 border-primary rounded-full text-primary hover:bg-secondary hover:text-white transition-all"
          onClick={() => setShowProductUpload(true)}
        >
          Add New Product
        </button>
      </div>

      <div className="flex items-center flex-wrap gap-s py-4 h-[calc(100vh-190px)] overflow-y-scroll">
        {allProduct &&
          allProduct.map((product, index) => {
            return (
              <AdminProductCard
                data={product}
                key={index + "allProduct"}
                fetchData={handleFetchAllProductData}
              />
            );
          })}
      </div>

      {showProductUpload && (
        <UploadProduct
          onClose={() => setShowProductUpload(false)}
          fetchData={handleFetchAllProductData}
        />
      )}
    </div>
  );
};

export default AllProduct;
