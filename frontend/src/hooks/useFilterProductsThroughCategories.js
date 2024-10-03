import { endPoint } from "../helper/api";

export const useFilterProductsThroughCategories = () => {
  const filterProductsThroughCategories = async (categoriesArray) => {
    const res = await fetch(endPoint.getFilteredProductsThroughCategories.url, {
      method: endPoint.getFilteredProductsThroughCategories.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoriesArray: categoriesArray }),
    });

    const jsonData = await res.json();
    return jsonData;
  };
  return filterProductsThroughCategories;
};
