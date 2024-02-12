
import { useEffect, useState } from 'react'

import uploadImageCloudinary from "../../../../backend/utils/uploadCloudinary";
import { useNavigate} from 'react-router-dom';

import {toast} from 'react-toastify'
 import {HashLoader} from 'react-spinners/HashLoader'
import { baseURL } from "../../../../backend/config/db"

const Profile = (user) => {

  const [selectedFile,setSelectedFile]=useState(null)
  
  const [loading,setLoading]=useState(false)
  const [formData,setFormData]=useState({
    name:'',
    email:'',
    password:"",
    confirmpassword:"",
    mobile:"",
    age:"",
    bloodType:"",  
    photo:"null",
    emerPerson:"",
    emerNumber:"",
    gender:"",
    
  });
console.log(baseURL,'baseurl');
  console.log(formData,"formData");

  const navigate=useNavigate();
  useEffect(()=>{
    setFormData({name:user.name,email:user.email,photo:user.photo,gender:user.gender,bloodType:user.bloodType});

  },[user]);


  const handleInputChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  };
  const handleFileInputChange=async (event)=>{
    const file=event.target.files[0];

    const data=await uploadImageCloudinary(file)
   
    setSelectedFile(data.url);
    setFormData({...formData,photo:data.url});

 }
  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/users/${user._id}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json', // Fix here
        },
        body:JSON.stringify(formData)
           // Convert the data to JSON
      });

      console.log(res,"resssss");
  
      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message);
      }
  
      setLoading(false);
      toast.success('Registration successful');
      // navigate('/login');
    } catch (err) {
      console.log(err)
      toast.error(err.message);
      setLoading(false);
    }
  };
  
  return (
    <div>
     <form onSubmit={submitHandler}>
          <div className="mb-5">
            <input type="text" placeholder="Full Name" name="name" value={formData.name} onChange={(e)=>handleInputChange(e)}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
            placeholder:text-textColor  cursor-pointer required"/>
          </div>
          <div className="mb-5">
            <input type="email" placeholder="Enter your email" name="email" value={formData.email} onChange={(e)=>handleInputChange(e)}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
            placeholder:text-textColor  cursor-pointer required"/>
          </div>
          <div className="mb-5">
            <input type="password" placeholder="password" name="password" value={formData.password} onChange={(e)=>handleInputChange(e)} 
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
            placeholder:text-textColor  cursor-pointer required"/>
          </div>
          <div className="mb-5">
            <input type="confirmpassword" placeholder="confirmpassword" name="confirmpassword" value={formData.confirmpassword} onChange={(e)=>handleInputChange(e)} 
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
            placeholder:text-textColor  cursor-pointer required"/>
          </div>
          <div className="mb-5">
            <input type="number" placeholder="your mobile" name="contact" value={formData.mobile} onChange={(e)=>handleInputChange(e)} 
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
            placeholder:text-textColor  cursor-pointer required"/>
          </div>
          <div className="mb-5">
            <input type="numberd" placeholder="age" name="age" value={formData.age} onChange={(e)=>handleInputChange(e)} 
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
            placeholder:text-textColor  cursor-pointer required"/>
          </div>
          <div className="mb-5">
            <input type="text" placeholder="Blood Type" name="bloodType" value={formData.bloodType} onChange={(e)=>handleInputChange(e)} 
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
            placeholder:text-textColor  cursor-pointer required"/>
          </div>
          <div className="mb-5">
            <input type="text" placeholder="emergency person" name="emergency" value={formData.emerPerson} onChange={(e)=>handleInputChange(e)} 
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
            placeholder:text-textColor  cursor-pointer required"/>
          </div>
          <div className="mb-5">
            <input type="number" placeholder="emergency contact" name="mobile" value={formData.emerNumber} onChange={(e)=>handleInputChange(e)} 
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
            placeholder:text-textColor  cursor-pointer required"/>
          </div>
          <div className='mb-5 flex items-center justify-between'>
          
               <label className='text-headingColor font-semibold text-[15px] leading-7'>
                Gender:
                <select name='gender'value={formData.gender} onChange={handleInputChange} className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none'>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>

                </select>

               </label>
          </div>
          <div className='mb-5 flex items-center gap-3'>
            {formData.photo&& (
            <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center'>
              <img
              src={formData.photo} alt="" className='w-full rounded-full'/>

            </figure>)}
            <div className='relative w-[130px] h-[50px]'>
              <input type='file'name='photo'id='customFile' onChange={handleFileInputChange}   accept='.jpg,.png'
              className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'/>
              <label htmlFor='customFile'
              className='absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font semibold rounded-lg truncate cursor-pointer'
              >Upload Photo
                </label>
                </div>

          </div>
          <div className="mt-7">
            <button  disabled={loading && true} type="submit"className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3">
              {loading ? (<HashLoader size={25} color="#ffffff"/>):"Update"}
            </button>

          </div>
          
          </form>
    </div>
  )
}

export default Profile
