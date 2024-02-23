import {  useState } from "react";
import MyBookings from "./MyBookings";
import Profile from "./Profile";
import { useDispatch } from "react-redux";
import useGetProfile from "../../hooks/useFetchData";
import { baseURL } from "../../../../backend/config/db";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import {logout} from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import ChangePasswordForm from '../../pages/Users/ChangePassword.jsx'

const MyAccount = () => {


const dispatch = useDispatch();
 const navigate = useNavigate();
  const [tab, setTab] = useState("bookings");
  

  const {
    data: userData,
    loading,
    error,
   
  } = useGetProfile(`${baseURL}/users/profile/me`);
  
  console.log("Loading:", loading);
  console.log("Error:", error);
  console.log("UserData:", userData);

  const handleLogout = () => {
    dispatch(logout());
  };
  // const handleChangePassword = (email) => { // Accept email as a parameter
  //   console.log(email,'email');
  //   navigate("/changepassword", { state: { email } }); // Navigate to the ChangePassword component with email as state
  // };
  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loading />}
        {error && !loading && <Error errMessage={error} />}
        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-10">
            <div className="pb-[50px] px-[30px] rounded-md">
              <div className="flex items-center justify-center">
                <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid bg-primaryColor">
                  <img
                    src={userData.photo}
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                </figure>
              </div>
              <div className="text-center mt-4">
                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                  {userData.name}
                </h3>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                {userData.email}
                </p>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  Blood Type:
                  <span className="ml-2 text-headingColor text-[22px] leading-8">
                    {userData.blood}
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
                  onClick={() => setTab("changePassword")} // Pass email to handleChangePassword
                  className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white"
                >
                  Change Password
                </button>
              </div>
            </div>
            <div className="md:col-span-2 md:px-[30px]">
              <div>
                <button
                  onClick={() => setTab("bookings")}
                  className={`${
                    tab == "bookings" &&
                    "bg-primaryColor text-white font-normal"
                  }
    p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                >
                  My Bookings
                </button>

                <button
                  onClick={() => setTab("settings")}
                  className={`${
                    tab == "settings" &&
                    "bg-primaryColor text-white font-normal"
                  } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                >
                  Profile Settings
                </button>
              </div>

              {tab === "bookings" && <MyBookings />}
              {tab === "settings" && <Profile user={userData}  />}
              {tab === "changePassword" && <ChangePasswordForm email={userData.email} />} {/* Render ChangePassword component if tab is set to changePassword */}

            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAccount;
