import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    allProducts: [],
    loading: true,
  },

  reducers: {
    addAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
    addAllProductsFetched: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { addAllProducts, addAllProductsFetched } = homeSlice.actions;
export default homeSlice.reducer;
