
import { useParams } from 'react-router-dom';
 import { useState,useEffect } from "react";
 import { baseURL } from "../../../../backend/config/db";

import apiInstance from "../../axiosApi/axiosInstance";
import doctorAuthSlice from '../../slices/doctorSlices/doctorAuthSlice';
import { useSelector } from 'react-redux';


const MyAppointments = () => {


  const [bookingDetails, setBookingDetails] = useState([]);
 
  const { id } = useParams();
  const doctorInfo=useSelector((state)=>state.docAuth.doctorInfo)
 
  let docId=doctorInfo._id
 
  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
       
        const response = await  apiInstance.get(`${baseURL}/doctors/booking-details/${docId}`);
        
      
             
            setBookingDetails(response.data);
      
       
      } catch (error) {
        console.error('Error fetching booking details:', error);
      }
    };

    fetchBookingDetails(); 
  }, [id, doctorInfo,docId]);

  

  




  return (
    <table className="w-full border-collapse text-left text-sm text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            Blood
          </th>

          <th scope="col" className="px-6 py-3">
            Payment
          </th>
          <th scope="col" className="px-6 py-3">
            Price
          </th>
          <th scope="col" className="px-6 py-3">
            Booked on Date
          </th>
          <th scope="col" className="px-6 py-3">
            Booked on Time
          </th>
        </tr>
      </thead>
      <tbody>
  {bookingDetails.map((item) => (
    <tr key={item._id}>
      
     
      <td className="px-6 py-4">{item.name}</td>
      <td className="px-6 py-4">{item.blood}</td>
      <td className="px-6 py-4">
        {item.isPaid ? (
          <div className="flex items-center">
            <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
            Paid
          </div>
        ) : (
          <div className="flex items-center">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
            UnPaid
          </div>
        )}
      </td>
    
      <td className="px-6 py-4">{item.ticketPrice}</td>
      <td className="px-6 py-4">{item.date}</td>
      <td className="px-6 py-4">{item.time}</td>
      {/* <td className="px-6 py-4">{formatDate(item.createdAt)}</td> */}
    </tr>
  ))}
</tbody>

    </table>
  );

};

export default MyAppointments;
