import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { baseURL } from "../../../../backend/config/db";
import { FcVideoCall } from "react-icons/fc";
import Swal from "sweetalert2";
import moment from "moment";

import apiInstance from "../../axiosApi/axiosInstance";
import doctorAuthSlice from "../../slices/doctorSlices/doctorAuthSlice";
import { useSelector } from "react-redux";
import { doctoken } from "../../../config";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";

const MyAppointments = () => {
  const navigate = useNavigate();

  const [bookingDetails, setBookingDetails] = useState([]);
  console.log(bookingDetails, "boookingdetails");
  //  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(3);
  const [totalAppointments, setTotalAppointments] = useState(0);

  const { id } = useParams();
  const doctorInfo = useSelector((state) => state.docAuth.doctorInfo);

  let docId = doctorInfo._id;

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await apiInstance.get(
          `${baseURL}/doctors/booking-details/${docId}`,
          {
            params: { page: currentPage, pageSize: appointmentsPerPage },
          }
        );

        setBookingDetails(response.data);

        setTotalAppointments(response.total);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };

    fetchBookingDetails();
  }, [id, doctorInfo, docId, currentPage, appointmentsPerPage]);


  const totalPageCount = Math.ceil(totalAppointments / appointmentsPerPage);


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleVideoCall = async (userId, status) => {
    const confirmResult = await Swal.fire({
      title: "Do you want to approve VideoCall?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes,do it!",
      cancelButtonText: "Cancel it",
    });

    if (confirmResult.isConfirmed) {
      try {
        const res = await fetch(
          `${baseURL}/doctors/approveVideoCall/${userId}?status=${status}`,
          {
            method: "post",
            headers: {
              Authorization: `Bearer ${doctoken}`,
            },
          }
        );

        let result = await res.json();
        console.log(result, "result");

        if (!res.ok) {
          throw new Error(result.message);
        }

        Swal.fire({
          title: "Done!",
          text: "Your changed the doctor status",
          icon: "success",
        });
        const roomId = result.roomId;

        navigate(`/doctors/room/${result.roomId}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = bookingDetails.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  console.log(currentAppointments, "current appointments");
  console.log(bookingDetails, "tot");
  // Parse slotDate and slotTime using Moment.js

  return (
    <>
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

            <th scope="col" className="px-6 py-3">
              Videocall
            </th>
          </tr>
        </thead>
        <tbody>
          {currentAppointments.map((item) => (
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

              {/* <td className="px-6 py-4">
              <button
                className="flex items-center text-blue-500 hover:text-blue-700"
                onClick={() => handleVideoCall(item.user,true)}
              >
                <FcVideoCall className="mr-5" />
                Start Video Call
              </button>

              
            
            </td> */}

              <td className="px-6 py-4">
                {console.log(item.date, "slot Date")}

                {moment().isAfter(
                  moment(`${item.date} ${item.time}`, "DD/MM/YYYY hh:mm")
                ) ? (
                  <button
                    className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded`}
                    onClick={() => handleVideoCall(item.user, true)}
                  >
                    <FcVideoCall className="mr-5" />
                    Start Video Call
                  </button>
                ) : (
                  <div>
                    <button
                      className={`bg-transparent hover:bg-red-300 text-black-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded`}
                      disabled
                    >
                      <FcVideoCall className="mr-5" />
                      <span className="text-gray-500"> Start Video Call</span>
                    </button>
                    <span className="ml-3 text-red-500">
                      {`Starts in: ${moment(
                        `${item.date} ${item.time}`,
                        "DD/MM/YYYY hh:mm"
                      ).fromNow()}`}
                    </span>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        totalPosts={bookingDetails.length}
        postPerPage={appointmentsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default MyAppointments;
