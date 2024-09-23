import React from 'react'
import CategoryProductList from "../components/CategoryProductList.js";
import BannerAdvertiseProduct from '../components/BannerAdvertiseProduct.js';
import HorizontelProduct from '../components/HorizontelProduct.js';

const Home = () => {
  return (
    <>
      <CategoryProductList />
      <BannerAdvertiseProduct />
      <HorizontelProduct category={"airpode"} heading={"Top Selling Products"}/>
    </>
  );
}

export default Home