import React, { useEffect, useState } from "react";
import CategoryProductList from "../components/CategoryProductList.js";
import BannerAdvertiseProduct from "../components/BannerAdvertiseProduct.js";
import HorizontelProduct from "../components/HorizontelProduct.js";
import VerticalProducts from "../components/VerticalProducts.js";
import { useDispatch, useSelector } from "react-redux";
import { endPoint } from "../helper/api.js";
import { addCategoryList, addHomeFetched } from "../store/homeSlice.js";

const Home = () => {
  const dispatch = useDispatch();
  const { categoryList, categoryListFetched } = useSelector(
    (store) => store.home
  );

  const [loading, setLoading] = useState(false);

  const fetchOneProductFromEachCategory = async () => {
    setLoading(true);
    const response = await fetch(endPoint.oneProductFromEachCategory.url, {
      method: endPoint.oneProductFromEachCategory.method,
      credentials: "include",
    });
    const jsonData = await response.json();
    setLoading(false);
    dispatch(addCategoryList(jsonData.data));
    dispatch(addHomeFetched(true));
  };

  useEffect(() => {
    if (!categoryListFetched) {
      fetchOneProductFromEachCategory();
    }
  }, [categoryListFetched]);

  return (
    <div className="md:mb-12 mb-24">
      <CategoryProductList categoryList={categoryList} loading={loading} />
      <BannerAdvertiseProduct />

      <HorizontelProduct
        category={"airpode"}
        heading={"Top Selling Airpodes"}
      />
      <HorizontelProduct
        category={"mobile"}
        heading={"Best Selling Smartphones"}
      />

      <VerticalProducts category={"watch"} heading={"Smart Watches"} />
      <VerticalProducts
        category={"television"}
        heading={"Best Smart Television"}
      />
      <VerticalProducts
        category={"camera"}
        heading={"High Resolution Camera"}
      />
      <VerticalProducts category={"trimmer"} heading={"Most Durable Trimmer"} />
      <VerticalProducts category={"speaker"} heading={"Top Selling Speaker"} />
      <VerticalProducts
        category={"earphone"}
        heading={"Stylish Earphone From Top Brands"}
      />
      <VerticalProducts
        category={"mouse"}
        heading={"RBG Mouse With Microphone"}
      />
      <VerticalProducts category={"printer"} heading={"High Quality Printer"} />
      <VerticalProducts
        category={"processor"}
        heading={"Processor From Top Brands"}
      />
      <VerticalProducts
        category={"refrigerator"}
        heading={"Refrigerator with Extra Cooling Techniques"}
      />
    </div>
  );
};

export default Home;
