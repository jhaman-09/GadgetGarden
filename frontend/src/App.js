import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { endPoint } from "./helper/api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, isAutherized } from "./store/userSlice.js";

function App() {
  const dispatch = useDispatch();
  const { autherized } = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const response = await fetch(endPoint.userDetails.url, {
        method:endPoint.userDetails.method,
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(addUser(data.user));
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      dispatch(isAutherized(false));
    }
  };

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
