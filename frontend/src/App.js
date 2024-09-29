import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useFetchUser } from "./hooks/useFetchUser.js";
import { useEffect } from "react";
import { useSelector } from "react-redux";
function App() {
  const { autherized } = useSelector((store) => store.user);
  const fetchUser = useFetchUser();
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
