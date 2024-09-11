import React, { useState } from "react";
import signingif from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import imageToBase64 from "../helper/imageToBase64.js";
import { endPoint } from "../helper/api.js";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { isAutherized } from "../store/userSlice.js";
import { Navigate } from "react-router-dom";

const Signup = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfPass, setShowConfPass] = useState(false);
  const dispatch = useDispatch();
  const { autherized } = useSelector((store) => store.user);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    conformPassword: "",
    profilepic: "",
  });

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

    // if password and confirm password match then fetch
    if (data.password === data.conformPassword) {
      const res = await fetch(endPoint.register.url, {
        method: endPoint.register.method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.message);
        throw new Error(errorData.message);
      }
      const json = await res.json();
      toast.success(json.message);
      dispatch(isAutherized(true));
    }
    else {
      throw new Error("Please check password and confirm password")
    }
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const image = await imageToBase64(file);
    setData((prev) => {
      return {
        ...prev,
        profilepic: image,
      };
    });
  };

  if (autherized) {
    return <Navigate to="/login" />;
  }

  
  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-4 w-full max-w-sm mx-auto rounded-md">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilepic || signingif} alt="user-logo" />
            </div>

            <form>
              <label>
                <div className="text-xs bg-opacity-75 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                  Upload Photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Name :</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="Enter Your Name.."
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  required
                  className="outline-none h-full w-full bg-transparent"
                />
              </div>
            </div>
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
            </div>

            <div>
              <label>Confirm Password :</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showConfPass ? "text" : "password"}
                  placeholder="Enter COnfirm Password.."
                  name="conformPassword"
                  value={data.conformPassword}
                  onChange={handleChange}
                  required
                  className="outline-none h-full w-full bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowConfPass(!showConfPass)}
                >
                  <span>{!showConfPass ? <FaEye /> : <FaEyeSlash />}</span>
                </div>
              </div>
            </div>

            <button className="bg-[#9F2B68] hover:bg-[#c20d6d]  text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-5">
              Sign Up
            </button>
          </form>

          <p className="my-4">
            {" "}
            Have a account ?{" "}
            <Link
              to={"/login"}
              className=" text-[#9F2B68] hover:text-[#c20d6d] hover:underline"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
