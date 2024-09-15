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

  const userDetails = async () => {
    try {
      const res = await fetch(endPoint.userDetails.url, {
        credentials: "include",
        method: endPoint.userDetails.method,
      });

      const data = await res.json();
      

      if (data.error) {
        throw new Error("Failed to fetch user data");
      } else {
        dispatch(addUser(data.user));
      }
    } catch (error) {
      console.log(error);
      dispatch(isAutherized(false));
    }
  };

  useEffect(() => {
    if (autherized) userDetails();
  }, [autherized]);

  return (
    <>
      <Header />
      <ToastContainer position="top-center" />
      <main className="min-h-[calc(100vh-120px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
