import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { categories } from "../helper/categoriesOptions";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { uploadImageToClodinary } from "../helper/UploadToClodinary";
import DisplayImageFullScreen from "./DisplayImageFullScreen";
import { useEditProduct } from "../hooks/useEditProduct";
import { useDispatch } from "react-redux";
import { updateProduct } from "../store/homeSlice";

{
  /* Admin can Edit its own Uploaded Products*/
}

const AdminEditProduct = ({ productData, onClose, setAllProduct }) => {
  const [showImageFullScreen, setShowImageFullScreen] = useState(false);
  const [showImageFullScreenLink, setShowImageFullScreenLink] = useState("");
  const [data, setData] = useState({
    ...productData, // this will give productData. _id
    productName: productData.productName,
    brandName: productData.brandName,
    category: productData.category,
    productImage: productData.productImage || [],
    description: productData.description,
    price: productData.price,
    sellingPrice: productData.sellingPrice,
  });

  const dispatch = useDispatch();

  const [updating, setUpdating] = useState(false);

  const editProduct = useEditProduct();

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

  const handleProductImageDelete = async (index) => {
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
    setUpdating(true);
    const jsonData = await editProduct({ data, onClose });
    if (jsonData?.success) {
      setData(jsonData?.data);
      setAllProduct((prev) =>
        prev.map((product) =>
          product._id === jsonData?.data._id ? jsonData?.data : product
        )
      );
      dispatch(updateProduct(jsonData?.data));
    }
    setUpdating(false);
  };  

  return (
    <div className="top-0 bottom-0 left-0 right-0 bg-slate-200 h-full w-full fixed bg-opacity-35 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full h-full max-w-2xl max-h-[80%] overflow-hidden">
        <div className="flex justify-center items-center pb-3">
          <h1 className="text-lg px-4 font-semibold">Upload Product</h1>
          <div
            className="w-fit ml-auto text-2xl rounded-sm bg-secondary text-black cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>

        <form
          className="flex flex-col p-4 overflow-y-scroll h-full"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label htmlFor="productName">Product Name :</label>
            <input
              type="text"
              id="productName"
              placeholder="Enter Product Name"
              name="productName"
              value={data.productName}
              onChange={handleChange}
              className="p-2 mt-1 bg-slate-100 border rounded"
              required
            />
          </div>

          <div className="flex flex-col mt-3">
            <label htmlFor="brandName">Brand Name :</label>
            <input
              type="text"
              id="brandName"
              placeholder="Enter Product Name"
              name="brandName"
              value={data.brandName}
              onChange={handleChange}
              className="p-2 mt-1 bg-slate-100 border rounded"
              required
            />
          </div>

          <div className="flex flex-col mt-3">
            <label htmlFor="category">Category :</label>
            <select
              id="category"
              className=" border-1 border-black rounded bg-slate-100  mt-1 p-2 text-center"
              value={data.category}
              name="category"
              required
              onChange={handleChange}
            >
              {categories &&
                categories.map((ele, idx) => (
                  <option value={ele.value} key={ele.id + idx} className="">
                    {ele.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Upload Product Images */}

          <div className="mt-3">
            <label htmlFor="productImage">Product Image :</label>
            <div className="mt-1">
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
            </div>
          </div>

          {/* Show Product Image */}

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
                          setShowImageFullScreen(true);
                          setShowImageFullScreenLink(ele);
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
              <p className="text-secondary text-xs">
                *Please uplord product image...
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="price" className="mt-3">
              Price :{" "}
            </label>
            <input
              type="number"
              id="price"
              placeholder="Enter Price"
              name="price"
              onChange={handleChange}
              className="p-2 mt-1 bg-slate-100 border rounded"
              required
              value={data.price}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="sellingPrice" className="mt-3">
              Selling Price :{" "}
            </label>
            <input
              type="number"
              id="sellingPrice"
              placeholder="Enter Selling Price"
              name="sellingPrice"
              onChange={handleChange}
              className="p-2 mt-1 bg-slate-100 border rounded"
              required
              value={data.sellingPrice}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="description" className="mt-3">
              Description :{" "}
            </label>
            <textarea
              type="text"
              id="description"
              rows={3}
              placeholder="Describe The Product"
              name="description"
              onChange={handleChange}
              className="p-2 mt-1 bg-slate-100 border rounded"
              value={data.description}
            ></textarea>
          </div>

          <button
            className={`px-3 my-5 py-2 rounded-sm transition-all text-white ${
              updating ? "bg-secondary" : "bg-primary hover:bg-secondary"
            }`}
          >
            {updating ? "Updating...." : "Update product"}
          </button>
        </form>
      </div>

      {/* Show Product Image In Full Screen */}

      {showImageFullScreen && (
        <DisplayImageFullScreen
          onClose={() => setShowImageFullScreen(false)}
          imageUrl={showImageFullScreenLink}
        />
      )}
    </div>
  );
};

export default AdminEditProduct;
