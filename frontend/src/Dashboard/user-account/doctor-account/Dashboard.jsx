
import { useState ,useEffect} from "react";
import MyAppointments from "../../../pages/Doctors/MyAppointments";
import DoctorProfile from "../../../pages/Doctors/DoctorProfile";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../../../backend/config/db";
import doctorGetProfile from '../../../hooks/docFetchData';
import {logout} from "../../../slices/doctorSlices/doctorAuthSlice";
import DoctorChangePassword from "../../../pages/Doctors/DoctorChangePassword";
const Dashboard = () => {
  const [tab, setTab] = useState("appointments");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: doctorData,
    loading,
    error,
   
  } = doctorGetProfile(`${baseURL}/doctors/profile/me`);
  

  useEffect(() => {
    if (error) {
      
      console.log("Error in Doctor profile fetching data");
      console.log(error,"errr")
    }
  }, [error,  loading, doctorData]);

  const handleLogout = () => {
    dispatch(logout());
  };
  



  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {/* {loading && !error && <Loading />} */}
        {/* {error && !loading && <Error errMessage={error} />} */}
        {/* {!loading && !error && ( */}
        <div className="grid md:grid-cols-3 gap-10">
          <div className="pb-[50px] px-[30px] rounded-md">
            <div className="flex items-center justify-center">
              <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid bg-primaryColor">
                <img
                  src={doctorData.imagePath
                  }
                  alt=""
                  className="w-full h-full rounded-full"
                />
              </figure>
            </div>
            <div className="text-center mt-4">
              <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                {doctorData.name}
              </h3>
              <p className="text-textColor text-[15px] leading-6 font-medium">
                {doctorData.email}
              </p>
              <p className="text-textColor text-[15px] leading-6 font-medium">
               
                <span className="ml-2 text-headingColor text-[22px] leading-8">
                 {doctorData.education}
                </span>
              </p>
            </div>

            <div className="mt-[50px] md:mt-[100px]">
              <button
                 onClick={handleLogout}
                className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white"
              >
                Logout
              </button>
              <button
                onClick={() => setTab("changePassword")}
                className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white"
              >
                Change Password
              </button>
            </div>
          </div>
          <div className="md:col-span-2 md:px-[30px]">
            <div>
              <button
                onClick={() => setTab("appointments")}
                className={`${
                  tab === "appointments" &&
                  "bg-primaryColor text-white font-normal"
                }
                  p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
              >
                My Appointments
              </button>

              <button
                onClick={() => setTab("settings")}
                className={`${
                  tab === "settings" &&
                  "bg-primaryColor text-white font-normal"
                } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
              >
                Profile Settings
              </button>
             
            </div>

            {tab === "appointments" && <MyAppointments />}
            {tab === "settings" && <DoctorProfile doctor={doctorData} />}
           
            {tab === "changePassword" && <DoctorChangePassword />} {/* Render ChangePassword component if tab is set to changePassword */}

          </div>
        </div>
        {/* )} */}
      </div>
    </section>
  );
};

export default Dashboard;
