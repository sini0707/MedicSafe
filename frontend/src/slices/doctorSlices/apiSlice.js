import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({DOCTORS_URL:''});

export const apiSlice = createApi({
    baseQuery,
    tagTypes:['Doctor'],
    endpoints:(builder)=>({})
});