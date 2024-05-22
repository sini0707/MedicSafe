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
               
                const res=await fetch(url,{
                    
                    headers:{ Authorization:`Bearer ${token}`
                    }
                    ,credentials:'include'
                })
              
                const result=await res.json()
                
               
                
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
