import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    categoryList: [],
    categoryListFetched: false,
  },

  reducers: {
    addCategoryList: (state, action) => {
      state.categoryList = action.payload;
    },
    addHomeFetched: (state, action) => {
      state.categoryListFetched = action.payload;
    },
  },
});

export const { addCategoryList, addHomeFetched } = homeSlice.actions;
export default homeSlice.reducer;
