import {  useState,useEffect } from "react";
import MyBookings from "./MyBookings";
import Profile from "./Profile";
import { useDispatch } from "react-redux";
import useGetProfile from "../../hooks/useFetchData";
import { baseURL } from "../../../../backend/config/db";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import {logout} from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import ChangePasswordForm from '../../pages/Users/ChangePassword.jsx';
import { BsFillWalletFill } from "react-icons/bs";
import WalletComponent from "../../pages/Users/WalletComponent.jsx";

const MyAccount = () => {


const dispatch = useDispatch();
 const navigate = useNavigate();
  const [tab, setTab] = useState("bookings");

  


  const {
    data: userData,
    loading,
    error,
   
  } = useGetProfile(`${baseURL}/users/profile/me`);

  
  useEffect(() => {
    if (error) {
      
      console.log("Error in user profile fetching data");
      console.log(error,"errr")
    }
  }, [error, userData, loading, userData]);

  const handleLogout = () => {
    dispatch(logout());
  };

 
    const handleWalletClick = () => {
      navigate('/wallet');
    };
  
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
              <WalletComponent />
                <button
  className="w-full flex items-center justify-center bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 leading-7 rounded-md text-white shadow-md"

  onClick={handleWalletClick}
>
  <BsFillWalletFill className="w-6 h-6 mr-2" />
  <span>Wallet</span>
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
