import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    adminInfo:localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo')) : null
}

const adminAuthSlice = createSlice({
    name:'adminAuth',
    initialState,
    reducers:{
        setadminCredentials:(state,action)=>{
                    state.adminInfo = action.payload;
            localStorage.setItem('adminInfo',JSON.stringify(action.payload))
        },
        logout:(state,action)=>{
         
            state.adminInfo = null;
            localStorage.removeItem('adminInfo');
        }
    }
})
;

export const { setadminCredentials,logout } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;