import { useState } from "react";
import { useNavigate } from "react-router-dom";
import signupImg from "../../assets/images/signup.gif";
import { Link } from "react-router-dom";
import uploadImageCloudinary from "../../../../backend/utils/uploadCloudinary";
import { toast } from "react-toastify";
import { baseURL } from "../../../../backend/config/db";
import { FiUser,FiMail, FiLock } from 'react-icons/fi';
import { FiDroplet,FiUpload} from 'react-icons/fi';

const Signup = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
    gender: "",
    role: "patient",
    confirmpass: "",
    blood: "",
  });
  const [bloodError, setBloodError] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];

    const data = await uploadImageCloudinary(file);

    setPreviewURL(data.url);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
    const password = formData.password;
    const confirmpass = formData.confirmpass;

    if (passwordRegex.test(password)) {
      if (password !== confirmpass) {
        toast.error("Passwords do not match!!");
      }else if (!formData.blood) {
        setBloodError("Please select a blood group.");
      } else {
        try {
          const res = await fetch(`${baseURL}/users/register`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          if (!res.ok) {
            const { message } = await res.json();
            throw new Error(message);
          }
          const { email } = formData;

          setLoading(false);

          navigate("/otpVerify", { state: { email } });
          toast.success("OTP is Verifiy here!!!");
        } catch (err) {
          console.log(err);
          toast.error(err.message);
          setLoading(false);
        }
      }
    } else {
      toast.error(
        "Password must contain 5 characters with at least one letter, one number, and one special character."
      );
    }
  };

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/*...........img box.........*/}
          <div className="hidden lg:block bg-primaryColor rounded-l-lg">
            <figure className="rounded-l-lg">
              <img src={signupImg} alt="" className="w-full rounded-l-lg" />
            </figure>
          </div>
          {/*..............sign up form.......*/}
          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              create an <span className="text-primaryColor">account</span>
            </h3>
            <form onSubmit={submitHandler}>
            <div className="mb-5 flex items-center"> 
              <FiUser className="text-primaryColor mr-2" /> 
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange(e)}
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
            placeholder:text-textColor  cursor-pointer required"
                />
              </div>
              <div className="mb-5 flex items-center"> {/* Email */}
    <FiMail className="text-primaryColor mr-2"/>
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange(e)}
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
            placeholder:text-textColor  cursor-pointer required"
                />
              </div>
              <div className="mb-5 flex items-center"> 
    <FiLock className="text-primaryColor mr-2" /> 
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange(e)}
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
            placeholder:text-textColor  cursor-pointer required"
                />
              </div>
              <div className="mb-5 flex items-center"> 
    <FiLock className="text-primaryColor mr-2" /> 
                <input
                  type="password"
                  placeholder="confirmpass"
                  name="confirmpass"
                  value={formData.confirmpass}
                  onChange={(e) => handleInputChange(e)}
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
            placeholder:text-textColor  cursor-pointer required"
                />
              </div>
              <div className="mb-5 flex items-center"> 
              <FiDroplet className="text-primaryColor mr-2"/>
              <select
                  name="blood"
                  value={formData.blood}
                  onChange={(e) => {
                    handleInputChange(e);
                    setBloodError("");
                  }}
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
            placeholder:text-textColor  cursor-pointer required"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
                {bloodError && (
                  <p className="text-red-500 text-sm">{bloodError}</p>
                )}
              </div>
              <div className="mb-5 flex items-center justify-between">
                <label
                  htmlFor=""
                  className="text-headingColor font-bold text-[16px] leading-7"
                >
                  Are you a :
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="patient">Patient</option>
                    {/* <option value="doctor">Doctor</option> */}
                  </select>
                </label>
                <label className="text-headingColor font-semibold text-[15px] leading-7">
                  Gender:
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>
              <div className="mb-5 flex items-center gap-3">
                {selectedFile && (
                  <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                    <img
                      src={previewURL}
                      alt=""
                      className="w-full rounded-full"
                    />
                  </figure>
                )}
                <div className="relative w-[130px] h-[50px]">
                  <input
                    type="file"
                    name="photo"
                    id="customFile"
                    onChange={handleFileInputChange}
                    accept=".jpg,.png"
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <label
                    htmlFor="customFile"
                    className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font semibold rounded-lg truncate cursor-pointer"
                  >
                    <span className="mr-2">
    <FiUpload /> 
  </span>
                    Upload Photo
                  </label>
                </div>
              </div>
              <div className="mt-7">
                <button
                  disabled={loading && true}
                  type="submit"
                  className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                >
                  {/* {loading ? (<HashLoader size={35} color="#ffffff"/>):('Sign up')} */}
                  Signup
                </button>
              </div>
              {/* <OAuth/> */}
              <p className="mt-5 text-textColor text-center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primaryColor font-medium ml-1"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
