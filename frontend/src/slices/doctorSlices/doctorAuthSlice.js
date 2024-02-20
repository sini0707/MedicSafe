import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    doctorInfo:localStorage.getItem('doctorInfo') ? JSON.parse(localStorage.getItem('doctorInfo')) : null
}

const docaAuthSlice = createSlice({
    name:'docAuth',
    initialState,
    reducers:{
        setDoctorCredentials:(state,action)=>{
            state.doctorInfo = action.payload;
            localStorage.setItem('doctorInfo',JSON.stringify(action.payload))
        },
        logout:(state,action)=>{
            state.doctorInfo = null;
            localStorage.removeItem('doctorInfo');
        }
    }
})

export const { setDoctorCredentials,logout } = docaAuthSlice.actions;

export default docaAuthSlice.reducer;