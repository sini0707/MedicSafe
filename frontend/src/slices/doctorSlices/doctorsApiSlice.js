import { apiSlice } from "./apiSlice";

const baseURL = '/api/v1/doctors';

export const doctorsApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        register:builder.mutation({
            query:(data)=>({
                url:`${baseURL}/register`,
                method:'POST',
                body:data
            })
        }),
        verify:builder.mutation({
            query:(data)=>({
                url:`${baseURL}/doctors/otp`,
                method:'POST',
                body:data
            })
        }),
        logout:builder.mutation({
            query:()=>({
                url:`${baseURL}/logout`,
                method:'POST'
            })
        })



    })
})


export const { 
    useRegisterMutation,
    useVerifyMutation,
   
 } = doctorsApiSlice;