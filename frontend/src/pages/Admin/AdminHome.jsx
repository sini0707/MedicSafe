import Chart from "chart.js/auto";
import { useState, useEffect } from "react";
import { adminToken } from "../../../config";
import { baseURL } from "../../../../backend/config/db";

const AdminHome = () => {
  const [chartBar, setChartBar] = useState();
  const [users, setUsers] = useState([]);

  const [doctors, setDoctors] = useState([]);

  const [booking, setBookings] = useState([]);

   const [chartPie, setChartPie] = useState();
  const [yearlyBookings, setYearlyBookings] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`${baseURL}/admin/userlist`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${adminToken}`,
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
        const res = await fetch(`${baseURL}/admin/doctordata`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${adminToken}`,
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
        const res = await fetch(`${baseURL}/admin/getBooking`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });

        const result = await res.json();

        setBookings(result.data);
      } catch (error) {
        console.log(error, "error");
      }
    };
    totalBookings();
  }, []);

  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        const response = await fetch(`${baseURL}/admin/MonthlyBooking`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });
        const result = await response.json();
        const data = result.data;

        const sortedData = data.sort((a, b) => a._id - b._id);

        const labelsBarChart = sortedData.map((item) => {
          const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
          ];
          return monthNames[item._id - 1];
        });

        const backgroundColors = ["hsl(252, 82.9%, 67.8%)"];
        const dataBarChart = {
          labels: labelsBarChart,
          datasets: [
            {
              label: "Total Bookings",
              backgroundColor: backgroundColors,
              borderColor: backgroundColors,
              data: sortedData.map((item) => item.totalBookings),
            },
            {
              label: "Total Amount",
              backgroundColor: backgroundColors,
              borderColor: backgroundColors,
              data: sortedData.map((item) => item.totalAmount),
            },
          ],
        };

        const configBarChart = {
          type: "bar",
          data: dataBarChart,
          options: {
            scales: {
              x: {
                reverse: false,
              },
            },
          },
        };

        const ctx = document.getElementById("chartBar");
        if (ctx) {
          if (chartBar) {
            chartBar.data = dataBarChart;
            chartBar.update();
          } else {
            const newChartBar = new Chart(ctx, configBarChart);
            setChartBar(newChartBar);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMonthlyData();

    return () => {
      if (chartBar) {
        chartBar.destroy();
      }
    };
  }, [chartBar, adminToken, baseURL]);

  useEffect(() => {
    const totalBookings = async () => {
      try {
        
        const res = await fetch(`${baseURL}/admin/getBooking`, {
          method: "get",
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });
      
        const result = await res.json();

        setBookings(result.data);
      } catch (error) {
        console.log(error, "error");
      }
    };

    totalBookings();
  }, [baseURL, adminToken]);

  useEffect(() => {
    const fetchYearlyData = async () => {
      try {
        const response = await fetch(`${baseURL}/admin/YearlyBooking`, {
          method: "get",
          headers: {
            Authorization: `Bearer ${adminToken}`,
            "Content-Type": "application/json",
          },
        });
      

        const result = await response.json();
        setYearlyBookings(result.data);
      
      } catch (error) {
        console.error("Error fetching yearly data:", error);
      }
    };

    fetchYearlyData();
  }, []);

  useEffect(() => {
    if (!yearlyBookings.length) {
      return;
    }
    
     // Filter out any null or undefined values
  const filteredYearlyBookings = yearlyBookings.filter(item => item._id != null && item.totalBookings != null);

  console.log(filteredYearlyBookings,"filtered year")
    

    if (chartPie) {
      chartPie.destroy();
    }
    

    const ctx = document.getElementById("chartPie");
    const newChartPie = new Chart(ctx, {
      type: "pie",
      data: {
        labels: filteredYearlyBookings.map((item) => item._id),
        datasets: [
          {
            label: "Yearly Bookings",
            data: filteredYearlyBookings.map((item) => item.totalBookings),
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(153, 102, 255)",
            ],
          },
        ],
      },
    });
    setChartPie(newChartPie);

    return () => {
      if (newChartPie) {
        newChartPie.destroy();
      }
    };
  }, [yearlyBookings]);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="p-4 xl:ml-80">
        <nav className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
          <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
            <div className="capitalize">
              <nav aria-label="breadcrumb" className="w-max">
                <ol className="flex flex-wrap items-center w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all">
                  <li className="flex items-center text-blue-gray-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                    <a href="#">
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100">
                        dashboard
                      </p>
                    </a>
                    <span className="text-gray-500 text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none">
                      /
                    </span>
                  </li>
                  <li className="flex items-center text-blue-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-blue-500">
                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                      home
                    </p>
                  </li>
                </ol>
              </nav>
              <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-gray-900">
                home
              </h6>
            </div>
          </div>
        </nav>
        <div className="mt-12">
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
                <h2 className="text-2xl text-blue-700 font-bold">
                  Total Users
                </h2>
                <h4 className="my-5 text-xl font-bold">
                  Count :{" "}
                  <span className="text-blue-700">{users && users.length}</span>
                </h4>
              </div>
              <div className="border-t border-blue-gray-50 p-4">
                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600"></p>
              </div>
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
                <h2 className="text-2xl text-blue-700 font-bold">
                  Total Doctors
                </h2>
                <div className="md:flex md:justify-evenly my-5 text-xl font-bold">
                  <h4>
                    Count :
                    <span className="text-blue-700">
                      {doctors && doctors.length}
                    </span>
                  </h4>
                </div>
              </div>
              <div className="border-t border-blue-gray-50 p-4">
                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600"></p>
              </div>
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
                <h2 className="text-2xl text-blue-700 font-bold">
                  Total Bookings
                </h2>
                <h4 className="my-5 text-xl font-bold">
                  Count :{" "}
                  <span className="text-blue-700">
                    {booking && booking.length}
                  </span>
                </h4>
              </div>

              <div className="border-t border-blue-gray-50 p-4">
                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600"></p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-blue-gray-400">
          {/* Bar Chart */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <canvas id="chartBar"></canvas>
          </div>
        </div>
        <div className="text-blue-gray-600">
          {/* Pie Chart */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <canvas
              id="chartPie"
              style={{ maxWidth: "400px", margin: "0 auto" }}
            ></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
