

import DoctorList from "../../components/Doctors/DoctorList"
import { useSelector } from "react-redux"
import { baseURL } from "../../../../backend/config/db";
import apiInstance from "../../axiosApi/axiosInstance";
import { useState,useEffect } from "react";

const Doctorss = () => {
  const [doctors ,setDoctors]=useState([]);
  const [search,setSearch] =useState("");
  const [filteredResult,setFilteredResult]=useState([])
  console.log(filteredResult,"filteredDoctors")
  useEffect(()=>{
    fetchDoctors()
  },[])

   const fetchDoctors=async()=>{
    try {
      const res = await apiInstance.get(`${baseURL}/users/getdoctors`);
      const doctorsList=res.data.doctorsData
    console.log(doctorsList,'doctrlistttt');
      if(doctorsList){
        setDoctors(doctorsList)
      }
      
    } catch (error) {
      console.log(error)
    }
   }

   const filteredDoctors=(data)=>{
return data.filter(
(doctor)=>
doctor.approved===true && (doctor.name.toLowerCase().includes(search.toLowerCase()))
)
   }
   const handleSearch=(event)=>{
    setSearch(event.target.value);
    const filterdDoctors=filteredDoctors(doctors)
    setFilteredResult(filterdDoctors)

   }

  return (
    <>
    <sectopn className="bg-[#fff9ea]">
        <div className="container text-center">
            <h2 className="heading">Find a Doctor</h2>
            <div className="max-w-[670px] mt-[20px] mx-auto bg-[#0066ff2c] rounded-md flex justify-between">
            <input 
             type="search" onChange={handleSearch}
    className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer"
    placeholder="Search Doctor"/>
     <button className="btn mt- 0 rounded-[0px] rounded-r-md">
       Search</button>
            </div>

        </div>
        <div>
          <DoctorList doctors={doctors} />
        </div>

    </sectopn>
    </>
  )
}

export default Doctorss
