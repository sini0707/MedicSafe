import React,{useState,useEffect} from 'react'
import { baseURL } from '../../../../backend/config/db';
import { useSelector } from 'react-redux';

const WalletComponent = () => {
    const user = useSelector((state) => state.auth.userInfo);
    // console.log(user,"userId kittyyy");

    const [wallet, setWallet] = useState(null);

    // useEffect(() => {
    //     fetchWallet();
    //   }, []);
    
      const fetchWallet = async () => {
        console.log("fetch wallet");
        try {
        const response = await fetch(`${baseURL}/users/wallet`, {
            method: 'get',
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch wallet");
          }
          const data = await response.json();
          setWallet(data);
        } catch (error) {
          console.error("Error fetching wallet:", error);
        }
       };
  return (
    <div>
      <button onClick={fetchWallet}> </button>
    </div>
  )
}

export default WalletComponent
