import React, {useEffect, useState} from 'react'
import './StudentLoginRegister.css'
import { Link, useNavigate } from "react-router-dom";
import {auth, db} from '../firebaseConfig/Firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth'

import { getDatabase, ref, set } from "firebase/database";

import {  toast } from 'react-toastify';
import Navbar2 from '../Navbar2';

const StudentRegister = () => {

const [stddata, setStddata]=useState({
  email:"",
  password:"",
  mobile:"",
  username:"",
});
const navigate=useNavigate();


const handleChange=(e)=>{
 const {name, value}=e.target;
 setStddata((prevdata)=>
 ({
  ...prevdata ,
  [name]:value,
 }))

console.log(stddata)
}

const handleSubmit=(e)=>{

e.preventDefault();

createUserWithEmailAndPassword(auth, stddata.email, stddata.password)
  .then((userCredentials)=>{
    const user=userCredentials.user;
  
set(ref(db, 'studentSignedup/' + user.uid), {
  Username: stddata?.username,
  Email: stddata?.email,
  Password:stddata?.password,
  Mobile: stddata?.mobile
})
.then(() => {
   toast.success("New User Added Successfully!");
   setStddata({
       email:"",
  password:"",
  mobile:"",
  username:"",
  }
      );
    

     setTimeout(()=>{
          navigate('/studentlogin'); 
     },1000);
}).catch((error)=>{
  toast.error("Error", error);
})


  }).catch((error)=>{
    toast.error("Error", error);
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
     <div className='signup-container'>
    <form className='signup-form'>
      <p className='header'>Create Account</p>

      <label>Your Name</label>
      <input type="text" placeholder='First and Last name here..' name="username" value={stddata.username} onChange={handleChange}/>

       <label>Mobile Phone Number</label>
      <input type="Number" placeholder='Mobile Number here..'  name="mobile" value={stddata.mobile} onChange={handleChange}/>
    

     <label>Email</label>
      <input type="text" placeholder='Email here..' name="email"  value={stddata.email} onChange={handleChange}/>
    

     <label>Password</label>
      <input type="password" placeholder='Password here..' name="password" value={stddata.password} onChange={handleChange}/>
    
    <button onClick={handleSubmit}>Sign Up</button>

    <div className='alreadyhaveaccdiv'>
      <span>Already Have an Account?</span>
      <Link to='/studentlogin' className='loginLabel'>Log In</Link>
    </div>
    
    
    </form>
    
    </div>
    </>
   
  )
}

export default StudentRegister