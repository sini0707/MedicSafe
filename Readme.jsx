
import apiInstance from "../../axiosApi/axiosInstance";
import { baseURL } from "../../../../backend/config/db";
import { token } from "../../../config";
import { useEffect,useState } from "react";
import { useLocation } from 'react-router-dom';

const SuccessPayment = () => {
  
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handlePaymentSuccess = async (sessionId) => {
    
    try {
      const response = await apiInstance.post(
        `${baseURL}/users/saveBookingData?session_id=${sessionId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setError('Error completing the payment.');
      setLoading(false);
    }
  };

//   useEffect(() => {
   
//     const urlParams = new URLSearchParams(location.search);
//     const sessionId = urlParams.get('session_id');
//     if (sessionId) {
//       handlePaymentSuccess(sessionId);
//     } else {
//       setLoading(false);
//       setError('No session ID found.');
//     }
//   }, [location]);


  return (
    <div className="bg-gray-100 h-screen">
      <div className="bg-white p-6 md:mx-auto">
        <svg
          viewBox="0 0 24 24"
          className="text-green-600 w-16 h-16 mx-auto my-6"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0.12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            {loading ? 'Processing Payment...' : error ? 'Payment Failed' : 'Payment Done!'}
          </h3>
          {loading && <p className="text-gray-600 my-2">Please wait while we process your payment.</p>}
          {error && <p className="text-red-600 my-2">{error}</p>}
          {!loading && !error && (
            <>
              <p className="text-gray-600 my-2">
                Thank you for completing your secure online payment.
              </p>
              <p>Have a great day!</p>
              <div className="py-10 text-center">
                <a
                  href="/home"
                  className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  GO BACK
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessPayment;
