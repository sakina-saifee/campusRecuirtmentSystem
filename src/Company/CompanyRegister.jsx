import React, {useEffect, useState} from 'react'
import '../Students/StudentLoginRegister.css'
import { Link, useNavigate } from "react-router-dom";
import {auth, db} from '../firebaseConfig/Firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { getDatabase, ref, set } from "firebase/database";
import Navbar2 from '../Navbar2';
import {  toast } from 'react-toastify';

const CompanyRegister = () => {

const [companydata, setcompanydata]=useState({
  email:"",
  password:"",
  mobile:"",
  username:"",
});
const navigate=useNavigate();


const handleChange=(e)=>{
 const {name, value}=e.target;
 setcompanydata((prevdata)=>
 ({
  ...prevdata ,
  [name]:value,
 }))

console.log(companydata)
}

const handleSubmit=(e)=>{

e.preventDefault();

createUserWithEmailAndPassword(auth, companydata.email, companydata.password)
  .then((userCredentials)=>{
    const user=userCredentials.user;
  
set(ref(db, 'companyRegistered/' + user.uid), {
  Username: companydata?.username,
  Email: companydata?.email,
  Password:companydata?.password,
  Mobile: companydata?.mobile
})
.then(() => {
   toast.success("New company Added Successfully!");
    companydata({
       email:"",
  password:"",
  mobile:"",
  username:"",
  }
      );
    

     setTimeout(()=>{
          navigate('/companylogin'); 
     },4000);
})


  }).catch((error)=>{
  
       toast.error("Please fill all required Fields");
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
      <p className='header'>Register Your Company</p>

      <label>Your Name</label>
      <input type="text" placeholder='First and Last name here..' name="username" value={companydata.username} onChange={handleChange}/>

       <label>Mobile Phone Number</label>
      <input type="text" placeholder='Mobile Number here..'  name="mobile" value={companydata.mobile} onChange={handleChange}/>
    

     <label>Email</label>
      <input type="text" placeholder='Email here..' name="email"  value={companydata.email} onChange={handleChange}/>
    

     <label>Password</label>
      <input type="password" placeholder='Password here..' name="password" value={companydata.password} onChange={handleChange}/>
    
    <button onClick={handleSubmit}>Sign Up</button>

    <div className='alreadyhaveaccdiv'>
      <span>Already Have an Account?</span>
      <Link to='/companylogin' className='loginLabel'>Log In</Link>
    </div>
    
    
    </form>
    
    </div>
    </>
   
  )
}

export default CompanyRegister