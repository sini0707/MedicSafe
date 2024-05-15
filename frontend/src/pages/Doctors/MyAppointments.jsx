import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { baseURL } from "../../../../backend/config/db";
import { FcVideoCall } from "react-icons/fc";
import Swal from "sweetalert2";
import moment from "moment";
import Modal from "../../components/Modal/Modal";

import apiInstance from "../../axiosApi/axiosInstance";

import { useSelector } from "react-redux";
import { doctoken } from "../../../config";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import { ConsoleLevel } from "@zegocloud/zego-uikit-prebuilt";
import { FaCropSimple } from "react-icons/fa6";

const MyAppointments = () => {
  const navigate = useNavigate();

  const [bookingDetails, setBookingDetails] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(6);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [prescriptionText, setPrescriptionText] = useState("");
  const [prescriptionSubmitted, setPrescriptionSubmitted] = useState(false);
  const [prescriptionError, setPrescriptionError] = useState(null);

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
        const sortedAppointments = response.data.sort(
          (a, b) =>
            moment(b.date, "DD/MM/YYYY").valueOf() -
            moment(a.date, "DD/MM/YYYY").valueOf()
        );

        setBookingDetails(sortedAppointments);

        setBookingDetails(response.data);

        setTotalAppointments(response.total);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };

    fetchBookingDetails();
  }, [id, doctorInfo, docId, currentPage, appointmentsPerPage]);

  const filterAppointmentsByDate = (filterType) => {
    let filteredAppointments = [...bookingDetails];

    if (filterType === "latest") {
      filteredAppointments.sort(
        (a, b) =>
          moment(b.date, "DD/MM/YYYY").valueOf() -
          moment(a.date, "DD/MM/YYYY").valueOf()
      );
    } else if (filterType === "oldest") {
      filteredAppointments.sort(
        (a, b) =>
          moment(a.date, "DD/MM/YYYY").valueOf() -
          moment(b.date, "DD/MM/YYYY").valueOf()
      );
    }

    setBookingDetails(filteredAppointments);
  };

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

  const handleFilterByDate = () => {
    const filteredAppointments = filterAppointmentsByDate();
    setBookingDetails(filteredAppointments);
  };

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = bookingDetails.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  const handleInputChange = (text) => {
    setPrescriptionText(text);
  };

  const handleSubmitPrescription = async () => {
    console.log("handleSubmitPrescription called");
    // try {
    //   console.log("Sending POST request to generate prescription...");
    //   const response = await apiInstance.post(
    //     `${baseURL}/generate-prescription`,
    //     {
    //       prescriptionText: prescriptionText,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${doctoken}`,
    //       },
    //     }
    //   );
    //   console.log("Received response from the server:", response);

    //   if (response.status === 200) {
    //     console.log("Prescription submitted successfully!");
    //     setPrescriptionSubmitted(true);
    //     setPrescriptionError(null);
    //   } else {
    //     console.error("Error submitting prescription:", response.data);
    //     setPrescriptionError(response.data.message);
    //     console.error("Error submitting prescription:", response.data);
    //   }
    // } catch (error) {
    //   console.error("Error submitting prescription:", error);
    //   setPrescriptionError("Internal server error. Please try again later.");
    // } finally {
    //   setShowModal(false);
    // }
  };
  const handleGeneratePrescription = () => {
    setShowModal(true);
  };

  return (
    <>
      {/* <div>
      <input className="text"  type="email" placeholder="typed here" onChange={(e)=>handleInputChange(e)}  />
    </div> */}

      {prescriptionSubmitted && (
        <div className="text-green-500 mb-4">
          Prescription submitted successfully!
        </div>
      )}

      {prescriptionError && (
        <div className="text-red-500 mb-4">{prescriptionError}</div>
      )}
      <div className="container mx-auto">
        <div className="relative my-5 overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-pink-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-blue-400">
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
                  <select
                    onChange={(e) => filterAppointmentsByDate(e.target.value)}
                    className="ml-3"
                  >
                    <option value="">filter</option>
                    <option value="oldest">Oldest</option>
                    <option value="latest">Latest</option>
                  </select>
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
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b border-b-2">{item.name}</td>
                  <td className="px-4 py-2 border-b border-b-2">
                    {item.blood}
                  </td>
                  <td className="px-4 py-2 border-b border-b-2">
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

                  <td className="px-4 py-2 border-b border-b-2">
                    {item.ticketPrice}
                  </td>
                  <td className="px-4 py-2 border-b border-b-2">{item.date}</td>
                  <td className="px-4 py-2 border-b border-b-2">{item.time}</td>

                  <td className="px-4 py-2 border-b border-b-2">
                    {moment().isAfter(
                      moment(`${item.date} ${item.time}`, "DD/MM/YYYY hh:mm")
                    ) ? (
                      <>
                        <div className="flex gap-4">
                          <button
                            className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded`}
                            onClick={() => handleVideoCall(item.user, true)}
                          >
                            <FcVideoCall className="mr-2" />
                            Start Video Call
                          </button>
                          <button
                            className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            onClick={() => handleGeneratePrescription(item._id)}
                          >
                            Generate Prescription
                          </button>
                        </div>
                      </>
                    ) : (
                      <div>
                        <button
                          className={`bg-transparent hover:bg-red-300 text-black-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded`}
                          disabled
                        >
                          <FcVideoCall className="mr-5" />
                          <span className="text-gray-500">
                            {" "}
                            Start Video Call
                          </span>
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
        </div>
      </div>

      <Pagination
        totalPosts={bookingDetails.length}
        postPerPage={appointmentsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <Modal
        addPre={setPrescriptionText}
        submit={handleSubmitPrescription}
        show={showModal}
        title="Generate Prescription"
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default MyAppointments;
