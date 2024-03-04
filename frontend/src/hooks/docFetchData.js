// import {useEffect,useState} from 'react'

// import { doctoken } from '../../config.js'

// const docFetchData = (url) => {
//     const [data,setData]=useState([])
//     const [loading,setLoading]=useState(false)
//     const [error,setError]=useState(null)

//     // useEffect(()=>{
//         const fetchData=async()=>{

//             setLoading(true)
//             try{

//                 const res=await fetch(url,{
//                     headers:{ Authorization:`Bearer ${doctoken}`
//                     }
//                     ,credentials:'include'
//                 })
//                 const result=await res.json()
                
//                 if(!res.ok){
//                     throw new Error(result.message + ' ')
//                 }
//                 setData(result.data)
//                 setLoading(false)
//             }catch(err){
//                 setLoading(false)
//                 setError(err.message)

//             }
//         }
//         fetchData()
//     },[url])
//   return {
//     data,
//     loading,
//     error,
//   }
// }

// export default docFetchData
import { useEffect, useState } from 'react';
import { doctoken } from '../../config.js';

const docFetchData = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(url, {
                    headers: { Authorization: `Bearer ${doctoken}` },
                    credentials: 'include'
                });
                const result = await res.json();

                if (!res.ok) {
                    throw new Error(result.message + ' ');
                }
                setData(result.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(err.message);
            }
        };
        fetchData();
    }, [url]);

    return {
        data,
        loading,
        error,
    };
};

export default docFetchData;

