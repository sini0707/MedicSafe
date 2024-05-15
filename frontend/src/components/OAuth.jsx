import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

import {app} from '../firebase';
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice.js";
import { baseURL } from "../../../backend/config/db.js";
import { useNavigate } from "react-router-dom";


export default function OAuth() {
    const dispatch=useDispatch();
    const navigate= useNavigate();

    const handleGoogleClick=async ()=>{
        try{
           const provider =new GoogleAuthProvider();
           const auth=getAuth(app);
           const result =await signInWithPopup(auth,provider)
           const res=await fetch(`${baseURL}/users/google`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                
            },
            body:JSON.stringify({
                name:result.user.displayName,
                email:result.user.email,
                photo:result.user.photoURL,
            }),
           });
           const data= await res.json();
           
           dispatch(setCredentials(data.data));
           navigate("/home");

         } catch(error){
                console.log("could not login with google",error);
            
        }
    }
  return (
    <div className='OAuth'>
        
    <button type='button' onClick={handleGoogleClick} className='w-full bg-yellow-500 text-white rounded-lg px-4 py-3 uppercase hover:opacity-95 mt-4'>
    Continue with Google
  </button>
    </div>  
    
  )
}


// 