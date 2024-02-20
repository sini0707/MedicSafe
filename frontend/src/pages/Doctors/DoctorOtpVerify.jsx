// import { useState } from 'react';
// import { useRef } from 'react';

// import { useLocation, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import {toast} from 'react-toastify';
// import { baseURL } from '../../../../backend/config/db';


// const DoctorOtpVerify = () => {
//     const [otp, setOtp] = useState([])
//     console.log(otp,'otp')
//     const inputRef1=useRef()
//     const inputRef2=useRef()
//     const inputRef3=useRef()
//     const inputRef4=useRef()
  
  

//      const navigate = useNavigate();
//      const dispatch = useDispatch();

//      const handleInput=(e,nextInputRef,index)=>{
//       console.log(nextInputRef,'nexr');
//       console.log(index,'index');     const currentInput=e.target;
//       const inputValue=currentInput.value;
//       console.log(inputValue,"input valuee")
//       const updatedOtp = [...otp];
//       updatedOtp[index] = inputValue;
//       setOtp(updatedOtp.join('')); // Join all digits into a single string
//       if (inputValue.length === 1 && nextInputRef.current) {
//         nextInputRef.current.focus(); // Move focus to the next input field
//       }
//      }
    
//      const location = useLocation();
//     const email = location.state.email;
   


//   return (
//     <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
//   <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
//     <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
//       <div className="flex flex-col items-center justify-center text-center space-y-2">
//         <div className="font-semibold text-3xl">
//           <p>OTP verify</p>
//         </div>
//         <div className="flex flex-row text-sm font-medium text-gray-400">
//           <p>We have sent a code to your email ba**@dipainhouse.com</p>
//         </div>
//       </div>
//       <div>
//         <form onSubmit={submitHandler} method="post">
//           <div className="flex flex-col space-y-16">
//             <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
//               <div className="w-16 h-16 ">
//                 <input 
//                 ref={inputRef1}
//                   className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
//                   type="text" onChange={(e)=>handleInput(e,inputRef1,0)}
//                   name="otp"
//                   id=""
//                 />
//               </div>
//               <div className="w-16 h-16 ">
//                 <input
//                  ref={inputRef2}
//                   className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
//                   type="text"
                 
//                   onChange={(e)=>handleInput(e,inputRef2,1)}
//                   name=""
//                   id=""
//                 />
//               </div>
//               <div className="w-16 h-16 ">
//                 <input
//                  ref={inputRef3}
//                   className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
//                   type="text"
//                    onChange={(e)=>handleInput(e,inputRef3,2)}
//                   name=""
//                   id=""
//                 />
//               </div>
//               <div className="w-16 h-16 ">
//                 <input
//                  ref={inputRef4}
//                   className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
//                   type="text"
//                    onChange={(e)=>handleInput(e,null,3)}
//                   name=""
//                   id=""
//                 />
//               </div>
//             </div>
//             <div className="flex flex-col space-y-5">
//               <div>
//                 <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
//                  Submit
//                 </button>
//               </div>
//               <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
//                 <p>Didn't recieve code?</p>{" "}
//                 <a
//                   className="flex flex-row items-center text-blue-600"
//                   href="http://"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   Resend
//                 </a>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   </div>
// </div>
   
//   )
// }

// export default DoctorOtpVerify



import { useState} from 'react';
import { useRef } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {toast} from 'react-toastify';
import { useVerifyMutation } from '../../slices/doctorSlices/doctorsApiSlice'
import {setDoctorCredentials} from '../../slices/doctorSlices/doctorAuthSlice';
import { baseURL } from '../../../../backend/config/db';


const DoctorOtpVerify = () => {
 
    const [otp, setOtp] = useState([])
    // const [minutes,setMinutes]=useState(0)
    // const [seconds,setSeconds]=useState(5)
  
    const inputRef1=useRef()
    const inputRef2=useRef()
    const inputRef3=useRef()
    const inputRef4=useRef()
  
  

     const navigate = useNavigate();
     const dispatch = useDispatch();
    

     const handleInput=(e,nextInputRef,index)=>{
      
     const currentInput=e.target;
      const inputValue=currentInput.value;
     
      const updatedOtp = [...otp];
      updatedOtp[index] = inputValue;
      setOtp(updatedOtp.join('')); // Join all digits into a single string
      if (inputValue.length === 1 && nextInputRef.current) {
        nextInputRef.current.focus(); // Move focus to the next input field
      }
     }
    
     const location = useLocation();
     console.log(location.state,"state");
    // const email = location.state.email;
    const email = location.state ? location.state.email : '';
   

    

     const [verify] = useVerifyMutation()
    //  const [resendOTP] = useResendOTPMutation();

     const handleResendOTP = async (e) => {
      e.preventDefault()

      //  console.log('Resending OTP...',email); 
      
      // try {
      //   const res = await resendOTP({ email }); 
      //   if (res.error) {
      //     toast.error(res.error);
      //     return;
      //   }
      //   toast.success('OTP resent successfully');
      //   setOtp('');
        // setMinutes(0);
        // setSeconds(10);
    //   } catch (err) {
    //     console.log(err, 'errr');
    //   }
     };
    
    
    
      
    // useEffect(()=>{
    //   const interval=setInterval(()=>{
    //     if(seconds>0){
    //       setSeconds(seconds-1);
    //     }
    //     if(seconds===0){
    //       if(minutes===0){
    //         clearInterval(interval);
    //       }else{
    //         setSeconds(59);
    //         setMinutes(minutes-1);
    //       }
    //     }
    //   },1000);
    //   return()=>{
    //     clearInterval(interval);
    //   };
    // },[seconds]);

     
    const submitHandler = async(e)=>{
     e.preventDefault();
      try{
       console.log(email,otp,'email');
        const res = await verify({ email, otp }); 
        if(res.error){
          toast.error(res.error)
          return
        }
        dispatch(setDoctorCredentials({...res}));
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
        <div className="container">
          <p>Verify OTP</p>
        </div>
        <div className="card">
          <p></p>
        </div>
      </div>
      <div>
        <form >
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
              </div >
              
            </div>
            <div>
                <button onClick={submitHandler}  className="submit-btn">
                 Submit
                </button>
              </div>


            {/* <div className="countdown-text">
             
              <p>
                Time remaining:{" "}
                <span style={{fontWeight:600}}>
                  {minutes<10 ? `0${minutes}` : minutes}:
                  {seconds<10 ? `0${seconds}` : seconds}

                </span>
              </p>
              <button 
              disabled={seconds>0 || minutes >0}
              style={{color:seconds >0 || minutes >0 ? "#DFE3E8" : "#FF5630",
              }}
               onClick={(e)=>handleResendOTP(e)}
              >
               Resend OTp
              </button>
              
             
              

            </div> */}
          </div>

        </form>
      </div>
    </div>
  </div>
</div>

  )
}

export default DoctorOtpVerify

