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
  }, [query.search]);

  return (
    <>
      <VarticalyShowProducts data={data} loading={loading} />
    </>
  );
};

export default SearchProducts;
