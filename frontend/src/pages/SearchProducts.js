import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSearchProduct } from "../hooks/useSearchProduct";
import HorizontalProductCard from "../components/HorizontalProductCard";
import HorizontalProductCardLoading from "../components/HorizontalProductCardLoading";

const SearchProducts = () => {
  const query = useLocation(); // taking query from frontend part and sending it to the backend api call as query (req.query)
  const searchProduct = useSearchProduct();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadingCardArray = new Array(13).fill(null);

  const scrollElement = useRef();


  // console.log(query.search);

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
    <div className="container mx-auto p-4">
      <div
        className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        {loading ? (
          <div className="font-medium md:text-4xl text-2xl">
            <h1 className="text-secondary text-center">
              No Data Found Sir....!
            </h1>
            {loadingCardArray.map((product, index) => (
              <HorizontalProductCardLoading key={index} />
            ))}
          </div>
        ) : (
          data && data.map((product) => (
            <HorizontalProductCard
              product={product}
              key={product?.productName}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SearchProducts;
