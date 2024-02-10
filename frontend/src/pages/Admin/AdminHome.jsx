import React from 'react'

const AdminHome = () => {
  return (
    <section className='container'>
    <div className="md:flex md:justify-between mx-5">
      <div className="md:w-1/3 my-2 mx-4 p-5 text-center rounded-lg border-4 border-blue-500 bg-blue-200">
        <h2 className='text-2xl text-blue-700 font-bold'>Total Users</h2>
        <h4 className='my-5 text-xl font-bold'>Count : <span className='text-blue-700'>{}</span></h4>
      </div>
      <div className="md:w-1/3 my-2 mx-4 p-5 text-center rounded-lg border-4 border-blue-500 bg-blue-200">
        <h2 className='text-2xl text-blue-700 font-bold'>Total Doctors</h2>
        <div className='md:flex md:justify-evenly my-5 text-xl font-bold'>
          <h4>Count :<span className='text-blue-700'>{}</span></h4>
          <h4>Approved :<span className='text-blue-700'>{}</span></h4>
        </div>
      </div>
      <div className="md:w-1/3 my-2 mx-4 p-5 text-center rounded-lg border-4 border-blue-500 bg-blue-200">
        <h2 className='text-2xl text-blue-700 font-bold'>Total Bookings</h2>
        <h4 className='my-5 text-xl font-bold'>Count : <span className='text-blue-700'>{}</span></h4>
      </div>
    </div>
    <div className='md:flex p-5 m-5 md:h-1/2 md:justify-between'>
      {/* <div className="md:w-2/3 md:p-5">
        <Line
          data={data}
          options={options}
        />
      </div>
      <div className="md:w-1/3 p-5">
      <Pie data={pieData} options={pieOptions} />
      </div> */}
    </div>
  </section>
  )
}

export default AdminHome
