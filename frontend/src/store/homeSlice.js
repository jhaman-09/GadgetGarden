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
    uploadNewProduct: (state, action) => {
      state.allProducts.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.allProducts.findIndex(
        (product) => product._id === action.payload._id
      );
      if (index !== -1) {
        state.allProducts[index] = action.payload; // Update the existing product
      }
    },
  },
});

export const {
  addAllProducts,
  addAllProductsFetched,
  updateProduct,
  uploadNewProduct,
} = homeSlice.actions;
export default homeSlice.reducer;
