// import  { useState } from "react";

// import {toast} from "react-toastify";

// import { formatDate } from "../../utils/formateDate";
// import {AiFillStar} from "react-icons/ai";
// import FeedbackForm from "./FeedbackForm";
// import { useSelector } from "react-redux";
// import { useEffect } from "react";
// import { baseURL } from "../../../../backend/config/db";
// import Modal from "../../components/Modal/Modal";

// const Feedback = ({details}) => {

//   const [reviews, setReview] = useState([]);
//   // const [consultationOccurred, setConsultationOccurred] = useState(false);
//   // const [slotBooked, setSlotBooked] = useState(false); 
  

//  const [showFeedbackForm, setShowFeedbackForm]=useState(false);
//  const [replyText, setReplyText] = useState("");
//   const [selectedReview, setSelectedReview] = useState(null);



//  const [formattedUpdatedAt, setFormattedUpdatedAt] = useState("");
//  const userInfo = useSelector(state => state.auth.userInfo);
//   const userId = userInfo._id;

  
 
 

//  useEffect(() => {
//   if (userInfo && userInfo.updatedAt) {
//     const formattedDate = formatDate(userInfo.updatedAt);
//     setFormattedUpdatedAt(formattedDate);
//   }
// }, [userInfo]);


// useEffect(() => {
//   const fetchReviews = async (req, res) => {
//     try {
//       const res = await fetch(
//         `${baseURL}/users/getallreviews/${details._id}`,
//         {
//           method: "get",
//           headers: {
//             Authorization: `Bearer ${userInfo.token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       const result = await res.json();
//       setReview(result.data);

    
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   fetchReviews();
// }, [ ]);

// reviews.map((el,index)=>{


// })
// const handleFeedbackButtonClick = async(doctorId) => {
  
//    console.log(doctorId,"doctor Id");

//    try {
//     const res = await fetch(
//       `${baseURL}/users/FeedbackCheck/${doctorId}`,
//       {
//         method: "get",
//         headers: {
//           Authorization: `Bearer ${userInfo.token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if(res.ok){
//       setShowFeedbackForm(true);
//     }
//     else{
      
//       toast.error("There is no booking for this doctor.")
//     }

//    } catch (error) {
//     console.log(console.log("error"));
//    }

// };


//   // Function to handle opening the modal and set the selected review
//   const handleReplyButtonClick = (review) => {
//     setSelectedReview(review);
//     setShowFeedbackForm(true);
//   };


//  // Function to handle submitting the reply
//  const handleReplySubmit = async () => {
//   try {
//     // Send the replyText and selectedReview to your backend to submit the reply
//     // Reset the replyText state
//     setReplyText("");
//     // Close the modal
//     setShowFeedbackForm(false);
//   } catch (error) {
//     console.error("Error submitting reply:", error);
//   }
// };






//   return (
//     <div>
//      <div className="mb-[50px]">
//     <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">
//         All reviews ({reviews.length})
//     </h4>
//     {reviews.map((review, index) => (
//         <div key={index} className="flex justify-between gap-10 mb-[30px]">
//             <div className="flex gap-3">
//                 <figure className="w-10 h-10 rounded-full">
//                     <img className="w-full" src={review.user.photo} alt="" />
//                 </figure>
//                 <div>
//                     <h5 className="text-[16px] leading-6 text-primaryColor font-bold">
//                         {review.user.name}
//                     </h5>
//                     {/* <p className="text-[14px] leading-6 text-textColor">
//                     Created At: {review.createdAt}
//                     </p> */}
//                     <p className="text_para mt-3 font-medium text-[15px]">
//                         {review.reviewText}
//                     </p>
//                     <button onClick={() => handleReplyButtonClick(review)}>Reply</button>
//                 </div>
             
//             </div>
//             <div className="flex gap-1">
//                 {[...Array(review.rating).keys()].map((_, index) => (
//                     <AiFillStar key={index} color="#FFAD01" />
//                 ))}
//             </div>
//         </div>
//     ))}
//       {/* Modal for replying to reviews */}
//       <Modal show={showFeedbackForm} onClose={() => setShowFeedbackForm(false)}>
//         <h2>Reply to Review</h2>
//         <textarea
//           value={replyText}
//           onChange={(e) => setReplyText(e.target.value)}
//           rows={4}
//           cols={50}
//           placeholder="Enter your reply"
//         />
//         <button onClick={handleReplySubmit}>Submit Reply</button>
//       </Modal>
// </div>

// {!showFeedbackForm && (
//         <div className="text-center">
//           <button
//             className="btn"
//             onClick={()=>handleFeedbackButtonClick(details._id)}
//           >
//             Give Feedback
//           </button>
//         </div>
//       )}



    
//       {showFeedbackForm && (
//       <FeedbackForm
//       details={details}
//       setShowFeedbackForm={setShowFeedbackForm}
      
//       />)}
//     </div>
//   );
// };

// // export default Feedback;
// import { useState } from "react";
// import { toast } from "react-toastify";
// import { formatDate } from "../../utils/formateDate";
// import { AiFillStar } from "react-icons/ai";
// import FeedbackForm from "./FeedbackForm";
// import { useSelector } from "react-redux";
// import { useEffect } from "react";
// import { baseURL } from "../../../../backend/config/db";
// import Modal from "../../components/Modal/Modal";

// const Feedback = ({ details }) => {
//   const [reviews, setReview] = useState([]);
//   const [showFeedbackForm, setShowFeedbackForm] = useState(false);
//   const [replyText, setReplyText] = useState("");
//   const [selectedReview, setSelectedReview] = useState(null);
//   const [formattedUpdatedAt, setFormattedUpdatedAt] = useState("");
//   const userInfo = useSelector((state) => state.auth.userInfo);
//   const userId = userInfo._id;

//   useEffect(() => {
//     if (userInfo && userInfo.updatedAt) {
//       const formattedDate = formatDate(userInfo.updatedAt);
//       setFormattedUpdatedAt(formattedDate);
//     }
//   }, [userInfo]);

//   useEffect(() => {
//     const fetchReviews = async (req, res) => {
//       try {
//         const res = await fetch(
//           `${baseURL}/users/getallreviews/${details._id}`,
//           {
//             method: "get",
//             headers: {
//               Authorization: `Bearer ${userInfo.token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         const result = await res.json();
//         setReview(result.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchReviews();
//   }, []);

//   const handleFeedbackButtonClick = async (doctorId) => {
//     try {
//       const res = await fetch(
//         `${baseURL}/users/FeedbackCheck/${doctorId}`,
//         {
//           method: "get",
//           headers: {
//             Authorization: `Bearer ${userInfo.token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (res.ok) {
//         setShowFeedbackForm(true);
//       } else {
//         toast.error("There is no booking for this doctor.");
//       }
//     } catch (error) {
//       console.log(console.log("error"));
//     }
//   };

//   // Function to handle opening the modal and set the selected review
//   const handleReplyButtonClick = (review) => {
//     setSelectedReview(review);
//     setShowFeedbackForm(true);
//   };

//   // Function to handle submitting the reply
//   const handleReplySubmit = async () => {
//     try {
//       // Send the replyText and selectedReview to your backend to submit the reply
//       // Reset the replyText state
//       setReplyText("");
//       // Close the modal
//       setShowFeedbackForm(false);
//     } catch (error) {
//       console.error("Error submitting reply:", error);
//     }
//   };

//   return (
//     <div>
//       <div className="mb-[50px]">
//         <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">
//           All reviews ({reviews.length})
//         </h4>
//         {reviews.map((review, index) => (
//           <div key={index} className="flex justify-between gap-10 mb-[30px]">
//             <div className="flex gap-3">
//               <figure className="w-10 h-10 rounded-full">
//                 <img className="w-full" src={review.user.photo} alt="" />
//               </figure>
//               <div>
//                 <h5 className="text-[16px] leading-6 text-primaryColor font-bold">
//                   {review.user.name}
//                 </h5>
//                 <p className="text_para mt-3 font-medium text-[15px]">
//                   {review.reviewText}
//                 </p>
//                 <button onClick={() => handleReplyButtonClick(review)}>
//                   Reply
//                 </button>
//               </div>
//             </div>
//             <div className="flex gap-1">
//               {[...Array(review.rating).keys()].map((_, index) => (
//                 <AiFillStar key={index} color="#FFAD01" />
//               ))}
//             </div>
//           </div>
//         ))}
//         {/* Modal for replying to reviews */}
//         <Modal
//           show={showFeedbackForm}
//           onClose={() => setShowFeedbackForm(false)}
//         >
//           <h2>Reply to Review</h2>
//           <textarea
//             value={replyText}
//             onChange={(e) => setReplyText(e.target.value)}
//             rows={4}
//             cols={50}
//             placeholder="Enter your reply"
//           />
//           <button onClick={handleReplySubmit}>Submit Reply</button>
//         </Modal>
//       </div>

//       {!showFeedbackForm && (
//         <div className="text-center">
//           <button
//             className="btn"
//             onClick={() => handleFeedbackButtonClick(details._id)}
//           >
//             Give Feedback
//           </button>
//         </div>
//       )}

//       {showFeedbackForm && (
//         <FeedbackForm
//           details={details}
//           setShowFeedbackForm={setShowFeedbackForm}
//         />
//       )}
//     </div>
//   );
// };

// export default Feedback;
import { useState } from "react";
import { toast } from "react-toastify";
import { formatDate } from "../../utils/formateDate";
import { AiFillStar } from "react-icons/ai";
import FeedbackForm from "./FeedbackForm";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { baseURL } from "../../../../backend/config/db";
import { doctoken } from "../../../config";

const Feedback = ({ details }) => {
  console.log(details,"details")
  const [reviews, setReview] = useState([]);
  console.log(reviews,"reviews")
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);
  const [formattedUpdatedAt, setFormattedUpdatedAt] = useState("");
  const userInfo = useSelector((state) => state.auth.userInfo);
  
 

  const userId = userInfo._id;

  useEffect(() => {
    if (userInfo && userInfo.updatedAt) {
      const formattedDate = formatDate(userInfo.updatedAt);
      setFormattedUpdatedAt(formattedDate);
    }
  }, [userInfo]);

  useEffect(() => {
    const fetchReviews = async () => {
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
  }, []);

  const handleFeedbackButtonClick = async (doctorId) => {
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

      if (res.ok) {
        setShowFeedbackForm(true);
      } else {
        toast.error("There is no booking for this doctor.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const isDoctor = userInfo && userInfo.role === "doctor";
  
  const handleReplyButtonClick = (review) => {
    
    setSelectedReview(review);
    setShowFeedbackForm(true);
  };


  const handleReplySubmit = async (reviewid) => {
   
    try {

      // if (userInfo.role !== "doctor") {
      //   toast.error("Only doctors can reply to reviews.");
      //   return;
      // }
      
      const response = await fetch(`${baseURL}/doctors/submitreply/${reviewid}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${doctoken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ replyText }),
      });
      console.log("Response from API:", response);
  
      if (response.ok) {
        toast.success("Reply submitted successfully.");
      
      setReplyText("");
      
      setShowFeedbackForm(false);
      
      setSelectedReview(null);
    } else {
      const data = await response.json();
      toast.error(data.message || "Failed to submit reply.");
    }
  }
catch (error) {
      console.error("Error submitting reply:", error);
      toast.error("An error occurred while submitting reply.");
    }
  };

  return (
    <div>
      <div className="mb-[50px]">
        <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">
          All reviews ({reviews.length})
        </h4>
        {/* {reviews.map((review, index) => (
        
          <div key={index} className="flex justify-between gap-10 mb-[30px]">
            <div className="flex gap-3">
              <figure className="w-10 h-10 rounded-full">
                <img className="w-full" src={review.user.photo} alt="" />
              </figure>
              <div>
                <h5 className="text-[16px] leading-6 text-primaryColor font-bold">
                  {review.user.name}
                </h5>
                <p className="text_para mt-3 font-medium text-[15px]">
                  {review.reviewText}
                </p>
                <p className="text_para mt-3 font-medium text-[15px]">
                  {review.replyText}
                </p>
                <button onClick={() => handleReplyButtonClick(review)}>
                  Reply
                </button>
    
              </div>
            </div>
            <div className="flex gap-1">
              {[...Array(review.rating).keys()].map((_, index) => (
                <AiFillStar key={index} color="#FFAD01" />
              ))}
            </div>
          </div>


        ))} */}
        {reviews.map((review, index) => (
  <div key={index} className="flex justify-between items-start gap-10 mb-6">
    <div className="flex items-start gap-3">
    {review.user && review.user.photo && (
        <figure className="w-10 h-10 rounded-full overflow-hidden">
          <img className="w-full h-full object-cover" src={review.user.photo} alt="" />
        </figure>
      )}
      <div>
        <h5 className="text-lg font-semibold text-primaryColor">{review.user ? review.user.name : "Unknown User"}</h5>
        <p className="text-sm text-gray-700 mb-2">{review.reviewText}</p>
        {review.replyText && (
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm font-semibold text-gray-800 mb-1">Reply:</p>
            <p className="text-sm text-gray-700">{review.replyText}</p>
          </div>
        )}
        <button onClick={() => handleReplyButtonClick(review)} className="text-sm text-primaryColor font-semibold mt-2">Reply</button>
      </div>
    </div>
    <div className="flex gap-1">
      {[...Array(review.rating).keys()].map((_, index) => (
        <AiFillStar key={index} color="#FFAD01" />
      ))}
    </div>
  </div>
))}

        {/* Modal for replying to reviews */}
        {selectedReview && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg">
              <h2>Reply to Review</h2>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows={4}
                cols={50}
                placeholder="Enter your reply"
              />
         
              <div className="flex justify-end mt-4">
              <button 
                className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={()=>handleReplySubmit(selectedReview._id)}
              >
                Submit Your Reply
              </button>
              <button 
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={() => {
                  setShowFeedbackForm(false);
                  setSelectedReview(null);
                }}
              >
                Cancel
              </button>
              </div>

            </div>
          </div>
        )}
      </div>

      {!showFeedbackForm && (
        <div className="text-center">
          <button
            className="btn"
            onClick={() => handleFeedbackButtonClick(details._id)}
          >
            Give Feedback
          </button>
        </div>
      )}

      {showFeedbackForm && (
        <FeedbackForm
          details={details}
          setShowFeedbackForm={setShowFeedbackForm}
        />
      )}
    </div>
  );
};

export default Feedback;



