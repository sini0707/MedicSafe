import useFetchData from "../../hooks/useFetchData";
import { baseURL } from "../../../../backend/config/db";

import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import DoctorCard from "../../components/Doctors/DoctorCard";
import Appointments from "./Appointments";
import { useState } from "react";

import Pagination from "../../components/Pagination/Pagination";




const MyBookings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 4;
  
  
  const {
    data: appointments,
    loading,
    error,
  } = useFetchData(`${baseURL}/users/appointments/myappointments?page=${currentPage}&pageSize=${appointmentsPerPage}`);
  
 
  const totalAppointments = appointments.length;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
 
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
        
         
          {appointments.map((doctor) => (
            
         
        <Appointments appointment={doctor} key={doctor._id}  />
        
         ))}
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
