import { useState, useEffect } from "react";
import { baseURL } from "../../../../backend/config/db";
import { useSelector } from "react-redux";

const WalletComponent = () => {
  const user = useSelector((state) => state.auth.userInfo);
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const token = user.token;
        const response = await fetch(
          `${baseURL}/users/get-wallet?id=${user._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ id: user._id }),
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          setWallet(responseData.walletDetails);
        } else {
          console.error("Error:", response);
        }
      } catch (error) {
        console.error("Error fetching wallet:", error);
      }
    };

    fetchWallet();
  }, [user]);

  return (
    <div className="px-4 lg:px-0">
      <div className="flex justify-center">
        <div className="max-w-md w-full bg-cyan-500 rounded-lg p-6">
          <p className="text-center text-lg font-bold text-black mb-4">
            Wallet component
          </p>

          {wallet && (
            <div>
              <h2 className="text-lg font-bold">
                Wallet Balance:{" "}
                <span className="text-black">${wallet.balance}</span>
              </h2>
              <hr className="my-4" />
              <h3>Transaction History:</h3>
              <ul>
                {wallet.transactions.map((transaction, index) => (
                  <li key={index} className="my-2">
                    <p>Amount: {transaction.amount}</p>
                    <p>Type: {transaction.type}</p>
                    <hr className="my-2" />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletComponent;
