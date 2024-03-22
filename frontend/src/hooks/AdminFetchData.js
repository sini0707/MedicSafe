import {useEffect,useState} from 'react'
import { adminToken } from '../../config'

function AdminFetchData(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log("Fetching data from:", url);
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${adminToken}` },
          credentials:'include'
        });
        console.log("Response status:", res.status);
        const result = await res.json();
        console.log("Response data:", result);
       
      
  
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
      // Call the fetchData function to refetch data
      fetchData();
    };
  
    console.log("data", data);
  
    return {
      data,
      loading,
      error,
      refetch,
      fetchData, // Include the refetch function in the returned object
    };
  }
  
  export default AdminFetchData;
