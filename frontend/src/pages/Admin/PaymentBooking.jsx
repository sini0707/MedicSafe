import { useEffect, useState } from "react";
import Pagination from "../../components/pagination/Pagination";
import { baseURL } from "../../../../backend/config/db";
import { adminToken } from "../../../config";
import { toast } from "react-toastify";

const PaymentBooking = () => {
  const [bookings, setBookings] = useState([]);
 
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);



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
        result.data.forEach(booking => {
        
        });
  
      } catch (error) {
        console.log(error, "error");
      }
    };
    totalBookings();
  }, []);


  const cancelBooking = async (id) => {
    try {
      const res = await fetch(`${baseURL}/admin/cancelBooking/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({ status: "Rejected" }),
      });
      const result = await res.json();
  
      if (!res.ok) {
        throw new Error(result.message);
      }
  
     
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === id ? { ...booking, isCancelled: true, status: "Rejected" } : booking
        )
      );
      toast.success("Booking successfully cancelled");
    } catch (error) {
      console.log(error);
      toast.error("Failed to cancel booking");
    }
  };
  const handleCancel = async (id, event) => {
    event.preventDefault(); 
    await cancelBooking(id);
  };
  
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentBookings = bookings.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="md:px-32 py-8 w-full">
      <div className="shadow overflow-hidden rounded border-b border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">
                Doctor
              </th>
              <th className="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">
                Patient
              </th>
              <th className="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">
                Date
              </th>
              <th className="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">
                Time
              </th>
              <th className="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">
                Ticket Price
              </th>
              <th className="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">
                Payment
              </th>
              
              
            </tr>
          </thead>
          <tbody className="text-gray-700">
          {currentBookings.map((booking, index) => {
           
              
              const userName = booking.user && booking.user.name ? booking.user.name : "Unknown User";

  
  const doctorName = booking.doctor && booking.doctor.name ? booking.doctor.name : "Unknown Doctor";


              return (
                <tr className="bg-white border-b hover:bg-[#e8e8ff]" key={index}>
                  <td className="px-6 py-4">{doctorName}</td>
                  <td className="px-6 py-4">{userName}</td>
                  <td className="px-6 py-4">{booking.slotDate}</td>
                  <td className="px-6 py-4">{booking.slotTime}</td>
                  <td className="px-6 py-4">{booking.ticketPrice}</td>
                  <td className="px-6 py-4">{booking.isPaid ? 'Paid' : 'Not Paid'}</td>
                 
                  
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-20">
        <Pagination
          postPerPage={postPerPage}
          totalPosts={bookings.length}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default PaymentBooking;
