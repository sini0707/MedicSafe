import { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { baseURL } from "../../../../backend/config/db";
import {toast} from "react-toastify";
//  import {authContext} from "../../context/AuthContext.jsx";
 import { useDispatch,useSelector } from 'react-redux';
 
 import  HashLoader from "react-spinners/HashLoader.js";
 import { setadminCredentials } from '../../slices/adminSlices/adminAuthSlice.js';


const adminLogin = () => {
const navigate=useNavigate();
const user=useSelector((state)=>state.adminAuth.adminInfo);
const dispatch = useDispatch();

useEffect(()=>{
  if(user){
    navigate("/admin/home")
  }
},[user, navigate])
    const [formData,setFormData]=useState({
        email:'',
        password:''
    })
    
     const [loading,setLoading]=useState(false)
    
  
     const handleInputChange=e=>{
     setFormData({...formData,[e.target.name]:e.target.value})
    }
  
  const submitHandler = async (event) => {
      event.preventDefault();
      setLoading(true);
    
      try {
        console.log(formData.email, formData.password);
        const res = await fetch(`${baseURL}/admin/login`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(formData),
        });
    
        const result = await res.json();
        console.log(result); // Log the response details
    
        if (!res.ok) {
          throw new Error(result.message);
        }
    
        const { data } = result;
        if (data.success === false) {
          dispatch(setadminCredentials(data)); // Dispatch an action with data payload
          return;
        }
        dispatch(setadminCredentials(data)); // Dispatch an action with data payload
        navigate('/admin/home');
        toast.success(result.message);
      } catch (err) {
            console.log(err);
            toast.error(err.message);
             setLoading(false);
          }
    }
          
        
          
        
    // console.log(data,token,'resultttttttttttttttttttttttttt');
    //     if (!data) {
    //       throw new Error("Admin data not found in the server response.");
    //     }
    
        // dispatch({
        //   type: "LOGIN_SUCCESS",
        //   payload: {
        //     user: data,
        //     token: token || null, // Ensure that token is not undefined
        //     role: data.role || null,   // Ensure that role is not undefined
        //   },
        // });
    
        // console.log(result, "login data");
    
        //  setLoading(false);
        // toast.success(result.message);
    //     // navigate('/admin/home');
    //   } catch (err) {
    //     console.log(err);
    //     toast.error(err.message);
    //      setLoading(false);
    //   }
    // }
      return (
        <section className="px-5 lg:px-0">
          <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Hello! <span className="text-primaryColor">Welcome</span>Back ,Admin
    
            </h3>
            <form className="py-4 md:py-0" 
            onSubmit={(e)=>submitHandler(e)}
            >
              <div className="mb-5">
                <input type="email" placeholder="Enter your email" name="email"
                 value={formData.email}
                  onChange={(e)=>handleInputChange(e)}
                className="w-full py-3 border-b border-solid border-[#0066ff61] focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                placeholder:text-textColor  cursor-pointer required"/>
              </div>
              <div className="mb-5">
                
                <input type="password" name="password" placeholder="password" 
                value={formData.password} 
                onChange={(e)=>handleInputChange(e)}
                className="w-full py-3 border-b border-solid border-[#0066ff61] focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                placeholder:text-textColor  cursor-pointer required"/>
              </div>
              <div className="mt-7">
                <button type="submit"className="w-full bg-primaryColor  text-white text-[18px] leading-[30px] rounded-lg px-4 py-3">
                  {loading ? <HashLoader size={25} color="#fff"/>:"Login"}
                 
                </button>
    
              </div>
              
    
            </form>
    
          </div>
    
        </section>
      )
    }
    

 


export default adminLogin




  
  




  


