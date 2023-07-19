import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  money: 0,
  count: 0,
  role: "",
  username: "",
  email:"",
  access_token: "",
};
export const userSlide = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        role,
        name = "",
        money = "",
        count = "",
        username = "",
        access_token,
        email="",
        _id = "",
      } = action.payload;
      state.role = role;
      state.name = name;
      state.money = money;
      state.count = count;
      state.id = _id;
      state.access_token = access_token;
      state.username = username;
      state.email = email
    },
    resetUser: (state) => {
      state.role = "";
      state.name = "";
      state.money = "";
      state.count = "";
      state.id = "";
      state.access_token = "";
      state.username = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions;

export default userSlide.reducer;
