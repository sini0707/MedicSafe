import { useEffect, useState } from "react";

import uploadImageCloudinary from "../../../../backend/utils/uploadCloudinary";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { baseURL } from "../../../../backend/config/db";
import { setCredentials } from "../../slices/authSlice.js";
import { FiUser,FiMail,FiPhone,FiDroplet ,FiUpload} from 'react-icons/fi';

import { token } from "../../../config.js";

const Profile = (user) => {
  const userId = user.user._id;

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bloodError, setBloodError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",

    password: "",
    confirmpassword: "",
    mobile: "",
    age: "",
    blood: "",
    photo: "null",
    emerPerson: "",
    emerNumber: "",
    gender: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      name: user.user.name,
      email: user.user.email,
      photo: user.user.photo || "",
      gender: user.user.gender || "",
      age: user.user.age,
      role: user.role || "patient",
      confirmpass: "",
      blood: user.user.blood || "",
    });
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];

    const data = await uploadImageCloudinary(file);

    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

   
  
    try {
      const res = await fetch(`${baseURL}/users/updateUser/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || "Failed to update profile");
      }

      const { message, data } = responseData;

      dispatch(setCredentials(data));
      toast.success(message || "Profile successfully updated");
      // navigate('/profile');
      setLoading(false);

      toast.success(message || "Profile successfully updated");
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  

  return (
    <div className="mt-10">
      <form onSubmit={submitHandler}>
      <div className="mb-5 flex items-center"> 
              <FiUser className="text-primaryColor mr-2" /> 
        <input
  type="text"
  placeholder="Full Name"
  name="name"
  value={formData.name}
  onChange={handleInputChange}
  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
/>

        </div>
        <div className="mb-5 flex items-center">
    <FiMail className="text-primaryColor mr-2"/>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={(e) => handleInputChange(e)}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
            placeholder:text-textColor  cursor-pointer"
          />
        </div>

        <div className="mb-5 flex items-center"> 
    <FiPhone className="text-primaryColor mr-2"/>
          <input
            type="number"
            placeholder="your mobile"
            name="mobile"
            value={formData.mobile}
            onChange={(e) => handleInputChange(e)}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
            placeholder:text-textColor  cursor-pointer "
          />
        </div>
        <div className="mb-5 flex items-center"> 
              <FiUser className="text-primaryColor mr-2" /> 
          <input
            type="number"
            placeholder="age"
            name="age"
            value={formData.age}
            onChange={(e) => handleInputChange(e)}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
            placeholder:text-textColor  cursor-pointer "
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
     
        <div className="mb-5 flex items-center"> 
              <FiUser className="text-primaryColor mr-2" /> 
        
          <input
            type="text"
            placeholder="emergency person"
            name="emergency"
            value={formData.emerPerson}
            onChange={(e) => handleInputChange(e)}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
            placeholder:text-textColor  cursor-pointer "
          />
        </div>
        <div className="mb-5 flex items-center"> 
    <FiPhone className="text-primaryColor mr-2"/>
          <input
            type="number"
            placeholder="emergency contact"
            name="mobile"
            value={formData.emerNumber}
            onChange={(e) => handleInputChange(e)}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
            placeholder:text-textColor  cursor-pointer "
          />
        </div>
        <div className="mb-5 flex items-center justify-between">
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
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
              <img
                src={formData.photo}
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
    <FiUpload /> {/* Assuming FiUpload is the icon for upload */}
  </span>
              {selectedFile ? selectedFile.name : "Upload Photo"}
            </label>
          </div>
        </div>
        <div className="mt-7">
          <button
            disabled={loading && true}
            type="submit"
            className="  text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-20 py-3 text-center me-2 mb-4"
          >
            {/* {loading ? (<HashLoader size={25} color="#ffffff"/>):"Update"} */}
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
