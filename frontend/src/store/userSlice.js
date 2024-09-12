import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    autherized: false,
  },

  reducers: {
    addUser: (state, action) => {
      state.user = action.payload
    },
    removeUser: (state, action) => {
      state.user = null
    },
    isAutherized: (state, action) => {
      state.autherized = action.payload;
    },
  },
});


export const { isAutherized,addUser, removeUser } = userSlice.actions;
export default userSlice.reducer