import React, { useEffect, useState } from "react";
import { categories } from "../helper/categoriesOptions";
import VarticalyShowProducts from "../components/VarticalyShowProducts";
import { useLocation, useParams } from "react-router-dom";
import { useFetchProductsByCategory } from "../hooks/useFetchProductsByCategory";

const CategoryProducts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // const params = useParams();

  const location = useLocation();

  /* Extract the query params from the URL*/
  const urlSearch = new URLSearchParams(location.search); // it will give url access
  const urlCategoryListinArray = urlSearch.getAll("category");    // it will give category search in array form
  const categoryValue = urlCategoryListinArray[0];    

  const fetchProductsByCategory = useFetchProductsByCategory();

  const fetchProductDataThroughCategory = async () => {
    setLoading(true);
    const jsonData = await fetchProductsByCategory(categoryValue);

    setData(jsonData.data);
    setLoading(false);
    console.log(jsonData.data);
  };

  const handleChangeSortBy = () => {};

  const handleSeletedCategoryType = () => {};

  useEffect(() => {
    fetchProductDataThroughCategory();
  }, []);

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
              {/* {checked={sortBy === "asc"}} */}
              <div className="flex items-center gap-3">
                {
                  <input
                    type="radio"
                    name="sortBy"
                    onChange={handleChangeSortBy}
                    value={"asc"}
                  />
                }
                <label>Price - Low to High</label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  onChange={handleChangeSortBy}
                  value={"dsc"}
                />
                <label>Price - High to Low</label>
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
                          value={category?.value}
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
            {data.length !== 0 && !loading && (
              <VarticalyShowProducts
                data={data}
                loading={loading}
                key={data.length}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
