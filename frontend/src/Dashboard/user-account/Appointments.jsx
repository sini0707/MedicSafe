import { useState } from "react";
import { baseURL } from "../../../../backend/config/db";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import AppointmentDetails from "./AppointmentDetails";

const Appointments = ({ appointment }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userInfo);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const activeAppointments = appointment.filter((value) => !value.isCancelled);
  console.log(activeAppointments, "active appointments");

  const handleCancelButton = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${baseURL}/users/cancelBooking/${id}`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
          });
          if (res.ok) {
            Swal.fire({
              title: "Cancelled !",
              text: "Your appointment has been cancelled.",
              icon: "success",
            });
          }
        } catch (error) {
          console.log(error);
          Swal.fire({
            title: "Error!",
            text: "Failed to cancel appointment.",
            icon: "error",
          });
        }
      }
    });
  };

  if (user) {
    const userId = user._id;
  }

  
  const MakeVideoCall = async (userId) => {
    try {
      const res = await fetch(`${baseURL}/users/makeVideoCall/${userId}`, {
        method: "get",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const result = await res.json();
      if (!res.ok) {
        Swal.fire({
          icon: "error",
          title: "Something Went Wrong ",
          text: result.error,
        });
      } else {
        // createRoom();
        navigate(`/users/room/${result.roomId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  appointment.map((value) => {
   
  });

  // appointment.map((value) => {});

  const handleViewPrescription = async (appointmentId) => {
    try {
      const res = await fetch(
        `${baseURL}/users/prescription/${appointmentId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const prescription = await res.json();
      console.log(prescription, "doctor prescription");

      if (res.ok) {
       

        console.log("Prescription fetched:", prescription);
      
        Swal.fire({
          icon: "success",
          title: "See yourPrescription",
          text: prescription.prescription,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch prescription",
          text: prescription.error,
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Failed to fetch prescription",
        text: "An error occurred while fetching the prescription.",
      });
    }
  };

  const handleViewDetails = (appointmentId) => {
    const selected = appointment.find((app) => app._id === appointmentId);
    setSelectedAppointment(selected);
  };
  const handleBack = () => {
    setSelectedAppointment(null);
    setSelectedPrescription(null);
  };

  return (
    <div>
      {selectedAppointment ? (
        <AppointmentDetails
          appointment={selectedAppointment}
          onBack={handleBack}
        />
      ) : (
        activeAppointments.map((value, index) => (
          <div key={index} className="flex items-center justify-center mt-5">
            <div className="bg-white font-semibold text-center rounded-3xl border shadow-lg p-10 max-w-xs">
              <div>
                <img
                  src={value?.doctor?.imagePath}
                  className="w-full"
                  alt="#"
                />
              </div>
              <h1 className="text-lg text-gray-700">{value?.doctor?.name}</h1>
              <h1 className="text-sm text-gray-400">{value?.slotDate}</h1>
              <h1 className="text-sm text-gray-400">{value?.slotTime}</h1>
             

              {value.isCancelled ? (
                <button
                  style={{ marginRight: "10px" }}
                  className="bg-red-300 px-8 py-2 mt-3 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide cursor-not-allowed opacity-50"
                  disabled
                >
                  Cancelled
                </button>
              ) : (
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  onClick={() => handleCancelButton(value._id)}
                  disabled={isButtonDisabled}
                >
                  Cancel Appointment
                </button>
              )}
              <button
                type="button"
                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={() => handleViewDetails(value._id)}
              >
                Appointment Details
              </button>
              
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Appointments;
