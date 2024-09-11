import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    autherized: false,
  },

  reducers: {
    isAutherized: (state, action) => {
      state.autherized = action.payload;
    },
  },
});


export const { isAutherized } = userSlice.actions;
export default userSlice.reducer