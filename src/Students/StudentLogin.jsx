import React, {useEffect, useState} from 'react'
import './StudentLoginRegister.css'
import { Link, useNavigate } from "react-router-dom";
import {auth, db} from '../firebaseConfig/Firebase';
import { getDatabase, ref, set } from "firebase/database";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'

import {  toast } from 'react-toastify';
import Navbar2 from '../Navbar2';

const StudentLogin = () => {

  const [stddata, setStddata]=useState({
  email:"",
  password:"",
});
const navigate=useNavigate();

const handlechange=(e)=>{
const {name, value}= e.target;
setStddata((prevdata)=>({...prevdata,[name]:value}));
}
const handleLogin=(e)=>{
e.preventDefault();

signInWithEmailAndPassword(auth, stddata.email, stddata.password).then((userCredentials)=>{

   toast.success("User Logged in Successfully!");
navigate('/stdmain')
 stddata({
    email:"",
  password:"",
 })
  setTimeout(()=>{
 navigate('/stdmain')
  },4000)
}).catch((error)=>{

if(stddata.email=="" || stddata.password==""){
   toast.error("Please Fill The Required Fields!");

}
// if(email!==user.Email || password!==user.Password){
//      toast.error("Wrong Credentials!");
// }

  // if(error.message==="Firebase: Error (auth/invalid-credential)"){
  //  toast.error("Wrong Credentials!");
  // }

})



}

  return (
  <>

   <div className='image-banner'>
       <div className='image-banner-text'>
        <h1>Welcome to Campus Recuirtement!</h1>
       </div>
    </div>

<Navbar2/>
   <div className='login-container'>
    <form className='login-form'>
      <p className='header'>Log In</p>

  
     <label>Email</label>
      <input type="text" placeholder='Email here..' value={stddata.email} name="email" onChange={handlechange}/>
    

     <label>Password</label>
      <input type="password" placeholder='Password here..' value={stddata.password} name="password" onChange={handlechange}/>
    
    <button onClick={handleLogin}>Log In</button>

    <div className='createNewaccdiv'>
      <span>Create New Account</span>
      <Link to='/studentregister' className='signupLabel'>Sign Up</Link>
    </div>
    
    
    </form>
    
    </div>
  </>
  )
}

export default StudentLogin