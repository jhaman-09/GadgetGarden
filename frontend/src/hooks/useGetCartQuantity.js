import { toast } from "react-toastify";
import { endPoint } from "../helper/api";
import { useDispatch } from "react-redux";
import { isCartSize } from "../store/userSlice";

export const useGetCartQuantity = () => {
  const dispatch = useDispatch();
  const cartQuantity = async () => {
    const res = await fetch(endPoint.getCartQuantity.url, {
      method: endPoint.getCartQuantity.method,
      credentials: "include",
    });

    const jsonData = await res.json();
    if (jsonData.success) {
      toast.success(jsonData.message);
      dispatch(isCartSize(jsonData.data))
    } else {
      toast.error(jsonData.message);
    }
    return jsonData;
  };
  return cartQuantity ;
};
