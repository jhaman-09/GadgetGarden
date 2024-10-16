import React from "react";
import CategoryProductList from "../components/CategoryProductList.js";
import BannerAdvertiseProduct from "../components/BannerAdvertiseProduct.js";
import HorizontelProduct from "../components/HorizontelProduct.js";
import VerticalProducts from "../components/VerticalProducts.js";

const Home = () => {
  return (
    <div className="md:mb-12 mb-24">
      <CategoryProductList />
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
