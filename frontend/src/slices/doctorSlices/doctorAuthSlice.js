import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    doctorInfo:localStorage.getItem('doctorInfo') ? JSON.parse(localStorage.getItem('doctorInfo')) : null
}

const docaAuthSlice = createSlice({
    name:'docAuth',
    initialState,
    reducers:{
        setCredentials:(state,action)=>{
            state.doctorInfo = action.payload;
            localStorage.setItem('doctorInfo',JSON.stringify(action.payload))
        },
        logout:(state,action)=>{
            state.doctorInfo = null;
            localStorage.removeItem('doctorInfo');
        }
    }
})

export const { setCredentials,logout } = docaAuthSlice.actions;

export default docaAuthSlice.reducer;