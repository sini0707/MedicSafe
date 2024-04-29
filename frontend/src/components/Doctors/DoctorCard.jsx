import starIcon from "../../assets/images/Star.png";
import { Link, useSearchParams } from "react-router-dom";
import { BiSolidRightArrow } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { baseURL } from "../../../../backend/config/db";
import { useState } from "react";
import { toast } from "react-toastify";


const DoctorCard = ({ doctor }) => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const urlSearchParams = new URLSearchParams(window.location.search);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleDetails = () => {
   
 
    if (location.pathname.includes("/doctors")) {
      navigate(`/doctors/doctorDetails/${doctor._id}`);
    } else {
      navigate(`/users/doctorDetails/${doctor._id}`);
    }
  
  };

  const {
    name,
    imagePath,
    specialization,
    fees,
    qualification,
    averageRating,
  } = doctor;

  const getColorClass = (rating) => {
    if (rating >= 4) {
      return "text-green-500"; // Green color for high ratings
    } else if (rating >= 3) {
      return "text-yellow-500"; // Yellow color for moderate ratings
    } else {
      return "text-red-500"; // Red color for low ratings
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        stars.push(
          <svg
            key={i}
            className={`w-6 h-6 fill-current ${getColorClass(rating)}`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C12.96 2 13.74 2.76 13.74 3.72L14.76 8.4C14.82 8.56 15 8.64 15.16 8.64H20.82C21.84 8.64 22.26 10 21.36 10.56L17.16 13.32C17 13.48 16.92 13.72 17 13.92L18.18 18.36C18.3 18.64 18.1 18.92 17.82 18.92H13.62C13.44 18.92 13.26 18.84 13.2 18.68L12 14.52C11.94 14.38 11.76 14.38 11.64 14.52L10.44 18.68C10.38 18.84 10.2 18.92 10.02 18.92H5.82C5.52 18.92 5.32 18.64 5.44 18.36L6.62 13.92C6.7 13.72 6.58 13.48 6.42 13.32L2.22 10.56C1.32 10 1.74 8.64 2.76 8.64H8.42C8.58 8.64 8.76 8.56 8.82 8.4L9.84 3.72C9.84 2.76 10.56 2 11.52 2H12Z"
            />
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={i}
            className="w-6 h-6 fill-current text-gray-300"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C12.96 2 13.74 2.76 13.74 3.72L14.76 8.4C14.82 8.56 15 8.64 15.16 8.64H20.82C21.84 8.64 22.26 10 21.36 10.56L17.16 13.32C17 13.48 16.92 13.72 17 13.92L18.18 18.36C18.3 18.64 18.1 18.92 17.82 18.92H13.62C13.44 18.92 13.26 18.84 13.2 18.68L12 14.52C11.94 14.38 11.76 14.38 11.64 14.52L10.44 18.68C10.38 18.84 10.2 18.92 10.02 18.92H5.82C5.52 18.92 5.32 18.64 5.44 18.36L6.62 13.92C6.7 13.72 6.58 13.48 6.42 13.32L2.22 10.56C1.32 10 1.74 8.64 2.76 8.64H8.42C8.58 8.64 8.76 8.56 8.82 8.4L9.84 3.72C9.84 2.76 10.56 2 11.52 2H12Z"
            />
          </svg>
        );
      }
    }
    return stars;
  };




 
  return (
    <>
      <div className="flex items-center justify-center hover:">
        <div className="mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid rounded-3xl max-w-xs shadow-sm bg-slate-100 flex-col group relative transition-transform duration-100 ease-in-out transform-gpu hover:-translate-y-2">
            {" "}
            <Link to={`/users/doctorDetails/${doctor._id}`}>
          
              <img
                src={imagePath}
                width={`320`}
                height={300}
                className="rounded-t-3xl justify-center grid h-52 object-cover"
                alt="movie.title"
              />
            </Link>
            <div className="group p-4 grid z-10">
              <a
                href="{`${movie.link}`}"
                className="group-hover:text-cyan-700 font-bold sm:text-lg line-clamp-2"
              >
                {name}
              </a>
              <span className="text-slate-400 pt-2 font-semibold">
                {specialization}
              </span>
              <div className="h-20">
                <span className="line-clamp-3 py-2 text-sm font-light leading-relaxed">
                  {qualification}
                </span>
              </div>
              <div className="grid grid-cols-2 flex group justify-between">
                <div className="font-black flex flex-col">
                  <span className="text-yellow-500 text-lg">Rating</span>
                  <span className="text-lg flex gap-x-1 items-center group-hover:text-yellow-600">
                    {averageRating.toFixed()}
                    {renderStars(averageRating.toFixed())}

                    <svg
                      width="18px"
                      height="18px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        {" "}
                      </g>
                    </svg>
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <div className="h-7">
                    <span className="text-lg font-bold gap-x-2 text-300">
                      Rs.{fees}
                    </span>
                  </div>

                 

                  <div onClick={handleDetails}>
                    <BiSolidRightArrow className="group-hover:text-white w-6 h-5" />
                  </div>

                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};



export default DoctorCard;
