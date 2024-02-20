import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  doctorInfo: localStorage.getItem("doctorInfo")
    ? JSON.parse(localStorage.getItem("doctorInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    setDoctorCredentials: (state, action) => {
      state.doctorInfo = action.payload;
      localStorage.setItem("doctorInfo", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
    
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, setDoctorCredentials, logout } =
  authSlice.actions;

export default authSlice.reducer;
