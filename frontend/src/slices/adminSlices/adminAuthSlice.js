import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    adminInfo:localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo')) : null
}
console.log("Creating adminAuthSlice");
const adminAuthSlice = createSlice({
    name:'adminAuth',
    initialState,
    reducers:{
        setadminCredentials:(state,action)=>{
            console.log("Setting admin credentials");
            state.adminInfo = action.payload;
            localStorage.setItem('adminInfo',JSON.stringify(action.payload))
        },
        logout:(state,action)=>{
            console.log("Logging out");
            state.adminInfo = null;
            localStorage.removeItem('adminInfo');
        }
    }
})
console.log("Exporting actions: setadminCredentials, logout");

export const { setadminCredentials,logout } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;