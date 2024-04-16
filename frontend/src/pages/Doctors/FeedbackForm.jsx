import { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import { useSelector } from "react-redux";
import useFetchData from "../../hooks/useFetchData";
import { toast } from "react-toastify";

import { baseURL } from "../../../../backend/config/db";

const FeedbackForm = ({ details, setshowFeedbackForm }) => {
  const [rating, setRating] = useState(0);

  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
 

  const userInfo = useSelector((state) => state.auth.userInfo);

  const userId = userInfo._id;
  const token = userInfo.token;

  const reviewData = {
    rating,
    reviewText,
    user: userId,
    doctor: details._id,
  };
  

  
  const {
    fetchData,
    data: reviews,
    refetch,
  } = useFetchData(`${baseURL}/users/getallreviews`);

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${baseURL}/users/createreviews`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ review: reviewData }),
      });

      if (res.ok) {
        toast.success("Feedback submitted successfully");

        
        fetchData();

        
        setRating(0);
        setReviewText("");
      } else {
      
        toast.error("Failed to submit feedback");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("An error occurred while submitting feedback");
    }
  };

  

  return (
    
    <form action="">
      <div>
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
          How would you rate the overall experience?*
        </h3>
        <div>
          {[...Array(5).keys()].map((_, index) => {
            index += 1;
            return (
              <button
                key={index}
                type="button"
                className={`${
                  index <= ((rating && hover) || hover)
                    ? "text-yellowColor"
                    : "text-gray-400"
                } bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
                onDoubleClick={() => {
                  setHover(0);
                  setRating(0);
                }}
              >
                <span>
                  <AiFillStar />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-[30px]">
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
          Share your feedback or suggestions*
        </h3>
        <textarea
          className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
          rows="5"
         
          placeholder="write your message"
          onChange={(e) => setReviewText(e.target.value)}
        />
      </div>
      <button type="submit" onClick={handleSubmitReview} className="btn">
        Submit Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;
