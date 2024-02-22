import { useState } from "react";
 import { Link, useNavigate } from 'react-router-dom';
 import { toast } from "react-toastify";
 import { baseURL } from "../../../../backend/config/db";
 import apiInstance from "../../axiosApi/axiosInstance";
 import HashLoader from "react-spinners/HashLoader";
import { setDoctorCredentials } from "../../slices/doctorSlices/doctorAuthSlice";
import { useDispatch } from "react-redux";




const DoctorLogin = () => {
  const [formData, setFormData] = useState({
         email: '',
        password: ''
       });
       const [loading, setLoading] = useState(false);
          const navigate = useNavigate();
          const dispatch = useDispatch();
     

          const handleInputChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
          
          };
          
            
          const submitHandler = async (event) => {
            event.preventDefault();
            setLoading(true);
            
            try {
            
              const res = await apiInstance.post(`${baseURL}/doctors/login`, formData);
              console.log(res)
              // const result = await res.json();
              // console.log(result,"resultt")
              if (!res.data) {
                throw new Error(res.data.message);
              }
             dispatch(setDoctorCredentials(res.data))
              
              setLoading(false);
              toast.success(res.data.message);
              navigate('/doctors/home');
              console.log(formData);
            } catch (err) {
              console.log(err.response.data.message,"er");
              toast.error(err.message,"VFdvd");
              setLoading(false);
            }
          };
      
// if(data.sucess===false){
//   dispatch(setDoctorCredentials(data));
//   return;
// }
// dispatch(setDoctorCredentials(data));
// navigate('/doctors/home');
// toast.success(data.message);
//     }catch(error){
//       dispatch(setDoctorCredentials(error));
//     }
//   };
    
  return (

<section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Hello! <span className="text-primaryColor">Welcome</span>Back

        </h3>
        <form className="py-4 md:py-0" onSubmit={submitHandler}>
          <div className="mb-5">
            <input type="email" placeholder="Enter your email" name="email" value={formData.email} onChange={(e)=>handleInputChange(e)}
            className="w-full py-3 border-b border-solid border-[#0066ff61] focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
            placeholder:text-textColor  cursor-pointer required"/>
          </div>
          <div className="mb-5">
            
            <input type="password" name="password" placeholder="password" value={formData.password} onChange={(e)=>handleInputChange(e)}
            className="w-full py-3 border-b border-solid border-[#0066ff61] focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
            placeholder:text-textColor  cursor-pointer required"/>
          </div>

          <div className="mb-5">
           
          </div>
          <div className="mt-7">
            <button type="submit"className="w-full bg-primaryColor  text-white text-[18px] leading-[30px] rounded-lg px-4 py-3">
              {loading ? <HashLoader size={25} color="#fff"/>:"Login"}
              
            </button>

          </div>
          <p className="mt-5 text-textColor text-center">
  Dont have an account? 
  <Link to='/doctors/signup' className="text-primaryColor font-medium ml-1">Register</Link>
  {/* <span className="ml-3">|</span>
  <Link to='/forgot' className="text-primaryColor ml-3">Forgot Password</Link> */}
</p>

        </form>

      </div>

    </section>
  )
 
 
  
}

export default DoctorLogin
