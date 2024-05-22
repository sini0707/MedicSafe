import { useState } from "react";
import { baseURL } from "../../../../backend/config/db";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';

export const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state.email;
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (password === "" || confirmPass === "") {
        toast.error("Please enter both new password and confirm password");
        return;
      }
  
      // Check if password and confirm password match
      if (password !== confirmPass) {
        toast.error("New password and confirm password do not match");
        return;
      }
  
     
      const response = await fetch(`${baseURL}/users/reset-password`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
      });

      if (response.status !== 200) {
        throw new Error("Failed to verify");
      }

      navigate("/home");
    } catch (err) {
      console.error("Error:", err.message);
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
        <form
          onSubmit={submitHandler}
          id="changePasswordForm"
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="newPassword"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              New Password *
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
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
              onChange={(e) => setConfirmPass(e.target.value)}
              type="password"
              id="confirmPassword"
              className="password-input form-input block border w-full border-gray-300 rounded-md shadow-sm"
              required=""
            />
          </div>
          <div className="flex justify-between">
           
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
  );
};
