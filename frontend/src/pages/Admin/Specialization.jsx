import { useState,useEffect } from "react";
import { baseURL } from "../../../../backend/config/db";
 import apiInstance from "../../axiosApi/axiosInstance";
 import { toast } from "react-toastify";
 import { useNavigate } from "react-router-dom";
const Specialization = () => {
    const [name,setName]=useState("");
    const [description,setDescription]= useState("");
    const [specializationList, setSpecializationList] = useState([])
       

    const handleInputClick = () => {
        
    };
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        try {
            const res = await apiInstance.post(`${baseURL}/admin/specialization`, {
                name,
                description,
              });
              console.log(res)
            toast.success(res.message);
            navigate("/admin/specializations");
          } catch (err) {
            toast.error(err?.data?.message || err?.error);
          }
    
       
        setName("");
        setDescription("");
    }

    useEffect(() => {
      
        const fetchSpecializations = async () => {
          try {
            const res = await apiInstance.get(`${baseURL}/admin/getspecialization`);
            console.log(res,"qqqqqqqqqqqq")
            setSpecializationList(res.data)
          
          } catch (err) {
            console.error("Error fetching specializations:", err);
          }
        };
        fetchSpecializations();
      }, []);
    
    
  return (
    <div>
      <>
  <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
    Add New Department
  </div>
  <style
    dangerouslySetInnerHTML={{
      __html: "\n  body {background:white !important;}\n"
    }}
  />
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
      placeholder="Describe  about this department here"
      value={description}
            onChange={(e) => setDescription(e.target.value)}
      defaultValue={""}
    />
    {/* icons */}
    <div className="icons flex text-gray-500 m-2">
      <svg
        className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
      <svg
        className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <svg
        className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
        />
      </svg>
  
    </div>
    {/* buttons */}
    <div className="buttons flex">
      <div className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">
        Cancel
      </div>
      <button onClick={handleSubmit}
              type="submit"
              className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
            >
              Create
            </button>
    </div>
  </div>
</>

<div className="heading text-center font-bold text-2xl m-5 text-gray-800">
     Department List
  </div>
    <div>
      <table className="border-collapse w-full" style={{ marginTop: '20px' }}>
  <thead>
    <tr>
      <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
        Department name
      </th>
      <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
        Description
      </th>
      {/* <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
        Status
      </th> */}
      <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
        Actions
      </th>
    </tr>
  </thead>
  <tbody>
  {specializationList.map((specialization, index) => (
    <tr key={index}className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
      <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
        <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
          {specialization.name}
        </span>
        {specialization.name}
      </td>
      <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
        <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
        {specialization.description}
        </span>
        {specialization.description}
      </td>
     
      <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
        <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
          Actions
        </span>
        <a href="#" className="text-blue-400 hover:text-blue-600 underline">
          List
        </a>
        <a
          href="#"
          className="text-blue-400 hover:text-blue-600 underline pl-6"
        >
          unList
        </a>
      </td>
    </tr>
  ))}
   
  
  </tbody>
</table>

    </div>
  



    </div>




    
  )
}

export default Specialization
