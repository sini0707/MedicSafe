import { baseURL } from "../../../../backend/config/db.js"
import { apiSlice } from "./apiSlice";

console.log("Start exporting doctorsApiSlice");
export const doctorsApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        logout:builder.mutation({
            query:()=>({
                url:`${baseURL}/adminlogout`,
                method:'POST'
            })


    })



})
})
console.log("End exporting doctorsApiSlice");