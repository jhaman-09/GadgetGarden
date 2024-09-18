import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { categories } from "../helper/categoriesOptions";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { uploadImageToClodinary } from "../helper/UploadToClodinary";
const UploadProduct = ({ onClose }) => {
  const [showImageFullScreen, setShowImageFullScreen] = useState(false);
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleProductImageUpoad = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const uploadedImageToCloudinary = await uploadImageToClodinary(file);

    if (uploadedImageToCloudinary?.url) {
      setData((prev) => ({
        ...prev,
        productImage: [...prev.productImage, uploadedImageToCloudinary.url],
      }));
    }
  };

  const handleProductImageDelete = async(index) => {
    const ProductImageArray = [...data.productImage];
    ProductImageArray.splice(index, 1);

    setData((prev) => {
      return {
        ...prev,
        productImage: ProductImageArray,
      };
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  console.log(data?.productImage);

  return (
    <div className="top-0 bottom-0 left-0 right-0 bg-slate-200 h-full w-full fixed bg-opacity-35 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full h-full max-w-2xl max-h-[80%] overflow-hidden">
        <div className="flex justify-center items-center pb-3">
          <h1>Upload Product</h1>
          <div
            className="w-fit ml-auto text-2xl bg-orange-300 hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>

        <form
          className="flex flex-col p-4 overflow-y-scroll h-full pb-5"
          onSubmit={handleSubmit}
        >
          <label htmlFor="productName">Product Name :</label>
          <input
            type="text"
            id="productName"
            placeholder="Enter Product Name"
            name="productName"
            value={data.productName}
            onChange={handleChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="brandName">Brand Name :</label>
          <input
            type="text"
            id="brandName"
            placeholder="Enter Product Name"
            name="brandName"
            value={data.brandName}
            onChange={handleChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <div className="flex flex-col">
            <label htmlFor="category" className="">
              Category :
            </label>
            <select
              id="category"
              className=" border-1 border-black bg-slate-100  mt-1 p-2 text-center"
            >
              {categories &&
                categories.map((ele, idx) => (
                  <option value={ele.value} key={ele.id + idx} className="">
                    {ele.name}
                  </option>
                ))}
            </select>
          </div>

          <label htmlFor="productImage" className="mt-3">
            Product Image
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="flex flex-col justify-center items-center text-slate-500 gap-2">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  onChange={handleProductImageUpoad}
                  className="hidden"
                />
              </div>
            </div>
          </label>
          <div className="">
            {data?.productImage[0] ? (
              <div className="flex items-center gap-2 p-2">
                {data?.productImage.map((ele, idx) => {
                  return (
                    <div className="relative group" key={idx}>
                      <img
                        src={ele}
                        alt="product-image"
                        width={80}
                        height={80}
                        className="bg-slate-100 border cursor-pointer"
                        onClick={() => {
                          // showImageFullScreen(true);
                        }}
                      />
                      <div
                        className="absolute bottom-0 right-0 p-1 text-white bg-primary rounded-full hidden group-hover:block cursor-pointer"
                        onClick={() => handleProductImageDelete(idx)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-600 text-xs">
                *Please uplord product image...
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadProduct;
