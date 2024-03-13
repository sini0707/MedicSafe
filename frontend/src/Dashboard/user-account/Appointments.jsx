
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { baseURL } from '../../../../backend/config/db';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';


const Appointments = ({appointment }) => {
  console.log(appointment);

  const user=useSelector((state)=>state.auth.userInfo)
  console.log(user.token,"from redux");
 
  const handleCancelButton = async (id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log(id,"cancelidddd")
          const res =await fetch(`${baseURL}/users/cancelBooking/${id}`, {
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
              icon: "success"
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: "Failed to cancel appointment.",
              icon: "error"
            });
          }
        } catch (error) {
          console.error("Error cancelling appointment:", error);
          Swal.fire({
            title: "Error!",
            text: "An error occurred while cancelling the appointment.",
            icon: "error"
          });
        }
      }
    });
  }

  return (
    <div>
     
        <div className="flex items-center justify-center mt-5  ">
       <div className="bg-white font-semibold text-center rounded-3xl border shadow-lg p-10 max-w-xs">
       <div>
          <img src={appointment?.doctor?.imagePath} className="w-full" alt="#" />
        </div>
        <h1 className="text-lg text-gray-700">{appointment?.doctor?.name}</h1>
        <h3 className="text-sm text-gray-400">{appointment?.doctor?.specialization}</h3>
     
{/*    
        <button onClick={() => handleCancelButton(appointment._id)} className="bg-red-500 px-8 py-2 mt-6 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide">
  Cancel
</button> */}
<button onClick={!appointment.isCancelled ? () => handleCancelButton(appointment._id) : 'Cancelled'} className={`bg-red-500 px-8 py-2 mt-6 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide ${appointment.isCancelled ? 'cursor-not-allowed opacity-50' : ''}`}>Cancel</button>

  </div>
</div>  

 </div>  
  )
}

export default Appointments
