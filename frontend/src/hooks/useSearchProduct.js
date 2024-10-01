import { endPoint } from "../helper/api";

export const useSearchProduct = () => {
  const searchProduct = async (query) => {
    const res = await fetch(endPoint.searchProductByQuery.url + query, {
      method: endPoint.searchProductByQuery.method,
      credentials: "include",
    });

    const jsonData = await res.json();

    return jsonData;
  };
  return searchProduct;
};
