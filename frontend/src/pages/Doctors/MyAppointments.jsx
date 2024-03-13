// import formatDate from "../../../utils/formateDate";
import { useParams } from 'react-router-dom';
 import { useState,useEffect } from "react";
 import { baseURL } from "../../../../backend/config/db";

import apiInstance from "../../axiosApi/axiosInstance";
import doctorAuthSlice from '../../slices/doctorSlices/doctorAuthSlice';
import { useSelector } from 'react-redux';


const MyAppointments = () => {


  const [bookingDetails, setBookingDetails] = useState([]);
  console.log(bookingDetails,"hdgjysadbfkabsd")
  const { id } = useParams();
  const doctorInfo=useSelector((state)=>state.docAuth.doctorInfo)
 
  let docId=doctorInfo._id
 
  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
       
        const response = await  apiInstance.get(`${baseURL}/doctors/booking-details/${docId}`);
        console.log(response.data,"where is dataaaa")
      
             
            setBookingDetails(response.data);
      
       
      } catch (error) {
        console.error('Error fetching booking details:', error);
      }
    };

    fetchBookingDetails(); 
  }, [id, doctorInfo,docId]);

  // let result=bookingDetails.map((item) => (
  //   console.log(item)
  // ))

  // console.log(result,"resulttt");




  return (
    <table className="w-full text-left text-sm text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            Gender
          </th>

          <th scope="col" className="px-6 py-3">
            Payment
          </th>
          <th scope="col" className="px-6 py-3">
            Price
          </th>
          <th scope="col" className="px-6 py-3">
            Booked on
          </th>
        </tr>
      </thead>
      <tbody>
      {bookingDetails.map((item) => (
        
          <tr key={item._id}>
            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
              <img src={item.user.photo} className="w-10 h-10 rounded-full" alt="" />
              <div className="pl-3">
                <div className="text-base font-semibold">{item.user.name}</div>
                <div className="text-normal text-gray-500">{item.user.email}</div>
              </div>
            </th>
            <td className="px-6 py-4">{item.user.gender}</td>
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
            {/* <td className="px-6 py-4">{formatDate(item.createdAt)}</td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );

};

export default MyAppointments;
