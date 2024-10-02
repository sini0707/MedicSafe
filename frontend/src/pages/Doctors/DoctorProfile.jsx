import uploadImageCloudinary from "../../../../backend/utils/uploadCloudinary";
import { useEffect, useState } from "react";
import { baseURL } from "../../../../backend/config/db";
import { setDoctorCredentials } from "../../slices/doctorSlices/doctorAuthSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { doctoken } from "../../../config";

import {
  FiUser,
  FiMail,
  FiPhone,
  FiUpload,
  FiMapPin,
  FiDollarSign,
} from "react-icons/fi";

const DoctorProfile = (doctor) => {
  const docId = doctor.doctor._id;


  const [selectedFile, setSelectedFile] = useState(null);
 
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    photo: "",
    experience: "",
    education: "",
    certificate: "",
    fees: "",
    address: "",
    specialization: "",
  });

 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];

    const data = await uploadImageCloudinary(file);
   

    setSelectedFile(data.url);
    
    setFormData({ ...formData, photo: data.url });
  };
  const handleCertificateInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageCloudinary(file);
    setSelectedCertificate(data.url);
    setFormData({ ...formData, certificate: data.url });
  };

  useEffect(() => {
    if (doctor && doctor.doctor) {
      setFormData({
        name: doctor.doctor.name,
        email: doctor.doctor.email,
        mobile: doctor.doctor.mobile,
        photo: doctor.doctor.imagePath || "",
        experience: doctor.doctor.experience || "",
        education: doctor.doctor.education || "",
        certificate: doctor.doctor.certificate || "",
        fees: doctor.doctor.fees || "",
        address: doctor.doctor.address || "",
        specialization: doctor.doctor.specialization || "",
        role: doctor.role || "doctor",
      });
    }
  }, [doctor]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/doctors/updateDoctor/${docId}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${doctoken}`,
        },
        body: JSON.stringify(formData),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || "Failed to update profile");
      }

      const { message, data } = responseData;

      dispatch(setDoctorCredentials(data));
      toast.success(message || "Profile successfully updated");

      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <section className="p-4 px-5 lg:px-0">
      <div className="gray-div text-center md:text-left w-full max-w-[1000px] mx-auto rounded-lg shadow-md p-5">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold">
          Doctor <span className="text-primaryColor">Profile</span>
        </h3>
      </div>

      <div className="faded-blue-div m-3 md:flex-col w-full max-w-[1000px] mx-auto rounded-lg shadow-md p-5">
        <form
          onSubmit={submitHandler}
          encType="multipart/form-data"
          className="md:flex md:justify-between md:mx-[60px] items-center"
        >
          <div className="px-2 m-2">
            <div className="mb-5 flex items-center">
              <FiUpload className="text-primaryColor mr-2" />
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
                  {selectedFile ? selectedFile.name : "Upload Photo"}
                </label>
              </div>
            </div>

            <div className="mb-5 flex items-center">
              <FiUser className="text-primaryColor mr-2" />
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                value={formData.name}
                onChange={(e) => handleInputChange(e)}
                className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
            placeholder:text-textColor  cursor-pointer"
              />
            </div>

            <div className="mb-5 flex items-center">
              <FiMail className="text-primaryColor mr-2" />
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
              <FiPhone className="text-primaryColor mr-2" />
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

            <div className="mb-5">
              <input
                type="text"
                placeholder="your specialization"
                name="specialization"
                value={formData.specialization}
                onChange={(e) => handleInputChange(e)}
                className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
            placeholder:text-textColor  cursor-pointer "
              />
            </div>

            <div className="mb-5 flex items-center">
              <FiMapPin className="text-primaryColor mr-2" />
              <input
                type="text"
                placeholder=" Your Address"
                name="address"
                value={formData.address}
                onChange={(e) => handleInputChange(e)}
                className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
            placeholder:text-textColor  cursor-pointer "
              />
            </div>
            <div className="mb-5">
              <input
                type="text"
                placeholder=" Your Education"
                name="education"
                value={formData.education}
                onChange={(e) => handleInputChange(e)}
                className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
            placeholder:text-textColor  cursor-pointer "
              />
            </div>
            <div className="mb-5">
              <input
                type="text"
                placeholder=" Your Experience"
                name="experience"
                value={formData.experience}
                onChange={(e) => handleInputChange(e)}
                className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
            placeholder:text-textColor  cursor-pointer "
              />
            </div>
          </div>
          <div className="px-2">
            <div className="mb-5 flex items-center">
              <FiDollarSign className="text-primaryColor mr-2" />
              <input
                type="number"
                placeholder="enter fees"
                name="fees"
                value={formData.fees}
                onChange={(e) => handleInputChange(e)}
                className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
            placeholder:text-textColor  cursor-pointer "
              />
            </div>

            <div className="mb-5 flex items-center gap-3">
              {formData.certificate && (
                <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                  <img
                    src={formData.certificate}
                    alt=""
                    className="w-full rounded-full"
                  />
                </figure>
              )}
              <div className="relative w-[130px] h-[50px]">
                <input
                  type="file"
                  name="certificate"
                  id="customFile2"
                  onChange={handleCertificateInputChange}
                  accept=".jpg,.png"
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
                <label
                  htmlFor="customFile2"
                  className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font semibold rounded-lg truncate cursor-pointer"
                >
                  {selectedCertificate
                    ? selectedCertificate.name
                    : "Upload Certificate"}
                </label>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
        <div className="text-center"></div>
      </div>
    </section>
  );
};

export default DoctorProfile;
