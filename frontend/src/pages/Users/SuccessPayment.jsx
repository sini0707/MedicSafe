
import apiInstance from "../../axiosApi/axiosInstance";
import { baseURL } from "../../../../backend/config/db";
import { token } from "../../../config";
import { useEffect,useState } from "react";
import { data } from "autoprefixer";


const SuccessPayment = () => {
  const [loading, setLoading] = useState(true);
 
  const queryString = window.location.search;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  console.log(urlParams, "urlParams");
  const sessionId = urlParams.get("session_id");


  useEffect(()=>{
    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    console.log(urlParams, "urlParams");
    const sessionId = urlParams.get("session_id");

    console.log(sessionId, "sessionId");


    const sendPaymentData =async ()=>{

      try {
        const response = await apiInstance.post(
          `${baseURL}/users/session-status?session_id=${sessionId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

       
         console.log(response,"payment result")

        if (response.status!==200) {
          throw new Error(response.
            statusText);
        }

        const bookingData = await JSON.parse(
          localStorage.getItem("bookingData")
        );
        
        console.log(bookingData,"bookingData")

        const dataToSave = {
          doctor: bookingData.doctor,
          patient: bookingData.user,
          ticketPrice: bookingData.doctor.fees,
          paymentStatus: response.status,
          appointmentDate: bookingData.date,
          slot: bookingData.slot,
          paymentId:response.data.paymentId,
        };


        const bookingRes = await apiInstance.post(`${baseURL}/users/saveBookingData`,dataToSave);

        console.log(bookingRes,"booking res")
        
        
        setLoading(true);


        
      } catch (error) {
        console.error('Error :', error);
        
      }
    }
    sendPaymentData();

  },[])


  
  

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
            Payment Done!
          </h3>
          <p className="text-gray-600 my-2">
            Thank you for completing your secure online payment.
          </p>
          <p> Have a great day!</p>
          <div className="py-10 text-center">
            <a
              href="/home"
              className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
            >
              GO BACK
            </a>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default SuccessPayment;
