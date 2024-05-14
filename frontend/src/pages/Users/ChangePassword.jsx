import { useState } from "react";
import apiInstance from "../../axiosApi/axiosInstance";
import { useNavigate } from "react-router-dom";

import { baseURL } from "../../../../backend/config/db";
import { token } from "../../../config";
import { toast } from 'react-toastify';

const ChangePasswordForm = ({ email }) => {
  const [currentPassword, setcurrentPassword] = useState("");
  const [newpassword, newSetPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [loading, setLoading] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {

      if (!currentPassword || !newpassword || !confirmPass) {
        toast.error("Please fill in all fields.");
        return;
      }
      if (newpassword !== confirmPass) {
        toast.error("New password and confirm password do not match.");
        return;
      }

      setLoading(true);

      const res = await apiInstance.post(`${baseURL}/users/changepassword`, {
        email,
        currentPassword,
        newpassword,
        confirmPass,
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    setPasswordChanged(true);
    toast.success("Password changed successfully"); 
      window.location.reload();
    } catch (error) {
      console.log(error);
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
              htmlFor="currentPassword"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              Current Password *
            </label>
            <input
              onChange={(e) => {
                setcurrentPassword(e.target.value);
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
  );
};

export default ChangePasswordForm;
