import { baseURL } from "../../../../backend/config/db.js"
import { apiSlice } from "./apiSlice";


export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        adminlogout:builder.mutation({
            query:()=>({
                url:`${baseURL}/adminlogout`,
                method:'POST'
            })


    })



})
})


export const {
    useAdminlogoutMutation,

}=adminApiSlice