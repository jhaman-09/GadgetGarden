import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSearchProduct } from "../hooks/useSearchProduct";
import VarticalyShowProducts from "../components/VarticalyShowProducts"

const SearchProducts = () => {
  const query = useLocation(); // taking query from frontend part and sending it to the backend api call as query (req.query)
  const searchProduct = useSearchProduct();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSearchProducts = async () => {
    if (query.search) {
      setLoading(true);
      const jsonData  = await searchProduct(query.search); // passsing query through function for backend to search product
      setData(jsonData.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSearchProducts();
  }, [query]);

  return (
    <div className="ml-10 md:mx-2 mb-24 md:mb-2">
      <VarticalyShowProducts allowMargin={"true"} data={data} loading={loading} />
    </div>
  );
};

export default SearchProducts;
