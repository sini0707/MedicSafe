import {useEffect,useState} from 'react'

import {token} from "../../config.js"



const useFetchData = (url) => {
  
 
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)

    // useEffect(()=>{
        const fetchData=async()=>{

            setLoading(true)
            try{
                console.log("Fetching data from:", url);
                const res=await fetch(url,{
                    
                    headers:{ Authorization:`Bearer ${token}`
                    }
                    ,credentials:'include'
                })
                console.log("Response status:", res.status);
                const result=await res.json()
                console.log("Response data:", result);
               
                
                if(!res.ok){
                    throw new Error(result.message + ' ')
                }
                setData(result.data)
                setLoading(false)
            }catch(err){
                setLoading(false)
                setError(err.message)
                console.log(err,"fetchDs");

            }
        }
    //     fetchData()
    // },[url])

    useEffect(()=>{
        fetchData()
    },[url])

    const refetch=()=>{
        fetchData()
    }

  return {
    data,
    loading,
    error,
    fetchData,
    refetch
  }
}

export default useFetchData
