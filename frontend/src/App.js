import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useFetchUser } from "./hooks/useFetchUser.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchedAllProducts } from "./hooks/useFetchedAllProducts.js";
import { addAllProducts, addAllProductsFetched } from "./store/homeSlice.js";

function App() {
  const { autherized } = useSelector((store) => store.user);
  const { allProducts } = useSelector((store) => store.home);
  const dispatch = useDispatch();

  const fetchAllProducts = useFetchedAllProducts();
  const fetchUser = useFetchUser();

  const handleAllFetchedProducts = async () => {
    const jsonData = await fetchAllProducts();
    if (jsonData?.success) {
      dispatch(addAllProducts(jsonData?.data));
      dispatch(addAllProductsFetched(false));
    }
  };

  useEffect(() => {
    if (allProducts.length === 0) handleAllFetchedProducts();
  }, [allProducts]);

  useEffect(() => {
    fetchUser();
  }, [autherized]);

  return (
    <>
      <Header />
      <ToastContainer position="top-center" />
      <main className="min-h-[calc(100vh-120px)] pt-14">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
