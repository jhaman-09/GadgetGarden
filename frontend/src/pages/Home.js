import React from 'react'
import CategoryProductList from "../components/CategoryProductList.js";
import BannerAdvertiseProduct from '../components/BannerAdvertiseProduct.js';

const Home = () => {
  return (
    <>
      <CategoryProductList />
      <BannerAdvertiseProduct/>
    </>
  )
}

export default Home