import { useState,useContext } from "react"
import { Link, useNavigate } from 'react-router-dom';
import { baseURL } from "../../../../backend/config/db";
import {toast} from "react-toastify";
import {authContext} from "../../context/AuthContext.jsx";
import  HashLoader from "react-spinners/HashLoader.js";
import { setCredentials } from "../../slices/authSlice.js";



const Login = () => {

  const [formData,setFormData]=useState({
      email:'',
      password:''
  })
  const [loading,setLoading]=useState(false)
  const [role, setRole] = useState('patient');
  const navigate=useNavigate()
  const{dispatch}=useContext(authContext)


  const handleInputChange=e=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const handleRoleChange = e => {
    setRole(e.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    try {
      const res = await fetch(`${baseURL}/users/login`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
  console.log(res,'ressssss');
      const result = await res.json();
  console.log(result,'result');
      if (!res.ok) {
        throw new Error(result.message);
      }
  
      const { data ,token} = result;

      if (!res.ok) {
        throw new Error("User data not found in the server response.");
      }
  
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: data,
          token: token || null, // Ensure that token is not undefined
          role: data.role || null,   // Ensure that role is not undefined
        },
      });

      //  dispatch(setCredentials(data))
  
      console.log(result, "login data");
  
      setLoading(false);
      toast.success(result.message);
      if (role === 'patient') {
        navigate('/home');
      } else {
        navigate('/home');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
      setLoading(false);
    }
  };
  

  


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
            <label>
              <input type="radio" value="patient" checked={role === 'patient'} onChange={handleRoleChange} />
              Patient
            </label>
            <span style={{ marginRight: '20px' }}></span> 
            <label>
              <input type="radio" value="doctor" checked={role === 'doctor'} onChange={handleRoleChange} />
              Doctor
            </label>
          </div>
          <div className="mt-7">
            <button type="submit"className="w-full bg-primaryColor  text-white text-[18px] leading-[30px] rounded-lg px-4 py-3">
              {loading ? <HashLoader size={25} color="#fff"/>:"Login"}
              
            </button>

          </div>
          <p className="mt-5 text-textColor text-center">
  Dont have an account? 
  <Link to='/register' className="text-primaryColor font-medium ml-1">Register</Link>
  <span className="ml-3">|</span>
  <Link to='/forgot' className="text-primaryColor ml-3">Forgot Password</Link>
</p>

        </form>

      </div>

    </section>
  )
}

export default Login
