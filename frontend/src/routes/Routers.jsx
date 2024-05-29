import Home from "../pages/Users/Home";
import Services from "../pages/Users/Services";
import Login from "../pages/Users/Login";
import Signup from "../pages/Users/Signup";
import Contact from "../pages/Users/Contact";
import Doctors from "../pages/Doctors/DoctorsHome.jsx";
import DoctorDetails from "../pages/Users/DoctorDetails.jsx";
import MyAccount from "../Dashboard/user-account/MyAccount.jsx";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../Dashboard/user-account/doctor-account/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

import AdminLogin from "../pages/Admin/adminLogin.jsx";
import AdminHome from "../pages/Admin/AdminHome.jsx";
import AdminUsers from "../pages/Admin/AdminUsers.jsx";
import AdminDoctors from "../pages/Admin/AdminDoctors.jsx";
import Booking from "../pages/Admin/Booking.jsx"
import EmailVerify from "../pages/Users/EmailVerify.jsx";
import ForgotVerify from "../pages/Users/ForgotVerify.jsx";
import { ResetPassword } from "../pages/Users/ResetPassword.jsx";
import SuccessPayment from "../pages/Users/SuccessPayment.jsx";

import DoctorRegister from "../pages/Doctors/DoctorRegister.jsx";
import DoctorOtpVerify from "../pages/Doctors/DoctorOtpVerify.jsx";
import DoctorLogin from "../pages/Doctors/DoctorLogin.jsx";
import DoctorsHome from "../pages/Doctors/DoctorsHome.jsx";
import Doctorss from "../pages/Doctors/Doctors.jsx";
import ChangePassword from "../pages/Users/ChangePassword.jsx";
import DoctorProfile from "../pages/Doctors/DoctorProfile.jsx";
import DoctorTimeManagement from "../pages/Doctors/DoctorTimeManagement.jsx";
import DoctorChangePassword from "../pages/Doctors/DoctorChangePassword.jsx";
import DoctorForgotVerify from "../pages/Doctors/DoctorForgotVerify.jsx";
import MyAppointments from "../pages/Doctors/MyAppointments.jsx";
import MyBookings from "../Dashboard/user-account/MyBookings.jsx";
import UserVideoCallRoom from "../pages/Users/UserVideoCallRoom.jsx";
import DoctorVideoCallRoom from "../pages/Doctors/DoctorVideoCallRoom.jsx";
import Specialization from "../pages/Admin/Specialization.jsx";
import WalletComponent from "../pages/Users/WalletComponent.jsx";
import DoctorChat from "../pages/Doctors/DoctorChat.jsx";
import ErrorPage from "../components/ErrorPage/ErrorPage.jsx";
import ProtectedAdminRoute from "./ProtectedAdminRoute.jsx";
import DoctorDashboard from "../pages/Doctors/DoctorDashboard.jsx";
import ProtectedDoctorRoute from "./ProtectedDoctorRoute.jsx";


function Routers() {
  return (

    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/finddoctors"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <Doctorss />
          </ProtectedRoute>
        }
      />

      <Route path="/users/doctorDetails/:id" element={<DoctorDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/otpVerify" element={<EmailVerify />} />
      <Route path="/forgot" element={<ForgotVerify />} />
      <Route path="/resetPassword" element={<ResetPassword />} />

      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />

      <Route
        path="/changepassword"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <ChangePassword />
          </ProtectedRoute>
        }
      />

      <Route
        path="/users/profile/me"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <MyAccount />
          </ProtectedRoute>
        }
      />

      <Route
        path="/users/wallet"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <WalletComponent />
          </ProtectedRoute>
        }
      />

      <Route
        path="/users/room/:roomId"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <UserVideoCallRoom />
          </ProtectedRoute>
        }
      />

      <Route
        path="/checkout-success"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <SuccessPayment />
          </ProtectedRoute>
        }
      />

      <Route
        path="/bookings"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <MyBookings />
          </ProtectedRoute>
        }
      />

      {/*** **************Doctors Route start******************** */}

      <Route path="/doctors/profile/me" element={<Dashboard />} />

      <Route path="/doctors/finddoctors" element={<Doctorss />} />
      <Route path="/doctors/doctorDetails/:id" element={<DoctorDetails />} />
      <Route path="/doctors/signup" element={<DoctorRegister />} />
      <Route path="/doctors/otp" element={<DoctorOtpVerify />} />
      <Route path="/doctors/login" element={<DoctorLogin />} />
      <Route path="/doctors/forgot" element={<DoctorForgotVerify />} />

      <Route path="/doctors/home" element={<DoctorsHome />} />

      <Route path="/doctors/managetime" element={<DoctorTimeManagement />} />

      <Route path="/doctors/appointments" element={<MyAppointments />} />

      <Route path="/doctors/profile" element={<DoctorProfile />} />
      <Route
        path="/doctors/changepassword"
        element={<DoctorChangePassword />}
      />

      <Route path="/doctors/room/:roomId" element={<DoctorVideoCallRoom />} />

      {/* <Route
        path="/doctors/room/:roomId"
        element={
          <ProtectedDoctorRoute allowedRoles={["doctor"]}>
            <AdminHome />
          </ProtectedDoctorRoute>
        }
      /> */}

      <Route path="/doctors/chat" element={<DoctorChat />} />
      <Route path="/doctors/dashboard" element={<DoctorDashboard/>}/>

      <Route path="/admin" element={<AdminLogin />} />

      <Route
        path="/admin/home"
        element={
          <ProtectedAdminRoute allowedRoles={["admin"]}>
            <AdminHome />
          </ProtectedAdminRoute>
        }
      />

      <Route
        path="/admin/userlist"
        element={
          <ProtectedAdminRoute allowedRoles={["admin"]}>
            <AdminUsers />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/doctorslist"
        element={
          <ProtectedAdminRoute allowedRoles={["admin"]}>
            <AdminDoctors />
          </ProtectedAdminRoute>
        }
      />

      <Route
        path="/admin/bookings"
        element={
          <ProtectedAdminRoute allowedRoles={["admin"]}>
            <Booking />
          </ProtectedAdminRoute>
        }
      />

      <Route
        path="/admin/specializations"
        element={
          <ProtectedAdminRoute allowedRoles={["admin"]}>
            <Specialization />
          </ProtectedAdminRoute>
        }
      />

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default Routers;
