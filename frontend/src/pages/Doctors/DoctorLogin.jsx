import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { baseURL } from "../../../../backend/config/db";
import apiInstance from "../../axiosApi/axiosInstance";
import HashLoader from "react-spinners/HashLoader";
import { setDoctorCredentials } from "../../slices/doctorSlices/doctorAuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { FiMail, FiLock } from 'react-icons/fi';

const DoctorLogin = () => {
  const doctor = useSelector((state) => state.docAuth.doctorInfo);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (doctor) {
      navigate("/doctors/home");
    }
  });

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

      if (!res.data) {
        throw new Error(res.data.message);
      }
      dispatch(setDoctorCredentials(res.data));

      setLoading(false);
      toast.success(res.data.message);
      navigate("/doctors/home");
    } catch (err) {
      // toast.error(err.message, "VFdvd");
      toast.error("Please select Correct email and password!!!");
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
        <div className="mb-5 flex items-center">
          <FiMail className="text-primaryColor mr-2" />
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={(e) => handleInputChange(e)}
              className="w-full py-3 border-b border-solid border-[#0066ff61] focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
            placeholder:text-textColor  cursor-pointer required"
            />
          </div>
          <div className="mb-5 flex items-center">
          <FiLock className="text-primaryColor mr-2" /> 
            <input
              type="password"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={(e) => handleInputChange(e)}
              className="w-full py-3 border-b border-solid border-[#0066ff61] focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
            placeholder:text-textColor  cursor-pointer required"
            />
          </div>

          <div className="mb-5"></div>
          <div className="mt-7 flex flex-col gap-4">
            <button
              type="submit"
              className="w-full bg-primaryColor  text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
            >
              {loading ? <HashLoader size={25} color="#fff" /> : "Login"}
            </button>
          </div>
          <p className="mt-5 text-textColor text-center">
            Dont have an account?
            <Link
              to="/doctors/signup"
              className="text-primaryColor font-medium ml-1"
            >
              Register
            </Link>
          
          </p>
        </form>
      </div>
    </section>
  );
};

export default DoctorLogin;
