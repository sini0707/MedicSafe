import  { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { baseURL } from '../../../../backend/config/db';


const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  console.log(doctors, "userState");

  const fetchDoctorsData = async () => {
    try {
      console.log("Fetching doctor data...");
      const res = await fetch(`${baseURL}/admin/doctordata`, {
        method: "GET",
      });
      console.log("Response received:", res);
      const result = await res.json();
      console.log("Parsed result:", result);
      setDoctors(result.doctorsData);
    } catch (error) {
      console.error("Error fetching doctor data:", error);
      toast.error("Failed to fetch doctor data");
    }
  };

  const handleApprove = async (docId) => {
    try {
      console.log("Approving doctor with ID:", docId);
      const res = await fetch(`${baseURL}/admin/approve/${docId}`, {
        method: "PUT",
      });
      if (res.ok) {
        fetchDoctorsData();
        toast.success("Updated Successfully");
      } else {
        toast.error("Failed to Approve");
      }
    } catch (error) {
      console.error("Error approving doctor:", error);
      toast.error("Failed to approve doctor");
    }
  };
  useEffect(() => {
    fetchDoctorsData();
  }, []);


  const handleReject = async (docId) => {
    try {
      const res = await fetch(`${baseURL}/admin/reject/${docId}`, {
        method: "PUT",
      });
      if (res.ok) {
        fetchDoctorsData(); // Refresh doctor data after rejection
        toast.success("Doctor Rejected Successfully");
      } else {
        toast.error("Failed to Reject Doctor");
      }
    } catch (error) {
      console.error("Error rejecting doctor:", error);
      toast.error("Failed to reject doctor");
    }
  };
  // const handleBlock = async (docId) => {
  //   try {
  //     const res = await fetch(`${baseURL}/block-doctor/${docId}`, {
  //       method: "PUT",
  //     });
  //     if (res.ok) {
  //       toast.success("Updated Successfully");
  //     } else {
  //       toast.error("Failed to Update");
  //     }
  //   } catch (error) {
  //     console.error("Error updating doctor:", error);
  //     toast.error("Failed to update doctor");
  //   }
  // };
  // console.log(handleBlock);
  

  return (
    <section className="container">
      <div className="relative mx-5 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="md:w-1/3 my-2 mx-4 p-5 text-center rounded-lg border-4 border-blue-500 bg-blue-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sl.No
              </th>
              <th scope="col" className="px-6 py-3">
                          Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Address
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Specialization
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Qualification
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Experience
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Options
                      </th>
            </tr>
          </thead>
          <tbody className="border-2">
            {doctors && doctors.length > 0 ? (
              doctors.map((doctor, index) => (
                <tr
                  className="bg-white border-b hover:bg-gray-100"
                  key={doctor._id}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">
                        {doctor.name}
                      </td>
                      <td className="px-6 py-4">
                        {doctor.email}
                      </td>
                      <td className="px-6 py-4">
                        {doctor.address}
                      </td>
                      <td className="px-6 py-4">
                        {doctor.specialization}
                      </td>
                      <td className="px-6 py-4">
                        {doctor.qualification}
                      </td>
                      <td className="px-6 py-4">
                        {doctor.experience}
                      </td>
                      
                      {
                        (!doctor.approved)?(
                          <td className="px-6 text-center py-4">
                            <button onClick={()=>{handleApprove(doctor._id)}} className="bg-green-100 hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
                              approve
                            </button>
                          </td>
                        ):(
                          <td className="px-6 text-center py-4">
                          <button onClick={() => { handleReject(doctor._id) }} className="bg-red-100 hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                         Reject
                       </button>
                         </td>)
                        
                        
                      }
                </tr>
              ))
            ) : (
              <tr className="bg-white border-b hover:bg-gray-200">
                <td
                  colSpan={8}
                  className="px-6 py-4 font-medium text-gray-900 text-center"
                >
                  No Doctors Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminDoctors;
