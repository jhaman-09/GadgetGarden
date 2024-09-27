import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { endPoint } from "../helper/api";
import { addUser, isAutherized } from "../store/userSlice";

export const useFetchUser = () => {
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const response = await fetch(endPoint.userDetails.url, {
        method: endPoint.userDetails.method,
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

  return fetchUser; // Return fetchUser function
};
