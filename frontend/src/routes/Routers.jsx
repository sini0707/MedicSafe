
import Home from '../pages/Users/Home';
import Services from '../pages/Users/Services';
import Login from '../pages/Users/Login';
import Signup from '../pages/Users/Signup';
import Contact from '../pages/Users/Contact';
import Doctors from '../pages/Doctors/Doctors';
import DoctorDetails from '../pages/Doctors/DoctorDetails';
import MyAccount from '../Dashboard/user-account/MyAccount';
import {Routes,Route} from 'react-router-dom';
import Dashboard from '../Dashboard/user-account/doctor-account/Dashboard';
import ProtectedRoute  from './ProtectedRoute';
// import AdminLogin from '../pages/Admin/AdminLogin'

function Routers() {
  return <Routes>
<Route path="/" element={<Home/>}/>
<Route path="/home" element={<Home/>}/>
<Route path="/doctors" element={<Doctors/>}/>
<Route path="/doctors/:id" element={<DoctorDetails/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/register" element={<Signup/>}/>
<Route path="/contact" element={<Contact/>}/>
<Route path="/services" element={<Services/>}/>
<Route path="/users/profile/me" element={<ProtectedRoute allowedRoles={['patient']}><MyAccount/></ProtectedRoute>} />
<Route path="/doctors/profile/me" element={<ProtectedRoute allowedRoles={['doctor']}><Dashboard/></ProtectedRoute>} />


{/* <Route path='/admin' element={<AdminLogin/>}/> */}

  </Routes>
}

export default Routers
