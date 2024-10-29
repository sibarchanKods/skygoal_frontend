import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  age: "",
  address: "",
  auth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { _id, firstName, lastName, email, age, address, auth } =
        action.payload;

      state._id = _id;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.age = age;
      state.address = address;
      state.auth = auth;
    },
    resetUser: (state) => {
      state._id = "";
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.age = "";
      state.address = "";
      state.auth = false;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
