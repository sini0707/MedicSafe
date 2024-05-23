import { useState, useEffect,useRef } from "react";
import { baseURL } from "../../../../backend/config/db";
import apiInstance from "../../axiosApi/axiosInstance";
import { toast } from "react-toastify";
import { adminToken } from "../../../config";
import Pagination from "../../components/Pagination/Pagination.jsx";

const Specialization = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [specializationList, setSpecializationList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [postsPerPage] = useState(4);
  
   const addButtonRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description) {
      toast.error("Please enter specialization name and description");
      return;
    }
  

    try {
      const res = await apiInstance.post(
        `${baseURL}/admin/specialization`,
        {
          name,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );


      toast.success("Specialization created successfully");
      const newSpecialization = res.data;
      setSpecializationList((prevList) => [...prevList, newSpecialization]);
      setTotalPages(Math.ceil((specializationList.length + 1) / postsPerPage));
      setName("");
      setDescription("");
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
      toast.error("It is Duplicate");
    }

   
  };

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const res = await apiInstance.get(`${baseURL}/admin/getspecialization`, {
          
        });
  
        setSpecializationList(res.data);
        setTotalPages(Math.ceil(res.data.length / postsPerPage));
      } catch (err) {
        console.error("Error fetching specializations:", err);
      }
    };
    fetchSpecializations();
  }, [postsPerPage]);
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastSpecialization = currentPage * postsPerPage;
  const indexOfFirstSpecialization = indexOfLastSpecialization - postsPerPage;

  const currentSpecializations = specializationList.slice(indexOfFirstSpecialization, indexOfLastSpecialization);
  
  console.log("Current Specializations on Current Page:", currentSpecializations);
  
  
  return (
    <div className="flex flex-wrap justify-between">
    {/* Add New Department Section */}
    <div className="w-full md:w-1/2">
        <div className="heading text-center font-bold text-2xl m-5 text-yellow-800">
          Add New Department
        </div>
        <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
          <input
            className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
            spellCheck="false"
            placeholder="Specialization"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            className="description bg-gray-100 sec p-3 h-30  border border-gray-300 outline-none"
            spellCheck="false"
            placeholder="Describe about this department here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            defaultValue={""}
          />
          {/* buttons */}
          <div className="buttons flex justify-center mt-4">
            <button
              ref={addButtonRef}
              onClick={handleSubmit}
              type="submit"
              className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Create
            </button>
          </div>
        </div>
      </div>
  
    {/* Department List Section */}
    <div className="w-full md:w-1/2">
        <div className="heading text-center font-bold text-2xl m-5 text-yellow-800">
          Department List
        </div>
        <div className="container">
          <div className="relative my-5 overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-orange-400 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Department name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentSpecializations.map((specialization, index) => (
                  <tr
                    key={index}
                    className="bg-white lg:hover:bg-gray-300 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
                  >
                   <td className="w-full lg:w-auto p-3 text-blue-800 text-center border border-b block lg:table-cell relative lg:static font-bold">

                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                        {specialization.name}
                      </span>
                      {specialization.name}
                    </td>
                    <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static italic">

                      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                        {specialization.description}
                      </span>
                      {specialization.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination
          totalPosts={specializationList.length}
          postPerPage={postsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
    </div>
  </div>
  


  );
};

export default Specialization;
