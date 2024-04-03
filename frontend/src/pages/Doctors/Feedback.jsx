import  { useState } from "react";
// import moment from "moment-timezone";
import {toast} from "react-toastify";

import { formatDate } from "../../utils/formateDate";
import {AiFillStar} from "react-icons/ai";
import FeedbackForm from "./FeedbackForm";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { baseURL } from "../../../../backend/config/db";

const Feedback = ({details}) => {

  const [reviews, setReview] = useState([]);
  const [consultationOccurred, setConsultationOccurred] = useState(false);
  const [slotBooked, setSlotBooked] = useState(false); 
  

 const [showFeedbackForm, setShowFeedbackForm]=useState(false);




 const [formattedUpdatedAt, setFormattedUpdatedAt] = useState("");
 const userInfo = useSelector(state => state.auth.userInfo);
  const userId = userInfo._id;

  
 
 

 useEffect(() => {
  if (userInfo && userInfo.updatedAt) {
    const formattedDate = formatDate(userInfo.updatedAt);
    setFormattedUpdatedAt(formattedDate);
  }
}, [userInfo]);


useEffect(() => {
  const fetchReviews = async (req, res) => {
    try {
      const res = await fetch(
        `${baseURL}/users/getallreviews/${details._id}`,
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const result = await res.json();
      setReview(result.data);

    
    } catch (error) {
      console.log(error);
    }
  };
  fetchReviews();
}, [ ]);

reviews.map((el,index)=>{


})
const handleFeedbackButtonClick = async(doctorId) => {
  
   console.log(doctorId,"doctor Id");

   try {
    const res = await fetch(
      `${baseURL}/users/FeedbackCheck/${doctorId}`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if(res.ok){
      setShowFeedbackForm(true);
    }
    else{
      // console.log("there is no booking")
      toast.error("there is no booking")
    }

   } catch (error) {
    console.log(console.log("error"));
   }

};

// const checkConsultationOccurred = () => {
//   console.log(details,"checkkkk")
//   const consultationOccurred =
//   details?.date && moment(details.date).isBefore(moment());
// const appointmentNotCancelled = !details?.isCancelled;
// return consultationOccurred && appointmentNotCancelled;

 


// };




  return (
    <div>
     <div className="mb-[50px]">
    <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">
        All reviews ({reviews.length})
    </h4>
    {reviews.map((review, index) => (
        <div key={index} className="flex justify-between gap-10 mb-[30px]">
            <div className="flex gap-3">
                <figure className="w-10 h-10 rounded-full">
                    <img className="w-full" src={review.user.photo} alt="" />
                </figure>
                <div>
                    <h5 className="text-[16px] leading-6 text-primaryColor font-bold">
                        {review.user.name}
                    </h5>
                    <p className="text-[14px] leading-6 text-textColor">
                    Created At: {review.createdAt}
                    </p>
                    <p className="text_para mt-3 font-medium text-[15px]">
                        {review.reviewText}
                    </p>
                </div>
            </div>
            <div className="flex gap-1">
                {[...Array(review.rating).keys()].map((_, index) => (
                    <AiFillStar key={index} color="#FFAD01" />
                ))}
            </div>
        </div>
    ))}
</div>

{!showFeedbackForm && (
        <div className="text-center">
          <button
            className="btn"
            onClick={()=>handleFeedbackButtonClick(details._id)}
          >
            Give Feedback
          </button>
        </div>
      )}



    
      {showFeedbackForm && (
      <FeedbackForm
      details={details}
      setShowFeedbackForm={setShowFeedbackForm}
      
      />)}
    </div>
  );
};

export default Feedback;
