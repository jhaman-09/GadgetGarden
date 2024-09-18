import React, { useState } from "react";
import signingif from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { endPoint } from "../helper/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isAutherized } from "../store/userSlice.js";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Not recommended for long-term storage
    try {
      const response = await fetch(endPoint.login.url, {
        method: endPoint.login.method,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`, // Bearer token sent in headers
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error(errorData.message);
      }
      const jsonData = await response.json();
      dispatch(isAutherized(true));
      toast.success(jsonData.message);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-4 w-full max-w-sm mx-auto rounded-md">
          <div className="w-20 h-20 mx-auto">
            <div>
              <img src={signingif} alt="login-gif" />
            </div>
          </div>

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Email :</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="Enter Your Email.."
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  required
                  className="outline-none h-full w-full bg-transparent"
                />
              </div>
            </div>

            <div>
              <label>Password :</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Enter Your Password.."
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  required
                  className="outline-none h-full w-full bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPass(!showPass)}
                >
                  <span>{!showPass ? <FaEye /> : <FaEyeSlash />}</span>
                </div>
              </div>

              <Link
                to={"/forget-password"}
                className="block w-fit ml-auto hover:underline hover:text-[#9F2B68]"
              >
                Forget Password
              </Link>
            </div>

            <button className="bg-[#9F2B68] hover:bg-[#c20d6d]  text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-5">
              Login
            </button>
          </form>
          <p className="my-4">
            {" "}
            Don't have account ?{" "}
            <Link
              to={"/sign-up"}
              className=" text-[#9F2B68] hover:text-[#c20d6d] hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
