import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../../backend/config/db";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import HashLoader from "react-spinners/HashLoader.js";
import { setadminCredentials } from "../../slices/adminSlices/adminAuthSlice.js";
import { adminToken } from "../../../config.js";

const adminLogin = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.adminAuth.adminInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      navigate("/admin/home");
    }
  }, [user, navigate]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${baseURL}/admin/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      const { data } = result;
      if (data.success === false) {
        dispatch(setadminCredentials(data));
        return;
      }
      dispatch(setadminCredentials(data));
      navigate("/admin/home");
      toast.success(result.message);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Hello! <span className="text-primaryColor">Welcome</span>Back ,Admin
        </h3>
        <form className="py-4 md:py-0" onSubmit={(e) => submitHandler(e)}>
          <div className="mb-5">
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={(e) => handleInputChange(e)}
              className="w-full py-3 border-b border-solid border-[#0066ff61] focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                placeholder:text-textColor  cursor-pointer required"
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={(e) => handleInputChange(e)}
              className="w-full py-3 border-b border-solid border-[#0066ff61] focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                placeholder:text-textColor  cursor-pointer required"
            />
          </div>
          <div className="mt-7">
            <button
              type="submit"
              className="w-full bg-primaryColor  text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
            >
              {loading ? <HashLoader size={25} color="#fff" /> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default adminLogin;
