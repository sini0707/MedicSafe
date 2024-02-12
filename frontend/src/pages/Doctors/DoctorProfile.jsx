import React from 'react'

const DoctorProfile = () => {


    const submitHandler = async(e)=>{
      
          e.preventDefault()
        }
  return (
    <section className="p-4 px-5 lg:px-0">
      <div className="faded-blue-div text-center md:text-left w-full max-w-[1000px] mx-auto rounded-lg shadow-md p-5">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold">
          Doctor <span className="text-primaryColor">Profile</span>
        </h3>
      </div>

      <div className="faded-blue-div m-3 md:flex-col w-full max-w-[1000px] mx-auto rounded-lg shadow-md p-5">
        <form onSubmit={submitHandler}
         
          encType="multipart/form-data"
          className="md:flex md:justify-between md:mx-[60px] items-center"
        >
          <div className="px-2 m-2">
            <div className="flex">
              <div className="mb-2 h-40 me-2 bg-blue-300 w-1/2 rounded-lg">
                <img src='' className='w-full h-full rounded-lg' alt="doctor-image" />
              </div>
              <div className="mb-2 ms-2 p-4 w-1/2">
                <div>
                  <label
                    htmlFor="uploadPhoto"
                    className="inline-block text-sm font-medium text-blue-500 dark:text-blue-200"
                  >
                    Upload your Photo
                  </label>
                  <input
                    className="relative py-1 m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-blue-300 bg-clip-padding px-3 py-[0.32rem] text-xs font-normal text-blue-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-blue-100 file:px-3 file:py-[0.32rem] file:text-blue-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-blue-200 focus:border-primary focus:text-blue-700 focus:shadow-te-primary focus:outline-none dark:border-blue-600 dark:text-blue-200 dark:file:bg-blue-700 dark:file:text-blue-100 dark:focus:border-primary"
                    id="uploadPhoto"
                    
                    accept="image/*"
                    type="file"
                  />
                </div>
              </div>
            </div>

            <div className="my-[10px]">
              <label
                className="text-blue-500 text-sm font-medium"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
               
                placeholder="Enter Your Name"
                className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="my-[10px]">
              <label
                className="text-blue-500 text-sm font-medium"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                
                placeholder="Enter Your Email"
                className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="my-[10px]">
              <label
                className="text-blue-500 text-sm font-medium"
                htmlFor="specialization"
              >
                Specialisation
              </label>
              <input
                type="text"
                name="specialisation"
                id="specialization"
               
                
                placeholder="Your Specialization"
                className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="my-[10px]">
              <label
                className="text-blue-500 text-sm font-medium"
                htmlFor="address"
              >
                Address
              </label>
              <textarea
                name="address"
                id="address"
                
                cols="50"
                rows="4"
                placeholder="Enter Your Address"
                className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
              ></textarea>
            </div>
          </div>
          <div className="px-2">
          <div className="mb-3 flex">
              <div className="me-2 w-1/2">
                <label
                  htmlFor="uploadResume"
                  className="mb-2 inline-block text-blue-500 text-sm font-medium dark:text-blue-200"
                >
                  Upload your Resume
                </label>
                <input
                  className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-blue-300 bg-clip-padding px-3 py-[0.32rem] text-xs font-normal text-blue-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-blue-100 file:px-3 file:py-[0.32rem] file:text-blue-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-blue-200 focus:border-primary focus:text-blue-700 focus:shadow-te-primary focus:outline-none dark:border-blue-600 dark:text-blue-200 dark:file:bg-blue-700 dark:file:text-blue-100 dark:focus:border-primary"
                  id="uploadResume"
                  accept="application/pdf"
                
                  type="file"
                />
                <p className="text-blue-500 text-xs font-bold mt-1">
                  Only pdf files are accepted**
                </p>
              </div>
              <div className="ms-2 w-1/2">
                <label
                  className="text-blue-500 text-sm font-medium"
                  htmlFor="fees"
                >
                  Fees
                </label>
                <input
                  type="number"
                  name="fees"
                  id="fees"
                 
                  placeholder="Enter Your Fees"
                  className="block mt-1 px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="my-[20px]">
              <div>
                <label
                  className="text-sm text-blue-500 font-medium"
                  htmlFor="qualification"
                >
                  Qualification
                </label>
                <textarea
                  name="qualification"
                  className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
                  id="qualification"
                 
                  placeholder="Qualification"
                  cols="30"
                  rows="2"
                ></textarea>
              </div>
            </div>
            <div className="my-[20px]">
              <div>
                <label
                  className="text-sm text-blue-500 font-medium"
                  htmlFor="experience"
                >
                  Experience
                </label>
                <textarea
                  name="experience"
                  className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
              
                 
                  placeholder="Experience"
                  cols="30"
                  rows="2"
                ></textarea>
              </div>
              <div className="my-[20px]">
                <label
                  className="text-blue-500 text-sm font-medium"
                  htmlFor="Password"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="Password"
                 
                  placeholder="Enter Your Password"
                  className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="my-[20px]">
                <label
                  className="text-blue-500 text-sm font-medium"
                  htmlFor="Confirm Password"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="Confirm Password"
                  
                  placeholder="Confirm Password"
                  className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
        <div className="text-center">
          <p className="text-blue-500 font-bold my-2">
            **Approval is done by the admin team only after proper verification
          </p>
        </div>
      </div>
    </section>
  )
}

export default DoctorProfile
