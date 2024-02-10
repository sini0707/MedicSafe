import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Routers from '../routes/Routers';
  import AdminHeader from '../components/Header/AdminHeader';
import DoctorHeader from '../components/Header/DoctorHeader';
import { useLocation } from "react-router-dom"; 


const Layouts = () => {
  
  let location = useLocation()
  let doctorHeader = location.pathname.startsWith('/doctors')
  let adminHeader = location.pathname.startsWith('/admin')
  return (
    <>
    {
      (doctorHeader)?<DoctorHeader/>:((adminHeader)?<AdminHeader/>:<Header/>)
    }
      
      <main>
        <Routers />
      </main>
      <Footer />
    </>
  );
};


export default Layouts

// import React from 'react';
// import Header from '../components/Header/Header';
// import Footer from '../components/Footer/Footer';
// import AdminFooter from '../components/Footer/AdminFooter';
// import DoctorFooter  from "../components/Footer/DoctorFooter";
// import Routers from '../routes/Routers';
// import AdminHeader from '../components/Header/AdminHeader';
// import DoctorHeader from '../components/Header/DoctorHeader'
// import { useLocation } from "react-router-dom"; 
 
// const Layouts = () => {
//   let location = useLocation();
//   let DoctorHeader = location.pathname.startsWith('/doctors');
//   let AdminHeader = location.pathname.startsWith('/admin');
//   let DoctorFooter = location.pathname.startsWith('/doctors');
//   let AdminFooter = location.pathname.startsWith('/admin');

//   let headerComponent;
//   let footerComponent;

//   if (DoctorHeader) {
//     headerComponent = <DoctorHeader />;
//   } else if (AdminHeader) {
//     headerComponent = <AdminHeader />;
//   } else {
//     headerComponent = <Header />;
//   }

//   if (DoctorFooter) {
//     footerComponent = <DoctorFooter />;
//   } else if (AdminFooter) {
//     footerComponent = <AdminFooter />;
//   } else {
//     footerComponent = <Footer />;
//   }

//   return (
//     <>
//       {headerComponent}
//       <main>
//         <Routers />
//       </main>
//       {footerComponent}
//     </>
//   );
// };

// export default Layouts;

