import {useEffect,useState} from 'react'
 import { baseURL} from '../../../backend/config/db'



const useFetchData = (url) => {

    const token=localStorage.getItem('token')
    console.log(token,"tokemmmmmmmmmmmm")
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)

    useEffect(()=>{
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

            }
        }
        fetchData()
    },[url])
  return {
    data,
    loading,
    error,
  }
}

export default useFetchData
