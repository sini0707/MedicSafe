import { apiSlice } from "./apiSlice";

import { baseURL } from "../../../../backend/config/db.js"


export const doctorsApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        register:builder.mutation({
            query:(data)=>({
                url:`${baseURL}/doctors/register`,
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