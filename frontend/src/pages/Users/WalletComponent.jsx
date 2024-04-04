import React,{useState,useEffect} from 'react'
import { baseURL } from '../../../../backend/config/db';
import { useSelector } from 'react-redux';

const WalletComponent = () => {
    const user = useSelector((state) => state.auth.userInfo);
   
    const [wallet, setWallet] = useState(null);

 
      const fetchWallet = async () => {
       
        try {
        const response = await fetch(`${baseURL}/users/getwallet`, {
            method: 'get',
            headers: {
              Authorization: `Bearer ${user.token}`,
          
            },
          });
          console.log(response);
    
        } catch (error) {
          console.error("Error fetching wallet:", error);
        }
       };
  
    
  return (
    <div>
      <p className='text-center  text-lg font-bold text-red-200 '>Wallet component</p>
      <button onClick={fetchWallet}>Click me</button>

      {/* {wallet && (
        <div>
          <h2>Wallet Balance: {wallet.balance}</h2>
          <h3>Transaction History:</h3>
          <ul>
            {wallet.transactions.map((transaction, index) => (
              <li key={index}>
                Amount: {transaction.amount}, Type: {transaction.type}
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  )
}

export default WalletComponent
