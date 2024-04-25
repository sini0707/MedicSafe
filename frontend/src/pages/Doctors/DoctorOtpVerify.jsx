import { useState } from "react";
import { useRef } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useVerifyMutation } from "../../slices/doctorSlices/doctorsApiSlice";

const DoctorOtpVerify = () => {
  const [otp, setOtp] = useState([]);

  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const inputRef4 = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInput = (e, nextInputRef, index) => {
    const currentInput = e.target;
    const inputValue = currentInput.value;

    const updatedOtp = [...otp];
    updatedOtp[index] = inputValue;
    setOtp(updatedOtp.join(""));
    if (inputValue.length === 1 && nextInputRef.current) {
      nextInputRef.current.focus();
    }
  };

  const location = useLocation();

  const email = location.state ? location.state.email : "";

  const [verify] = useVerifyMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await verify({ email, otp });

      if (res.data) {
        if (res.data.success) {
          toast.success("Doctor registered successfully");
          navigate("/doctors/login");
        } else {
          toast.error("Invalid OTP. Please try again.");
        }
      } else if (res.error.data.error) {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.log("Error:", error);

      toast.error("An error occurred. Please try again later.");
    }
  };

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
            <form>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  <div className="w-16 h-16 ">
                    <input
                      ref={inputRef1}
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      onChange={(e) => handleInput(e, inputRef1, 0)}
                      name="otp"
                      id=""
                    />
                  </div>
                  <div className="w-16 h-16 ">
                    <input
                      ref={inputRef2}
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      onChange={(e) => handleInput(e, inputRef2, 1)}
                      name=""
                      id=""
                    />
                  </div>
                  <div className="w-16 h-16 ">
                    <input
                      ref={inputRef3}
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      onChange={(e) => handleInput(e, inputRef3, 2)}
                      name=""
                      id=""
                    />
                  </div>
                  <div className="w-16 h-16 ">
                    <input
                      ref={inputRef4}
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      onChange={(e) => handleInput(e, null, 3)}
                      name=""
                      id=""
                    />
                  </div>
                </div>
                <div>
                  <button onClick={submitHandler} className="submit-btn">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorOtpVerify;
