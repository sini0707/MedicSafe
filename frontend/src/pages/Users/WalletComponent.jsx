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
    <div>
      <div
        className="font-regular relative block w-full max-w-screen-md rounded-lg bg-green-500 px-4 py-4 text-base text-white"
        data-dismissible="alert"
      >
        <p className="text-center text-lg font-bold text-black ">
          Wallet component
        </p>

        {wallet && (
          <div>
            <h2 className="text-lg font-bold">
              Wallet Balance: <span style={{ color: "black" }}></span>$
              {wallet.balance}
            </h2>
            <hr style={{ fontWeight: "bold" }} />
            <h3>Transaction History:</h3>
            <ul>
              {wallet.transactions.map((transaction, index) => (
                <li key={index}>
                  Amount: {transaction.amount} <br />
                  Type: {transaction.type}
                  <hr style={{ fontWeight: "bold" }} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletComponent;
