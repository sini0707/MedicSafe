

import DoctorList from "../../components/Doctors/DoctorList"

import { baseURL } from "../../../../backend/config/db";
import apiInstance from "../../axiosApi/axiosInstance";
import { useState,useEffect } from "react";
import SortAndFilter from "../../components/SortAndFilter";


  import Pagination from "../../components/Pagination/Pagination";


const Doctorss = () => {
  const [doctors ,setDoctors]=useState([]);
  const [search,setSearch] =useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] =useState(3); 
  const [filteredResult,setFilteredResult]=useState([]);
  const [filter,setFilter]= useState('')
  const [sortted,setSortted]= useState('')

  console.log(sortted,'sorttted')
  console.log(filter,'sorttted')

 
  useEffect(()=>{

    const fetchDoctors=async()=>{
      try {
        const res = await apiInstance.get(`${baseURL}/users/getdoctors`, {
          params: { page: currentPage, pageSize: doctorsPerPage, search: search }, 
        });
        const doctorsList=res.data.doctorsData;
  
    
        if(doctorsList){
          setDoctors(doctorsList)
        }
  
        
      } catch (error) {
        console.log(error)
      }
     }
  
    fetchDoctors()
    
  },[currentPage, doctorsPerPage, search])
  
  
  const handleSearch = (event) => {
    setSearch(event.target.value);
   
  };

   
   const totalDoctors = doctors.length;
   const totalPages = Math.ceil(totalDoctors / doctorsPerPage);
 
   const handlePageChange = (pageNumber) => {
     setCurrentPage(pageNumber);
   };
 
   let filterdDoctors = doctors.filter(
    (doctor) =>
      doctor.approved === true &&
      (doctor.name.toLowerCase().includes(search.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(search.toLowerCase()))
  );

  console.log(filterdDoctors,'doctores')
  if(sortted !=='' ){
    filterdDoctors = filterdDoctors.sort((a,b)=>a.fees-b.fees)
    }
    if(filter!==''){
      filterdDoctors = filterdDoctors.filter((item)=>item.specialization === filter)

    }

   const indexOfLastDoctor = currentPage * doctorsPerPage;
   const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
   const currentDoctors = filterdDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
   console.log(currentDoctors,"currentdoc");
   
  return (
    <>
    <section className="bg-[#fff9ea]">
        <div className="container text-center">
            <h2 className="heading">Find a Doctor</h2>
            <div className="max-w-[670px] mt-[20px] mx-auto bg-[#0066ff2c] rounded-md flex justify-between">
            <input 
             type="search" onChange={handleSearch}

             
    className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer"
    placeholder="Search Doctor"/>
     
    
    
            </div>
            

        </div>
        <SortAndFilter  setSortted={setSortted} setFilter={setFilter} />
        <div>
        
            <DoctorList doctors={currentDoctors} />
          
          
        </div>
        
        <Pagination
          totalPosts={totalDoctors} 
          postPerPage={doctorsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
        

    </section>
    </>
  )
}

export default Doctorss
