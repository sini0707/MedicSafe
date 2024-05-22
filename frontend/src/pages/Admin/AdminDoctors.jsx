import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { baseURL } from "../../../../backend/config/db";
import Pagination from "../../components/Pagination/Pagination.jsx";
import { adminToken } from "../../../config.js";

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);

  const fetchDoctorsData = async () => {
    try {
      const res = await fetch(`${baseURL}/admin/doctordata`, {
        method: "GET",
        headers:{
          Authorization:`Bearer ${adminToken}`
        }
      });

      const result = await res.json();

      setDoctors(result.doctorsData);
    } catch (error) {
      console.error("Error fetching doctor data:", error);
      toast.error("Failed to fetch doctor data");
    }
  };

  const handleApprove = async (docId) => {
    try {
      const res = await fetch(`${baseURL}/admin/approve/${docId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
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
  }, [currentPage]);

  const handleReject = async (docId) => {
    try {
      const res = await fetch(`${baseURL}/admin/reject/${docId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      if (res.ok) {
        fetchDoctorsData();
        toast.success("Doctor Rejected Successfully");
      } else {
        toast.error("Failed to Reject Doctor");
      }
    } catch (error) {
      console.error("Error rejecting doctor:", error);
      toast.error("Failed to reject doctor");
    }
  };

  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = doctors.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <section className="container mx-auto">
  <div className="overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full bg-white  divide-gray-200">
      <thead className="bg-pink-300">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
            Sl.No
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
            Name
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
            Email
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
            Address
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
            Specialization
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
            Qualification
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
            Experience
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
            Options
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {currentPosts && currentPosts.length > 0 ? (
          currentPosts.map((doctor, index) => (
            <tr className="hover:bg-gray-100" key={doctor._id}>
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{doctor.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{doctor.email}</td>
            
              <textarea
                className="px-6 py-4 whitespace-nowrap resize-none overflow-hidden"
                value={doctor.address}   />

              <td className="px-6 py-4 whitespace-nowrap">{doctor.specialization}</td>
              <td className="px-6 py-4 whitespace-nowrap">{doctor.qualification}</td>
              <td className="px-6 py-4 whitespace-nowrap">{doctor.experience}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {!doctor.approved ? (
                  <button
                    onClick={() => handleApprove(doctor._id)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Approve
                  </button>
                ) : (
                  <button
                    onClick={() => handleReject(doctor._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Reject
                  </button>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr className="bg-white">
            <td colSpan={8} className="px-6 py-4 text-sm text-gray-500 text-center">
              No Doctors Found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
  <Pagination
    totalPosts={doctors.length}
    postPerPage={postsPerPage}
    currentPage={currentPage}
    setCurrentPage={setCurrentPage}
    nextPage={nextPage}
    prevPage={prevPage}
  />
</section>

  );
};

export default AdminDoctors;
