import React from 'react'

const PaymentBooking = () => {
  return (
    <section className="container">
      <div className="relative mx-5 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-white uppercase bg-gradient-to-r dark:from-cyan-500 dark:to-blue-500 from-indigo-500 via-purple-500 to-pink-500">
            <tr>
              <th scope="col" className="px-6 py-3">
                Doctor
              </th>
              <th scope="col" className="px-6 py-3">
                Patient
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Time
              </th>
              <th scope="col" className="px-6 py-3">
                Payment
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {currentBookings &&
              currentBookings.map((el, index) => (
                <tr
                  className="bg-white border-b hover:bg-[#e8e8ff]"
                  key={index}
                >
                  <td className="px-6 py-4">{el.doctor.name}</td>
                  <td className="px-6 py-4">{el.patient.name}</td>
                  <td className="px-6 py-4">{el.IndianDate}</td>
                  <td className="px-6 py-4">{el.slot}</td>
                  <td className="px-6 py-4">{el.paymentStatus}</td>

                  <td className="px-6 py-4">
                    {el.isCancelled ? (
                      <button
                        // onClick={() => cancelBooking(el._id)}
                        className="bg-orange-500 p-2 text-white rounded-md hover:scale-110 transition duration-100 ease-in-out cursor-pointer "
                      >
                        Cancelled
                      </button>
                    ) : (
                      <button
                        onClick={() => cancelBooking(el._id)}
                        className="bg-red-500 p-2 text-white rounded-md hover:scale-110 transition duration-100 ease-in-out cursor-pointer "
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))} */}
          </tbody>
        </table>
      </div>

      <div className="mt-20">
        {/* <Pagination
          postPerPage={postPerPage}
          totalPosts={bookings.length}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        /> */}
      </div>
    </section>
  )
}

export default PaymentBooking
