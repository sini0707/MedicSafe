import { useState } from 'react';
import { useRef } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {toast} from 'react-toastify';
import { useVerifyMutation } from '../../../src/slices/usersApiSlice'
import { setCredentials } from '../../../src/slices/authSlice'
import { baseURL } from '../../../../backend/config/db';


const EmailVerify = () => {
 
    const [otp, setOtp] = useState([])
    console.log(otp,'otp')
    const inputRef1=useRef()
    const inputRef2=useRef()
    const inputRef3=useRef()
    const inputRef4=useRef()
  
  

     const navigate = useNavigate();
     const dispatch = useDispatch();

     const handleInput=(e,nextInputRef,index)=>{
      console.log(nextInputRef,'nexr');
      console.log(index,'index');     const currentInput=e.target;
      const inputValue=currentInput.value;
      console.log(inputValue,"input valuee")
      const updatedOtp = [...otp];
      updatedOtp[index] = inputValue;
      setOtp(updatedOtp.join('')); // Join all digits into a single string
      if (inputValue.length === 1 && nextInputRef.current) {
        nextInputRef.current.focus(); // Move focus to the next input field
      }
     }
    
     const location = useLocation();
    const email = location.state.email;
    console.log(email,"email idklkdk");

     const [verify] = useVerifyMutation()

     
    const submitHandler = async(e)=>{
      console.log('rreachedddd');
      e.preventDefault();
      try{
        console.log('yes,here');
        console.log(email,otp,'email');
        const res = await verify({ email, otp }); // Pass email and otp to verify mutation
// const res=await fetch(`${baseURL}/users/otpverify`,{
//   method:"POST"
// })
        if(res.error){
          toast.error(res.error)
          return
        }
        dispatch(setCredentials({...res}));
        const queryParams = new URLSearchParams(location.search);
        const isForgotPassword = queryParams.get("forgot-password") === "true";

        if (isForgotPassword) {
            navigate('/resetPassword', { state: { email } });
        } else {
            navigate('/login');
        }
      }
       catch(err) {
        console.log(err,'errr');
      }
    }

  return (
<div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
  <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
    <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
      <div className="flex flex-col items-center justify-center text-center space-y-2">
        <div className="font-semibold text-3xl">
          <p>Email Verification</p>
        </div>
        <div className="flex flex-row text-sm font-medium text-gray-400">
          <p>We have sent a code to your email ba**@dipainhouse.com</p>
        </div>
      </div>
      <div>
        <form onSubmit={submitHandler} method="post">
          <div className="flex flex-col space-y-16">
            <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
              <div className="w-16 h-16 ">
                <input 
                ref={inputRef1}
                  className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                  type="text" onChange={(e)=>handleInput(e,inputRef1,0)}
                  name="otp"
                  id=""
                />
              </div>
              <div className="w-16 h-16 ">
                <input
                 ref={inputRef2}
                  className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                  type="text"
                 
                  onChange={(e)=>handleInput(e,inputRef2,1)}
                  name=""
                  id=""
                />
              </div>
              <div className="w-16 h-16 ">
                <input
                 ref={inputRef3}
                  className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                  type="text"
                   onChange={(e)=>handleInput(e,inputRef3,2)}
                  name=""
                  id=""
                />
              </div>
              <div className="w-16 h-16 ">
                <input
                 ref={inputRef4}
                  className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                  type="text"
                   onChange={(e)=>handleInput(e,null,3)}
                  name=""
                  id=""
                />
              </div>
            </div>
            <div className="flex flex-col space-y-5">
              <div>
                <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                 Submit
                </button>
              </div>
              <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                <p>Didn't recieve code?</p>{" "}
                <a
                  className="flex flex-row items-center text-blue-600"
                  href="http://"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resend
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

  )
}

export default EmailVerify
