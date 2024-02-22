// import {  useState } from "react";
// import { useDispatch } from "react-redux";
// import Loading from "../../components/Loader/Loading";
// import Error from "../../components/Error/Error";
// import {logout} from "../../../slices/doctorSlices/doctorAuthSlice";
// import doctorGetProfile from '../../../hooks/docFetchData';
// import { baseURL } from "../../../../backend/config/db";
// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const [tab, setTab] = useState("appointments");

//   const {
//     data: doctorData,
//     loading,
//     error,
//   } = doctorGetProfile(`${baseURL}/doctors/profile/me`);
  
//   console.log("Loading:", loading);
//   console.log("Error:", error);
//   console.log("UserData:", doctorData);

//   const handleLogout = () => {
//     dispatch(logout());
//   };

//   return (
//     <section>
//       <div className="max-w-[1170px] px-5 mx-auto">
//         {loading && !error && <Loading />}
//         {error && !loading && <Error errMessage={error} />}
//         {!loading && !error && (
//           <div className="grid md:grid-cols-3 gap-10">
//             <div className="pb-[50px] px-[30px] rounded-md">
//               <div className="flex items-center justify-center">
//                 <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid bg-primaryColor">
//                   <img
//                     src={doctorData.photo}
//                     alt=""
//                     className="w-full h-full rounded-full"
//                   />
//                 </figure>
//               </div>
//               <div className="text-center mt-4">
//                 <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
//                   {doctorData.name}
//                 </h3>
//                 <p className="text-textColor text-[15px] leading-6 font-medium">
//                 {doctorData.email}
//                 </p>
//                 <p className="text-textColor text-[15px] leading-6 font-medium">
//                   Blood Type:
//                   <span className="ml-2 text-headingColor text-[22px] leading-8">
//                     {doctorData.blood}
//                   </span>
//                 </p>
//               </div>

//               <div className="mt-[50px] md:mt-[100px]">
//                 <button
//                   onClick={handleLogout}
//                   className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white"
//                 >
//                   Logout
//                 </button>
//                 {/* <button className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white">
//                   Change Password
//                 </button> */}
//               </div>
//             </div>
//             <div className="md:col-span-2 md:px-[30px]">
//               <div>
//                 <button
//                   onClick={() => setTab("bookings")}
//                   className={`${
//                     tab == "appointments" &&
//                     "bg-primaryColor text-white font-normal"
//                   }
//     p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
//                 >
//                   My Appointments
//                 </button>

//                 <button
//                   onClick={() => setTab("time management")}
//                   className={`${
//                     tab == "timemanagement" &&
//                     "bg-primaryColor text-white font-normal"
//                   } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
//                 >
//                  TimeManagement
//                 </button>
//               </div>

//               {tab === "appointments" && <Appointments />}
              
//               {tab === "timemanagement" && <TimeManagement />}

//               {/* {tab === "settings" && <Profile user={userData} />} */}
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   )
// }

// export default Dashboard



const Dashboard = () => {
  return (
    <div>
      <h2>doctors profile page</h2>
    </div>
  )
}

export default Dashboard


