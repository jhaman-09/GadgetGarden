import React, { useEffect, useState } from "react";
import AdminProductCard from "../components/AdminProductCard";
import UploadProduct from "../components/UploadProduct";
import { endPoint } from "../helper/api";
import { toast } from "react-toastify";

const AllProduct = () => {
  const [showProductUpload, setShowProductUpload] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const handleFetchAllProductData = async () => {
    const res = await fetch(endPoint.allProduct.url, {
      credentials: "include",
      method: endPoint.allProduct.method,
    });

    const jsonData = await res.json();

    if (jsonData.success) {
      setAllProduct(jsonData.data);
      toast.success(jsonData.message);
    } else {
      toast.error(jsonData.message);
    }
  };

  useEffect(() => {
    handleFetchAllProductData();
  }, []);

  return (
    <div>
      <div className="bg-white py-2 md:px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Products</h2>
        <button
          className="md:border-2 border md:px-2 md:text-base text-sm  md:py-1 border-primary md:rounded-full rounded text-primary hover:bg-primary hover:text-white transition-all"
          onClick={() => setShowProductUpload(true)}
        >
          Add New Product
        </button>
      </div>

      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
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
