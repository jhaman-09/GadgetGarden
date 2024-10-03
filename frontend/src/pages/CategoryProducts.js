import React, { useEffect, useState } from "react";
import { categories } from "../helper/categoriesOptions";
import VarticalyShowProducts from "../components/VarticalyShowProducts";
import { useLocation, useNavigate } from "react-router-dom";
import { useFilterProductsThroughCategories } from "../hooks/useFilterProductsThroughCategories";

const CategoryProducts = () => {
  const location = useLocation();
  const navigate = useNavigate();

  /* Extract the query params from the URL */
  const urlSearch = new URLSearchParams(location.search); // it will give url access
  const urlCategoryListInArray = urlSearch.getAll("category"); // it will give category search in array form
  // const categoryValue = urlCategoryListinArray[0];

  const [filteredCategoryArray, setFilteredCategoryArray] = useState(
    urlCategoryListInArray
  );
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [sortBy, setSortBy] = useState("");

  const filterProductsThroughCategories = useFilterProductsThroughCategories();

  const fetchProductDataThroughCategory = async () => {
    setLoading(true);
    const jsonData = await filterProductsThroughCategories(
      urlCategoryListInArray
    );
    setData(jsonData.data);
    setLoading(false);
  };

  // Handle category selection (checkbox change)
  const handleSeletedCategoryType = (e) => {
    const { name, checked } = e.target;
    let updatedCategories = [];

    if (checked) {
      // Add the selected category to the filtered array
      updatedCategories = [...filteredCategoryArray, name];
    } else {
      // Remove the unselected category from the filtered array
      updatedCategories = filteredCategoryArray.filter(
        (category) => category !== name
      );
    }

    setFilteredCategoryArray(updatedCategories);

    //format for url change when change on the checkbox
    const urlFormat = updatedCategories.map((el) => `category=${el}`).join("&");
    navigate("/product-category?" + urlFormat);
  };

  const handleChangeSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);

    if (value === "asc") {
      setData((prev) => prev.sort((a, b) => a.sellingPrice - b.sellingPrice));
    }
    if (value === "dsc") {
      setData((prev) => prev.sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };

  useEffect(() => {
    fetchProductDataThroughCategory();
  }, [filteredCategoryArray]);

  return (
    <div className="container mx-auto p-4">
      <div className="hidden md:grid h-full grid-cols-[220px,1fr]">
        {/* {Left Side} */}
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
          {/* {sort by} */}
          <div>
            <h3 className="text-base uppercase font-medium text-slate-700 border-b pb-1 border-slate-500">
              Sort By
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                {
                  <input
                    type="radio"
                    name="sortBy"
                    checked={sortBy === "asc"}
                    onChange={(e) => handleChangeSortBy(e)}
                    value={"asc"}
                    id={"asc"}
                  />
                }
                <label htmlFor={"asc"}>Price - Low to High</label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "dsc"}
                  onChange={(e) => handleChangeSortBy(e)}
                  value={"dsc"}
                  id={"dsc"}
                />
                <label htmlFor={"dsc"}>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* {Filter By} */}
          <div>
            <h3 className="text-base uppercase font-medium text-slate-700 border-b pb-1 border-slate-500">
              Filter By
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2">
              {categories &&
                categories.map((category) => (
                  <div key={category.value}>
                    {category?.value !== "" && (
                      <span className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          name={category?.value}
                          value={category?.value || false}
                          id={category?.value}
                          onChange={handleSeletedCategoryType}
                        />
                        <label htmlFor={category?.value}>
                          {category?.name}
                        </label>
                      </span>
                    )}
                  </div>
                ))}
            </form>
          </div>
        </div>

        {/* {Right side} */}
        <div className="px-4">
          <div className="min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]">
            <VarticalyShowProducts
              data={data}
              loading={loading}
              allowMargin="false"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
