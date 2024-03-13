import { useState, useEffect } from "react";

import { useNavigate,useParams } from "react-router-dom";
import apiInstance from "../../axiosApi/axiosInstance";
import { baseURL } from "../../../../backend/config/db";
import convertTo12HourFormat from "../../utils/convertTime";
import formatDate from "../../utils/convertDate";
import { toast } from "react-toastify";
import { token } from "../../../config";
import { useSelector } from "react-redux";

const DoctorDetails = () => {
  const [details, setDetails] = useState({}); 
  let { id } = useParams();
  const doctorId = id;
  
  const userInfo = useSelector(state => state.auth.userInfo);
  const userId = userInfo._id;

  const fetchDoctor = async () => {
    try {
      const res = await apiInstance.get(
        `${baseURL}/doctors/getdoctor/${doctorId}`
      );
    
      setDetails(res.data.data);
 
    } catch (error) {
      console.log(error);
      console.error("Error fetching doctor details:", error);
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, [])
  
  const bookHandler = async ()=>{
    
    
  try {
   
    const res = await apiInstance.post(`${baseURL}/users/checkout-session/${details._id}/${userId}`);

    window.location.href=res.data.session.url
   
  
    if (!res.ok) {
     
  
      throw new Error(res.data.message + " Please try again");
    }

  
   
  } catch (err) {
    toast.error(err.message || "An error occurred while booking appointment");
  }
};
  

  return (
    <section className="container flex-col h-5/6">
      <div className="flex flex-col lg:flex-row md:justify-start items-center">
        <div className="flex flex-col items-center md:flex-row">
          <div className="image md:shrink-0 bg-blue-500 h-60 w-56 rounded-lg">
            <img
              className="h-full w-full object-cover rounded-lg"
              src={details.imagePath}
              alt="profile"
            />
          </div>

          <div className="details text-center mx-5 md:text-left h-full">
            <div className="flex justify-center md:justify-start py-2">
              <h1 className="px-2 font-bold text-3xl">{details.name}</h1>
              <span className="h-fit inline-flex items-center rounded-md bg-blue-50 px-2 py-2 text-xs font-bold text-blue-700 ring-1 ring-inset ring-blue-700/10">
                {details.specialization}
              </span>
            </div>
            <h3 className="p-2 font-medium ">
              Consulting fee :{" "}
              <span className="text-blue-500 font-bold"> {details.fees}</span>
            </h3>

            <div className="flex h-fit my-3">
              <div className="mx-2 flex border-2 items-center px-2 h-fit border-blue-300 rounded">
                {/* <label htmlFor="from" className="w-1/3">
                  Date :
                </label>
                <input
                  type="date"
                  className="w-2/3 py-1 outline-none focus:outline-none"
                  name="time"
                  id="from"
                /> */}
              </div>
              {/* <button  onClick={bookHandler} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded">
                Book Appointment
              </button> */}
            </div>
          </div>
        </div>

        <div className="h-60 w-full lg:w-2/5">
          <h3 className="text-blue-500 font-bold my-2">Special Timings</h3>

          <div className="border-2 rounded-lg border-blue-300">
            <table className="min-w-full bg-blue-200 text-center text-sm font-light rounded-t-lg">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="w-16 py-4">
                    Sl No
                  </th>
                  <th scope="col" className="w-36 py-4">
                    Date
                  </th>
                  <th scope="col" className="w-36 py-4">
                    From
                  </th>
                  <th scope="col" className="w-36 py-4">
                    To
                  </th>
                  <th scope="col" className="w-36 py-4">
                    Booked slot
                  </th>
                </tr>
              </thead>
            </table>
            <div className="overflow-y-auto max-h-36 rounded-b-lg">
              <table className="min-w-full bg-blue-100 text-center text-sm font-light">
                <tbody className="text-center">
                  {details.available ? (
                    details.available.map((timing, index) => (
                      <tr
                        key={index}
                        className="border-b dark:border-neutral-500"
                      >
                        <td className="whitespace-nowrap w-16 py-4 font-medium">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap w-36 py-4">
                          {formatDate(timing.date)}
                        </td>
                        <td className="whitespace-nowrap w-36 py-4">
                          {convertTo12HourFormat(timing.fromTime)}
                        </td>
                        <td className="whitespace-nowrap w-36 py-4">
                          {convertTo12HourFormat(timing.toTime)}
                        </td>
                        <td className="whitespace-nowrap w-36 py-4">
                <button className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={() => bookHandler(timing.date)}>Book Now</button>
                         </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="border-b dark:border-neutral-500">
                      <td
                        colSpan={4}
                        className="whitespace-nowrap px-3 py-4 font-medium"
                      >
                        No Special Timings
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      
    </section>
  );
};

export default DoctorDetails;
