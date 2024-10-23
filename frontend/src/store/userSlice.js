import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    autherized: false,
    cartProducts: [],
  },

  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      state.autherized = true;
    },
    removeUser: (state) => {
      state.user = null;
      state.autherized = false;
      state.cartProducts = [];
    },
    isAutherized: (state, action) => {
      state.autherized = action.payload;
    },
    addToCart: (state, action) => {
      state.cartProducts = action.payload;
    },
    removeCart: (state) => {
      state.cartProducts = [];
    },
  },
});

export const { isAutherized, addUser, removeUser, addToCart, removeCart } =
  userSlice.actions;
export default userSlice.reducer;
