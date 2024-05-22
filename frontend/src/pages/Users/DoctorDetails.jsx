import { useState, useEffect } from "react";
import starIcon from "../../../src/assets/images/Star.png";
import moment from "moment-timezone";
import { useNavigate, useParams } from "react-router-dom";
import apiInstance from "../../axiosApi/axiosInstance";
import { baseURL } from "../../../../backend/config/db";
import { toast } from "react-toastify";
import { token } from "../../../config";
import { useSelector } from "react-redux";
import DoctorAbout from "../Doctors/DoctorAbout.jsx";
import Feedback from "../Doctors/Feedback.jsx";
import "react-datepicker/dist/react-datepicker.css";
import formatDateToUTC from "../../utils/inputDateConvert";
import ChatUser from "../../components/chat/ChatUser.jsx";
import { FaCommentDots } from "react-icons/fa6";

const DoctorDetails = () => {
  const [tab, setTab] = useState("about");
  const [details, setDetails] = useState({});

  const [available, setAvailable] = useState([]);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [availableTime, setAvailableTime] = useState([]);
  const [slotBooked, setSlotBooked] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [bookedSlots, setBookedSlots] = useState([]);

  let { id } = useParams();
  const doctorId = id;

  const userInfo = useSelector((state) => state.auth.userInfo);
  const userId = userInfo._id;

  const navigate = useNavigate();

  const fetchDoctor = async () => {
    try {
      const res = await apiInstance.get(
        `${baseURL}/doctors/getdoctor/${doctorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDetails(res.data.data);
      setAvailable(res.data.data.available);
    } catch (error) {
      console.error("Error fetching doctor details:", error);
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, []);

  const fetchUserBookings = async () => {
    try {
      const res = await apiInstance.get(`${baseURL}/users/bookings/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userBookedSlots = res.data.bookings.map((booking) => ({
        date: booking.slotDate,
        time: booking.slotTime,
      }));
      setBookedSlots(userBookedSlots);
    } catch (error) {
      console.error("Error fetching user bookings:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserBookings();
    }
  }, [userId]);

  const bookHandler = async (date, time) => {
    if (!date || !time) {
      toast.error("Please select both date and time");
      return;
    }

    const indianDate = moment(date).tz("Asia/Kolkata").format("DD/MM/YYYY");
    const indianTime = moment
      .tz(time, "HH:mm", "Asia/Kolkata")
      .format("hh:mm A");

    try {
      const isAlreadyBooked = bookedSlots.some(
        (slot) => slot.date === indianDate && slot.time === indianTime
      );

      if (isAlreadyBooked) {
        toast.error("This slot is already booked. Please select another slot.");
        return;
      }
      const res = await apiInstance.post(
        `${baseURL}/users/checkout-session/${details._id}/${userId}`,
        {
          date: indianDate,
          time: indianTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

    //Date converter
    function formatDateToIndian(dateString) {
      const date = new Date(dateString); // Convert string to Date object
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      const indianDate = date.toLocaleDateString("en-IN", options);
      return indianDate;
    }

    let selectedDate = e.target.value;

    let formattedDate = formatDateToUTC(selectedDate);

    let availavleTimings = available.filter(
      (item) => item.date === formattedDate
    );

    let bookedTimings = bookedSlots.filter(
      (item) => item.date === formattedDate
    );
    console.log(bookedTimings, "booked timings");
    const timings = availavleTimings.map((elem) => {
      return elem.fromTime;
    });

    setAvailableTime(timings);

    setDate(selectedDate);
    setTime("");
  };

  const handleTime = (selectedTime) => {
    if (console.log(bookedSlots, "booked slots")) {
      toast.error("This time slot is already booked by you");
      return;
    }

    setTime(selectedTime);
  };
  const formattedRating =
    details && details.averageRating ? details.averageRating.toFixed(1) : "";

  const chatHandler = async () => {
    setIsChatOpen(true);

    try {
      const res = await fetch(
        `${baseURL}/users/createRoom/${details._id}/${userId}`,

        {
          method: "post",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const isSlotBooked = (timeSlot) => {
    return bookedSlots.some((slot) => slot.time === timeSlot);
  };

  const filteredAvailableTime = availableTime.filter(
    (timeSlot) => !isSlotBooked(timeSlot)
  );

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
            </div>

            <h3 className="p-2 font-medium ">
              Specialization :{" "}
              <span className="text-blue-500 font-bold">
                {" "}
                {details.specialization}
              </span>
            </h3>
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
          </div>
        </div>

        <div className="h-60 w-full lg:w-2/5">
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

          {filteredAvailableTime.map((timeSlot) => (
            <button
              key={timeSlot}
              onClick={() => handleTime(timeSlot)}
              className={`${
                timeSlot === time && "bg-blue-500 text-white"
              } mx-3 my-2 px-4 py-2 bg-green-500 hover:bg-green-300 text-black-500 font-bold rounded`}
            >
              {timeSlot}
            </button>
          ))}

          {availableTime.length > 0 && (
            <button
              className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              onClick={() => bookHandler(date, time)}
              disabled={
                !time ||
                bookedSlots.some(
                  (slot) => slot.date === date && slot.time === time
                )
              }
            >
              Book Now
            </button>
          )}
        </div>
      </div>

      <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
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

      <div className="fixed bottom-10 right-6">
        <button
          onClick={() => chatHandler()}
          className="bg-blue-500 text-white p-4 rounded-full shadow-lg focus:outline-none"
        >
          <FaCommentDots size={24} />
        </button>
      </div>

      {isChatOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setIsChatOpen(false)}
          ></div>

          <div className="fixed bottom-0 right-[100px] w-96">
            <ChatUser
              doctor={details._id}
              user={userId}
              photo={userInfo.photo}
              doctorPic={details.photo}
              userName={userInfo.name}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default DoctorDetails;
