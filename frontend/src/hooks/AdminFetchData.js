import {useEffect,useState} from 'react'
import { adminToken } from '../../config'

function AdminFetchData(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const fetchData = async () => {
      setLoading(true);
      try {
       
      
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${adminToken}` },
          credentials:'include'
        });
    
        const result = await res.json();
       
       
      
  
        if (!res.ok) {
          throw new Error(result.message + '');
        }
  
        setData(result.data);
  
        setLoading(false);
      } catch (error) {
        console.log("fetchError", error);
        setError(error);
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, [url]);
  
    const refetch = () => {
     
      fetchData();
    };
  

  
    return {
      data,
      loading,
      error,
      refetch,
      fetchData, 
    };
  }
  
  export default AdminFetchData;
