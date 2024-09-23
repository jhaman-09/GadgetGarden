import React from 'react'
import CategoryProductList from "../components/CategoryProductList.js";
import BannerAdvertiseProduct from '../components/BannerAdvertiseProduct.js';
import HorizontelProduct from '../components/HorizontelProduct.js';
import VerticalProducts from '../components/VerticalProducts.js';

const Home = () => {
  return (
    <>
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
      <VerticalProducts category={"television"} heading={"Smart Watches"} />
      <VerticalProducts category={"camera"} heading={"Smart Watches"} />
      <VerticalProducts category={"trimmer"} heading={"Smart Watches"} />
      <VerticalProducts category={"speaker"} heading={"Smart Watches"} />
      <VerticalProducts category={"earphone"} heading={"Smart Watches"} />
      <VerticalProducts category={"mouse"} heading={"Smart Watches"} />
      <VerticalProducts category={"printer"} heading={"Smart Watches"} />
      <VerticalProducts category={"processor"} heading={"Smart Watches"} />
      <VerticalProducts category={"refrigerator"} heading={"Smart Watches"} />
    </>
  );
}

export default Home