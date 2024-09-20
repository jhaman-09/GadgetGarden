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
  }, [])
  
  console.log(allProduct);
  
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

      <div className="flex items-center flex-wrap gap-s py-4  overflow-y-scroll">
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
