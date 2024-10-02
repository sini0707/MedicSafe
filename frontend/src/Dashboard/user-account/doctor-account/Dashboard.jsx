import { useState, useEffect } from "react";
import DoctorProfile from "../../../pages/Doctors/DoctorProfile";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../../../backend/config/db";
import doctorGetProfile from "../../../hooks/docFetchData";
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
      console.log(error, "errr");
    }
  }, [error, loading, doctorData]);


  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="pb-[50px] px-[30px] rounded-md">
            <div className="flex items-center justify-center">
              <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid bg-primaryColor">
                <img
                  src={doctorData.imagePath}
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
                <span className="text-textColor text-[15px] leading-6 font-medium">
                  {doctorData.specialization}
                </span>
              </p>

              <p className="text-textColor text-[15px] leading-6 font-medium">
                <span className="text-textColor text-[15px] leading-6 font-medium">
                  {doctorData.qualification}
                </span>
              </p>
            </div>

            <button
              onClick={() => setTab("settings")}
              className={`
  
      " w-full bg-gradient-to-br from-pink-500 to-orange-400 text-white font-medium"
    } flex justify-center p-3 mt-4 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-lime-400 hover:bg-lime-500 focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800`}
            >
              Profile Settings
            </button>

            <button
              onClick={() => setTab("changePassword")}
              className=" w-full bg-gradient-to-br from-green-400 to-blue-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Change Password
            </button>
          </div>

          <div className="md:col-span-2 md:px-[30px]">
            <div></div>

            {tab === "settings" && <DoctorProfile doctor={doctorData} />}

            {tab === "changePassword" && (
              <DoctorChangePassword email={doctorData.email} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
