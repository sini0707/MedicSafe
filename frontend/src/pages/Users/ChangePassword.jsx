 import { useState } from "react";
 import apiInstance from "../../axiosApi/axiosInstance";
 import { useNavigate } from "react-router-dom";

import { baseURL } from '../../../../backend/config/db';

const ChangePasswordForm = ({email}) => {
  console.log(email);
  const [currentPassword,setcurrentPassword]=useState('');
  const [newpassword, newSetPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  // const [success, setSuccess] = useState(false);
  // const [error, setError] = useState(null);
  const [loading,setLoading]=useState(false)
  const [passwordChanged, setPasswordChanged] = useState(false); // State to track if password changed

  

  const navigate = useNavigate();
        console.log(email,"email")

  
    const submitHandler = async (e) => {

      e.preventDefault();

      try {
        if (newpassword !== confirmPass) {
          console.log('yes');
          // setError("New password and confirm password must match");

          return;
        }

        setLoading(true); // Set loading state to true when the form is submitted

            const res = await apiInstance.post(`${baseURL}/users/changepassword`, {
              email,
              currentPassword,
              newpassword,
              confirmPass,
             
            });
            setPasswordChanged(true);
          } catch (error) {
            console.log(error);
            // Handle error response
            // setSuccess(false);
            // setError("An error occurred while changing the password. Please try again later.");
          }
        };
      

      
    
  return (

<div className="bg-gray-100 flex items-center justify-center h-screen">
<div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
  <div className="flex items-center space-x-2 mb-6">
    <img
      src="https://unsplash.it/40/40?image=883"
      alt="Lock Icon"
      className="rounded-full"
    />
    <h1 className="text-xl font-semibold">Change Password</h1>
  </div>
  <p className="text-sm text-gray-600 mb-6">
    Update password for enhanced account security.
  </p>
  <form onSubmit={submitHandler} id="changePasswordForm" className="space-y-6">
  <div>
        <label
          htmlFor="currentPassword"
          className="text-sm font-medium text-gray-700 block mb-2"
        >
          Current Password *
        </label>
        <input
    onChange={(e) => {
      setcurrentPassword(e.target.value);
      console.log(e.target.value); // Add console log here
    }}
         
          type="password"
          id="currentPassword"
          className="password-input form-input block w-full border border-gray-300 rounded-md shadow-sm"
          required=""
        />
      </div>
    <div>
      <label
        htmlFor="newPassword"
        className="text-sm font-medium text-gray-700 block mb-2"
      >
        New Password *
      </label>
      <input
    onChange={(e) => {
      newSetPassword(e.target.value);
      console.log(e.target.value); // Add console log here
    }}
        type="password"
        id="newPassword"
        className="password-input form-input block w-full border border-gray-300 rounded-md shadow-sm"
        required=""
      />
    </div>
    <div>
      <label
        htmlFor="confirmPassword"
        className="text-sm font-medium text-gray-700 block mb-2"
      >
        Confirm New Password *
      </label>
      <input
    onChange={(e) => {
      setConfirmPass(e.target.value);
      console.log(e.target.value); // Add console log here
    }}
        type="password"
        id="confirmPassword"
        className="password-input form-input block border w-full border-gray-300 rounded-md shadow-sm"
        required=""
      />
    </div>
    <div className="flex justify-between">
      <button
        type="button"
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-300"
      >
        Discard
      </button>
      <button
        type="submit"
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
      >
        Apply Changes
      </button>
    </div>
  </form>
</div>
</div>
)
}

 export default ChangePasswordForm;
