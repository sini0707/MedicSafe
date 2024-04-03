import useFetchData from "../../hooks/useFetchData";
import { baseURL } from "../../../../backend/config/db";

import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import DoctorCard from "../../components/Doctors/DoctorCard";
import Appointments from "./Appointments";
import { useState,useEffect } from "react";

import Pagination from '../../components/Pagination/Pagination'




const MyBookings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const[ appointmentsPerPage] = useState(3)
  const [MyAppointments,setAppointments]=useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);



 
 
  const {
    data: appointments,
    loading,
    error,
  } = useFetchData(`${baseURL}/users/appointments/myappointments?page=${currentPage}&pageSize=${appointmentsPerPage}`);
  
 useEffect(()=>{
  setAppointments(appointments)

  
 },[appointments])

  const totalAppointments = appointments.length;

  let totalPagess = Math.ceil(totalAppointments /appointmentsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  

  const indexOfLastDoctor = currentPage * appointmentsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - appointmentsPerPage;
  const currentDoctors = MyAppointments.slice(indexOfFirstDoctor, indexOfLastDoctor)

  // const handleCancelAppointment = (appointmentId) => {
  //   // Call your backend API to cancel the appointment (implementation omitted)
  //   console.log("Appointment with ID", appointmentId, "canceled!");

  //   // Optimistic UI update: Remove appointment from displayed list immediately
  //   const filteredAppointments = myAppointments.filter((appointment) => appointment._id !== appointmentId);
  //   setAppointments(filteredAppointments);

  //   // Simulate delay for backend confirmation (replace with actual API call if needed)
  //   setTimeout(() => {
  //     // Update appointments state after delay (assuming successful cancellation)
  //     setAppointments(filteredAppointments);
  //   }, 2000); // Adjust delay (in milliseconds) as needed
  // };

 
  return (
    
    <div>
    {loading &&  !error && <Loading />}
    {error && !loading && <Error errMessage={error} />}
    {!loading && !error && (
       <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* {appointments.map((doctor) => (
          <DoctorCard doctor={doctor} key={doctor._id}/>
         ))} */}
        
         
         
            
         
        <Appointments appointment={currentDoctors}/>
        
         </div>
      {totalAppointments > appointmentsPerPage && (
        <Pagination
          totalPosts={totalAppointments}
          postPerPage={appointmentsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
</>
    )}
    
    {!loading && !error && appointments.length === 0 && (
      <h2 className="mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor">
        You have not booked any doctor yet!
      </h2>
    )}
   
    </div>
    
 
  
  );
};

export default MyBookings;
