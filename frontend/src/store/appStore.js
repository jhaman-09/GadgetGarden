import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import homeSlice from "./homeSlice"

const appStore = configureStore({
  reducer: {
    user: userSlice,
    home : homeSlice,
  },
});

export default appStore;
