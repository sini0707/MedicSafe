
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { baseURL } from '../../../../backend/config/db';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { FcVideoCall } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
// import Pagination from '../../components/Pagination/Pagination';



const Appointments = ({appointment }) => {
  console.log(appointment);
  const navigate = useNavigate();
  const user=useSelector((state)=>state.auth.userInfo);

  // const [currentPage, setCurrentPage] = useState(1);
  // const [appointmentsPerPage] = useState(3);
  // const [filteredAppointments, setFilteredAppointments] = useState([]);

 
 
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
<FcVideoCall
                   onClick={() => MakeVideoCall(user._id)}
                  className="w-12 text-2xl h-12 ml-auto cursor-pointer "
                />
  </div>
</div>  

 </div>  
  )
}

export default Appointments
