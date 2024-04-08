import { useState, useEffect } from "react";
import starIcon from "../../../src/assets/images/Star.png";
import moment from "moment-timezone";
import { useNavigate, useParams } from "react-router-dom";
import apiInstance from "../../axiosApi/axiosInstance";
import { baseURL } from "../../../../backend/config/db";
import convertTo12HourFormat from "../../utils/convertTime";
import formatDate from "../../utils/convertDate";
import { toast } from "react-toastify";
import { token } from "../../../config";
import { useSelector } from "react-redux";
import DoctorAbout from "../Doctors/DoctorAbout.jsx";

import Feedback from "../Doctors/Feedback.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 
import formatDateToUTC from "../../utils/inputDateConvert";
import slotMaker from "../../utils/slotMaker";

const DoctorDetails = () => {
  const [tab, setTab] = useState("about");
  const [details, setDetails] = useState({});
  const [slot, setSlot] = useState("");

  const [bookings, setBookings] = useState([]);
  const [available, setAvailable] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [selectedDateSlots, setSelectedDateSlots] = useState([]);

  const [availableTime, setAvailableTime] = useState([]);

  const [slotBooked, setSlotBooked] = useState(false);
  const [bookedTimes, setBookedTimes] = useState([]);
  
  

  let { id } = useParams();
  const doctorId = id;

  const userInfo = useSelector((state) => state.auth.userInfo);
  const userId = userInfo._id;

  const fetchDoctor = async () => {
    try {
      const res = await apiInstance.get(
        `${baseURL}/doctors/getdoctor/${doctorId}`
      );

      setDetails(res.data.data);
      setAvailable(res.data.data.available);
    } catch (error) {
      console.log(error);
      console.error("Error fetching doctor details:", error);
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, []);

  const bookHandler = async (date, time) => {
    
    if (!date || !time) {
      toast.error("Please select both date and time");
      return;
    }
    if (bookedTimes.includes(time)) {
      toast.error("This time slot is already booked");
      return;
    }

    const newBookedTimes = [...bookedTimes, time];
  setBookedTimes(newBookedTimes);

 
  const updatedAvailableTime = availableTime.filter(elem => elem !== time);
  setAvailableTime(updatedAvailableTime);


    const indianDate = moment(date).tz("Asia/Kolkata").format("DD/MM/YYYY");
    const indianTime = moment
      .tz(time, "HH:mm", "Asia/Kolkata")
      .format("hh:mm A");

    try {
      const res = await apiInstance.post(
        `${baseURL}/users/checkout-session/${details._id}/${userId}`,
        {
          date: indianDate,
          time: indianTime,
        }
      );

      window.location.href = res.data.session.url;
      setSlotBooked(true);

      if (!res.ok) {
        throw new Error(res.data.message + " Please try again");
      }
    } catch (err) {
      toast.error(err.message || "An error occurred while booking appointment");
    }
  };

  const dateHandler = (e) => {
    if (new Date(e.target.value) < Date.now()) {
      toast.error("select a future date");
      return;
    }
    setSlot("");
    let selectedDate = e.target.value;
    let formattedDate = formatDateToUTC(selectedDate);
  

    let availavleTimings = available.filter(
      (item) => item.date === formattedDate
    );
    const timings = availavleTimings.map((elem) => {
      return elem.fromTime;
    });

    setAvailableTime(timings);

    let slotCount = 0;
    const existingBookingIndex = bookings.findIndex(
      (booking) => booking.date === formattedDate
    );

    if (existingBookingIndex == -1) {
      slotCount = 0;
    } else {
      slotCount = bookings[existingBookingIndex].slots.length;
    }

    let check = details.available.filter((temp) => temp.date === formattedDate);
    if (check.length > 0) {
      let slots = slotMaker(check, slotCount);
      setSlot(slots);
    }
    setDate(selectedDate);
  };

  /** setting Time */

  const handleTime = () => {
    setTime(time);
  };

  const formattedRating = details && details.averageRating ? details.averageRating.toFixed(1) : '';

  
  return (
    <section className="container flex-col h-5/6">
      <div className="flex flex-col lg:flex-row md:justify-start items-center">
        <div className="flex flex-col items-center md:flex-row">
          <div className="image md:shrink-0 bg-blue-500 h-60 w-56 rounded-lg">
            <img
              className="h-full w-full object-cover rounded-lg"
              src={details.imagePath}
              alt="profile"
            />
          </div>

          <div className="details text-center mx-5 md:text-left h-full">
            <div className="flex justify-center md:justify-start py-2">
              <h1 className="px-2 font-bold text-3xl">{details.name}</h1>
              <div className="flex items-center gap-[6px]">
                <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                {formattedRating}
                  <img src={starIcon} alt="" />
                </span>
                <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                  {}
                </span>
              </div>
              <span className="h-fit inline-flex items-center rounded-md bg-blue-50 px-2 py-2 text-xs font-bold text-blue-700 ring-1 ring-inset ring-blue-700/10">
                {details.specialization}
              </span>
            </div>
            <h3 className="p-2 font-medium ">
              Experience :{" "}
              <span className="text-blue-500 font-bold">
                {" "}
                {details.experience} years{" "}
              </span>
            </h3>

            <h3 className="p-2 font-medium ">
              Qualification :{" "}
              <span className="text-blue-500 font-bold">
                {" "}
                {details.qualification}
              </span>
            </h3>
            <h3 className="p-2 font-medium ">
              Consulting fee :{" "}
              <span className="text-blue-500 font-bold"> {details.fees}</span>
            </h3>

            <div className="flex h-fit my-3">
              <div className="mx-2 flex border-2 items-center px-2 h-fit border-blue-300 rounded">
                <label htmlFor="from" className="w-1/3">
                  Date :
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => {
                    dateHandler(e);
                  }}
                  className="w-2/3 py-1 outline-none focus:outline-none"
                  name="time"
                  id="from"
                />
              </div>
            </div>
            {/* {slot && (
              <p className="mx-2 text-red-500">{slot} slots available</p>
            )} */}
          </div>
        </div>

        <div className="h-60 w-full lg:w-2/5">
          <h3 className="text-blue-500 font-bold my-2">Special Timings</h3>

          {availableTime
          // .filter(time => !bookedTimes.includes(time))
          
          .map((elem) => (
            <button
              key={elem}
              onClick={() => setTime(elem)}
              className="mx-3 my-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
            >
              {elem}
            </button>
          ))}

          <button
            className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            onClick={() => bookHandler(date, time)}
          >
            Book Now
          </button>
        </div>
      </div>
      <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
        <button
          onClick={() => setTab("about")}
          className={`${
            tab === "about" && "border-b border-solid border-primaryColor"
          } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor  font-semibold`}
        >
          About
        </button>

        <button
          onClick={() => setTab("feedback")}
          className={`${
            tab === "feedback" && "border-b border-solid border-primaryColor"
          } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor  font-semibold`}
        >
          Feedback
        </button>
      </div>
      <div className="mt-[50px]">
        {tab === "about" && <DoctorAbout details={details} />}
        {tab === "feedback" && <Feedback details={details} />}
      </div>
    </section>
  );
};

export default DoctorDetails;
