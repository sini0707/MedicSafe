import MouseImageTrail from "../../components/Slider/MouseImageTrail.jsx";
import { useState, useEffect } from "react";
import { baseURL } from "../../../../backend/config/db";
import { doctoken } from "../../../config";

const DoctorsHome = () => {

  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [booking, setBookings] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`${baseURL}/doctors/userlist`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${doctoken}`,
          },
        });

        const result = await res.json();
        setUsers(result.userData);
      } catch (error) {
        console.log(error, "error");
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchAllDoctors = async () => {
      try {
        const res = await fetch(`${baseURL}/doctors/doctordata`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${doctoken}`,
          },
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message);
        } else {
          setDoctors(result.doctorsData);
        }
      } catch (error) {
        console.log(error, "error");
      }
    };

    fetchAllDoctors();
  }, []);

  useEffect(() => {
    const totalBookings = async () => {
      try {
        const res = await fetch(`${baseURL}/doctors/getBooking`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${doctoken}`,
          },
        });

        const result = await res.json();

        setBookings(result.data);

        const total = result.data.reduce(
          (acc, booking) => acc + Number(booking.ticketPrice),
          0
        );
       
        setTotalAmount(total);
      } catch (error) {
        console.log(error, "error");
      }
    };
    totalBookings();
  }, []);

 

  return (
    <>
      <MouseImageTrail />
      
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
              <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-6 h-6 text-white"
                  >
                    <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                    <path
                      fillRule="evenodd"
                      d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                      clipRule="evenodd"
                    />
                    <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
                  </svg>
                </div>
                <div className="p-4 text-right">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                    Total Booking
                  </p>
                  <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                    <span className="text-blue-700">
                      {booking && booking.length}
                    </span>
                  </h4>
                </div>
                <div className="border-t border-blue-gray-50 p-4"></div>
              </div>
              <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-6 h-6 text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="p-4 text-right">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                    Users
                  </p>
                  <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                    <span className="text-blue-700">
                      {users && users.length}
                    </span>
                  </h4>
                </div>
                <div className="border-t border-blue-gray-50 p-4"></div>
              </div>
              <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-6 h-6 text-white"
                  >
                    <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
                  </svg>
                </div>
                <div className="p-4 text-right">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                    Doctors
                  </p>
                  <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                    <span className="text-blue-700">
                      {doctors && doctors.length}
                    </span>
                  </h4>
                </div>
                <div className="border-t border-blue-gray-50 p-4"></div>
              </div>
              <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-6 h-6 text-white"
                  >
                    <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
                  </svg>
                </div>
                <div className="p-4 text-right">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                    Total amount
                  </p>
                  <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                    <span className="text-blue-700">₹{totalAmount}</span>
                  </h4>
                </div>
                <div className="border-t border-blue-gray-50 p-4"></div>
              </div>
            </div>

      <div className="flex flex-col md:flex-row w-full pb-5 mb-5 justify-evenly">
        <div className="mx-5 md:w-1/2 my-3 md:my-0 bg-blue-400 rounded-lg p-5 text-center text-white">
          <h2 className="font-bold text-xl font-sans mb-2 underline">
            ONLINE PAYMENTS
          </h2>
          <p>
            Online appointment scheduling platforms integrate with payment
            systems, streamlining appointment booking and payment. This eases
            administrative tasks for doctors' offices by eliminating separate
            payment processing, enhancing efficiency, and providing a seamless
            patient experience.
          </p>
        </div>
        <div className="mx-5 md:w-1/2 my-3 md:my-0 bg-blue-400 rounded-lg p-5 text-center text-white">
          <h2 className="font-bold text-xl font-sans mb-2 underline">
            CONTACTLESS BOOKING
          </h2>
          <p>
            {" "}
            Contactless bookings eliminate the need for manual appointment
            scheduling and record-keeping. Doctors and their staff no longer
            need to spend time answering phone calls, checking appointment
            books, or manually entering patient data into their systems. This
            reduces the administrative burden on the doctor's side.
          </p>
        </div>
      </div>

    

      <div className="flex w-full md:my-24 md:h-72 bg-blue-200">
        <div className="mx-5 my-5 pt-5 w-7/12 italic">
          <h1 className="text-4xl md:text-4xl text-center font-sans font-bold text-gray-700">
            "THE PRESENCE OF THE
          </h1>
          <h1 className="text-4xl md:text-4xl text-center font-sans font-bold text-gray-700">
            DOCTOR IS THE
          </h1>
          <h1 className="text-4xl md:text-4xl text-center font-sans font-bold text-gray-700">
            BEGINNING OF THE
          </h1>
          <h1 className="text-4xl md:text-6xl text-center font-sans font-bold text-blue-500">
            CURE"
          </h1>
        </div>
        <div className="w-5/12">
          <img
            className="h-full w-full"
            src="https://img.freepik.com/free-vector/medical-video-call-consultation-illustration_88138-415.jpg?w=740&t=st=1696157429~exp=1696158029~hmac=2851ca3d0e40bc1b77016443ee4fd8f79431473c4585cce45cf0e3011d8734e4"
            alt="image"
          />
        </div>
      </div>
      
    </>
  );
};

export default DoctorsHome;
