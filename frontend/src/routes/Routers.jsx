
import Home from '../pages/Users/Home';
import Services from '../pages/Users/Services';
import Login from '../pages/Users/Login';
import Signup from '../pages/Users/Signup';
import Contact from '../pages/Users/Contact';
import Doctors from '../pages/Doctors/DoctorsHome.jsx';
import DoctorDetails from '../pages/Doctors/DoctorDetails';
import MyAccount from '../Dashboard/user-account/MyAccount';
import {Routes,Route} from 'react-router-dom';
import Dashboard from '../Dashboard/user-account/doctor-account/Dashboard';
import ProtectedRoute  from './ProtectedRoute';
 import AdminLogin from '../pages/Admin/adminLogin.jsx';
 import AdminHome from '../pages/Admin/AdminHome.jsx';
 import AdminUsers from '../pages/Admin/AdminUsers.jsx';
 import AdminDoctors from '../pages/Admin/AdminDoctors.jsx';
 import AdminBookings from '../pages/Admin/AdminBookings.jsx';
import EmailVerify from '../pages/Users/EmailVerify.jsx';
import ForgotVerify from '../pages/Users/ForgotVerify.jsx';
import {ResetPassword} from '../pages/Users/ResetPassword.jsx';



import DoctorRegister from '../pages/Doctors/DoctorRegister.jsx';
import DoctorOtpVerify from '../pages/Doctors/DoctorOtpVerify.jsx';
import DoctorLogin from '../pages/Doctors/DoctorLogin.jsx';
import DoctorsHome from '../pages/Doctors/DoctorsHome.jsx';
import Doctorss from '../pages/Doctors/Doctors.jsx';
import ChangePassword from '../pages/Users/ChangePassword.jsx';
// import DoctorProfile from '../pages/Doctors/DoctorProfile.jsx';



function Routers() {
  return <Routes>
<Route path="/" element={<Home/>}/>
<Route path="/home" element={<Home/>}/>
<Route path="/finddoctors" element={<Doctorss/>}/>

<Route path="/doctors/:id" element={<DoctorDetails/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/register" element={<Signup/>}/>
<Route path="/otpVerify" element={<EmailVerify />}/>
 <Route path='/forgot' element={<ForgotVerify/>}/> 
 <Route path='/resetPassword' element={<ResetPassword/>}/>
 {/* <Route path="/logout" element={<Headers />}/> */}

<Route path="/contact" element={<Contact/>}/>
<Route path="/services" element={<Services/>}/>
<Route path="/changepassword" element={<ChangePassword/>}/>
<Route path="/users/profile/me" element={<ProtectedRoute allowedRoles={['patient']}><MyAccount/></ProtectedRoute>} />




<Route path="/doctors/profile/me" element={<ProtectedRoute allowedRoles={['doctor']}><Dashboard/></ProtectedRoute>} />


<Route path='/doctors/signup' element={<DoctorRegister/>}/>
<Route path='/doctors/otp' element={<DoctorOtpVerify/>}/>
<Route path='/doctors/login' element={<DoctorLogin/>}/>
<Route path='/doctors/home' element={<DoctorsHome/>}/>
<Route path='/doctors/1' element={<DoctorDetails/>}/>

{/* <Route path='/doctors/profile' element={<DoctorProfile/>}/>   */}




<Route path='/admin' element={<AdminLogin/>}/>
<Route path='/admin/home' element={<AdminHome/>}/>
  <Route path='/admin/userlist' element={<AdminUsers/>}/>
  <Route path='/admin/doctorslist' element={<AdminDoctors/>}/>
  <Route path='/admin/bookings' element={<AdminBookings/>}/>



  </Routes>
}

export default Routers
