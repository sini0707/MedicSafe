 import React, { Suspense } from "react";

// import DoctorCard from './DoctorCard';
const LazyDoctorCard = React.lazy(() => import("./DoctorCard"));


const DoctorList = ({ doctors }) => {
    
    if (!doctors || !Array.isArray(doctors)) {
        return null; // or return a loading indicator, an error message, or an empty state
       
    }
   
    return (
        // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] mt-[30px] lg:mt-[55px]">
        //     {doctors.map((doctor) => (
        //         <DoctorCard key={doctor._id} doctor={doctor} />
        //     ))}
        // </div>
        <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] mt-[30px] lg:mt-[55px]">
          {doctors.map((doctor) => (
            <Suspense key={doctor._id} fallback={<div style={{ color: 'blue' }}>Loading...</div>}>
              <LazyDoctorCard doctor={doctor} />
            </Suspense>
          ))}
        </div>
      </>
    );
};
export default DoctorList

// const LazyDoctorCard = React.lazy(() => import("./DoctorCard"));

// const DoctorList = ({ doctors }) => {
//   return (
//     <>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] mt-[30px] lg:mt-[55px]">
//         {doctors.map((doctor) => (
//           <Suspense key={doctor._id} fallback={<div>Loading...</div>}>
//             <LazyDoctorCard doctor={doctor} />
//           </Suspense>
//         ))}
//       </div>
//     </>
//   );
// };

// export default DoctorList;

