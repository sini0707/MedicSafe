import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { baseURL } from "../../../../backend/config/db";
import uploadImageCloudinary from "../../../../backend/utils/uploadCloudinary";
import apiInstance from "../../axiosApi/axiosInstance";

const DoctorRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [address, setAddress] = useState("");
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("");
  const [fees, setFees] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const [image, setImage] = useState(null);
  const [role, setRole] = useState("Doctor");
  const [specializationList, setSpecializationList] = useState([]);

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    try {
      const data = await uploadImageCloudinary(file);

      setImage(data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !email ||
      !specialization ||
      !address ||
      !qualification ||
      !experience ||
      !fees ||
      !password ||
      !confirmpass
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (password !== confirmpass) {
      toast.error("Passwords do not match.");
      return;
    }
    if (!isValidPassword(password)) {
      toast.error(
        "Password must contain at least 5 characters with at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    try {
      const requestData = {
        name,
        email,
        specialization,
        qualification,
        experience,
        address,
        fees,
        password,
        imagePath: image,
        role,
      };

      const res = await apiInstance.post(
        `${baseURL}/doctors/register`,
        requestData
      );

      if (!res.data.success) {
        toast.error(res.data.message);
      }

      navigate("/doctors/otp", { state: { email } });
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    }
  };

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
    return passwordRegex.test(password);
  };
  useEffect(() => {
    const fetchSpecializationList = async () => {
      try {
        const res = await apiInstance.get(
          `${baseURL}/doctors/getspecializations`
        );
        setSpecializationList(res.data);
      } catch (error) {
        console.error("Error fetching specializationList:", error);
      }
    };

    fetchSpecializationList();
  }, []);

  return (
    <section className="p-4 px-5 lg:px-0">
      <div className="faded-blue-div text-center md:text-left w-full max-w-[1000px] mx-auto rounded-lg shadow-md p-5">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold">
          Doctor <span className="text-primaryColor">Registration</span>
        </h3>
      </div>

      <div className="faded-blue-div m-3 md:flex-col w-full max-w-[1000px] mx-auto rounded-lg shadow-md p-5">
        <form
          onSubmit={submitHandler}
          encType="multipart/form-data"
          className="md:flex md:justify-between md:mx-[60px] items-center"
        >
          <div className="px-2">
            <div className="flex">
              <div className="mb-2 me-2 w-1/2">
                <label
                  htmlFor="uploadPhoto"
                  className="inline-block text-sm font-medium text-blue-500 dark:text-blue-200"
                >
                  Upload your Photo
                </label>
                <input
                  className="relative py-1 m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-blue-300 bg-clip-padding px-3 py-[0.32rem] text-xs font-normal text-blue-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-blue-100 file:px-3 file:py-[0.32rem] file:text-blue-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-blue-200 focus:border-primary focus:text-blue-700 focus:shadow-te-primary focus:outline-none dark:border-blue-600 dark:text-blue-200 dark:file:bg-blue-700 dark:file:text-blue-100 dark:focus:border-primary"
                  id="uploadPhoto"
                  onChange={handleFileInputChange}
                  accept=".jpg,.png"
                  type="file"
                />
              </div>
              <div className="mb-2 ms-2 w-1/2">
                <label
                  className="text-blue-500 text-sm font-medium"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  id="name"
                  placeholder="Enter Your Name"
                  className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="my-[10px]">
              <label
                className="text-blue-500 text-sm font-medium"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                id="email"
                placeholder="Enter Your Email"
                className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="my-[10px]">
              <label
                className="text-blue-500 text-sm font-medium"
                htmlFor="specialization"
              >
                Specialisation
              </label>
              <select
                name="specialization"
                id="specialization"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={specialization}
                onChange={(e) => {
                  setSpecialization(e.target.value);
                }}
              >
                <option value="">Select a Specialization</option>

                {specializationList ? (
                  specializationList.map((specialization, index) => {
                    return (
                      <option value={specialization.name} key={index}>
                        {specialization.name}
                      </option>
                    );
                  })
                ) : (
                  <option value="">No Data Available</option>
                )}
              </select>
            </div>

            <div className="my-[10px]">
              <label
                className="text-blue-500 text-sm font-medium"
                htmlFor="address"
              >
                Address
              </label>
              <textarea
                name="address"
                id="address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                cols="50"
                rows="4"
                placeholder="Enter Your Address"
                className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
              ></textarea>
            </div>
            <div className="mb-3 flex">
              <div className="ms-2 w-1/2">
                <label
                  className="text-blue-500 text-sm font-medium"
                  htmlFor="fees"
                >
                  Fees
                </label>
                <input
                  type="number"
                  name="fees"
                  value={fees}
                  onChange={(e) => {
                    setFees(e.target.value);
                  }}
                  id="fees"
                  placeholder="Enter Your Fees"
                  className="block mt-1 px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
          <div className="px-2">
            <div className="my-[20px]">
              <div>
                <label
                  className="text-sm text-blue-500 font-medium"
                  htmlFor="address"
                >
                  Qualification
                </label>
                <textarea
                  name="qualification"
                  value={qualification}
                  onChange={(e) => {
                    setQualification(e.target.value);
                  }}
                  className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
                  id="qualification"
                  placeholder="Qualification"
                  cols="30"
                  rows="2"
                ></textarea>
              </div>
            </div>
            <div className="my-[20px]">
              <div>
                <label
                  className="text-sm text-blue-500 font-medium"
                  htmlFor="address"
                >
                  Experience
                </label>
                <textarea
                  name="experience"
                  value={experience}
                  onChange={(e) => {
                    setExperience(e.target.value);
                  }}
                  className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
                  id="experience"
                  placeholder="Experience"
                  cols="30"
                  rows="2"
                ></textarea>
              </div>
              <div className="my-[20px]">
                <label
                  className="text-blue-500 text-sm font-medium"
                  htmlFor="Password"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  id="Password"
                  placeholder="Enter Your Password"
                  className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="my-[20px]">
                <label
                  className="text-blue-500 text-sm font-medium"
                  htmlFor="Confirm Password"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={confirmpass}
                  onChange={(e) => {
                    setConfirmpass(e.target.value);
                  }}
                  id="Confirm Password"
                  placeholder="Confirm Password"
                  className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="my-[20px]">
                <label
                  className="text-blue-500 text-sm font-medium"
                  htmlFor="role"
                >
                  Role
                </label>
                <input
                  type="role"
                  name="doctor"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                  id="role"
                  placeholder="role"
                  className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Register
              </button>
            </div>
            <div className="my-[10px] text-[12px] flex items-center justify-center">
              <p className="text-textGray">Already In?</p>
              <Link to="/doctors/login">
                <p className="text-primaryColor mx-[2px]">Login</p>
              </Link>
            </div>
          </div>
        </form>
        <div className="text-center">
          <p className="text-blue-500 font-bold my-2">
            **Approval is done by the admin team only after proper verification
          </p>
        </div>
      </div>
    </section>
  );
};

export default DoctorRegister;
