    import { apiSlice } from "./apiSlice";
    import { baseURL } from "../../../backend/config/db";

    export const usersApiSlice = apiSlice.injectEndpoints({
        endpoints:(builder)=>({

            verify:builder.mutation({
                query:(data)=>({
                    url:`${baseURL}/users/otpverify`,
                    method:'POST',
                    body:data
                })
            }),

        })
    })


    export const { 
    useVerifyMutation,
    }= usersApiSlice;