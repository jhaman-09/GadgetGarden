import React, { useEffect, useState } from "react";
import CategoryProductList from "../components/CategoryProductList.js";
import BannerAdvertiseProduct from "../components/BannerAdvertiseProduct.js";
import HorizontelProduct from "../components/HorizontelProduct.js";
import VerticalProducts from "../components/VerticalProducts.js";
import { useDispatch, useSelector } from "react-redux";
import { addAllProducts, addAllProductsFetched } from "../store/homeSlice.js";
import { useFetchedAllProducts } from "../hooks/useFetchedAllProducts.js";
import { categories } from "../helper/categoriesOptions.js";

const Home = () => {
  const dispatch = useDispatch();
  const { allProducts, loading } = useSelector((store) => store.home);
  const [categoryListProduct, setCategoryListProduct] = useState([]);

  const fetchAllProducts = useFetchedAllProducts();
  const handleAllFetchedProducts = async () => {
    const jsonData = await fetchAllProducts();
    if (jsonData?.success) {
      dispatch(addAllProducts(jsonData?.data));
      dispatch(addAllProductsFetched(false));
    }
  };

  useEffect(() => {
    if (loading) handleAllFetchedProducts();

    // filtering one product from each category..
    const productsFromEachCategory = [];
    for (const category of categories) {
      const products = allProducts.filter(
        (product) => product?.category === category?.value
      );
      if (products.length > 0) {
        productsFromEachCategory.push(products[0]);
      }
    }
    setCategoryListProduct(productsFromEachCategory);
  }, [loading]);

  return (
    <div className="md:mb-12 mb-24">
      <CategoryProductList
        categoryList={categoryListProduct}
        loading={loading}
      />

      <BannerAdvertiseProduct />

      {
        <HorizontelProduct
          category={"airpode"}
          heading={"Top Selling Airpodes"}
          data={allProducts.filter(
            (product) => product?.category === "airpode"
          )}
          loading={loading}
        />
      }

      {
        <HorizontelProduct
          category={"mobile"}
          heading={"Best Selling Smartphones"}
          data={allProducts.filter((product) => product?.category === "mobile")} // Pass the filtered array of airpode products
          loading={loading}
        />
      }
      <div>
        {categories.map((option) => {
          let productsForCategory = allProducts.filter(
            (product) =>
              product?.category === option?.value &&
              option?.value !== "mobile" &&
              option.value !== "airpode"
          );

          // Only return the VerticalProducts component if productsForCategory has products
          if (productsForCategory.length > 0) {
            return (
              <VerticalProducts
                key={option.value}
                heading={option?.headline}
                data={productsForCategory}
                loading={loading}
              />
            );
          }
          return null; // Return null if there are no products for the category
        })}
      </div>
    </div>
  );
};

export default Home;
