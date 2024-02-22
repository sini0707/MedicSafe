

import DoctorCard from './DoctorCard';


const DoctorList = ({ doctors }) => {
    if (!doctors || !Array.isArray(doctors)) {
        return null; // or return a loading indicator, an error message, or an empty state
       
    }
    console.log(doctors, "klfdjslkgf");
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] mt-[30px] lg:mt-[55px]">
            {doctors.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
        </div>
    );
};
export default DoctorList
