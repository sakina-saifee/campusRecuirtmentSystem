import React, {useEffect, useState} from 'react'
import '../Students/StudentLoginRegister.css'
import { Link, useNavigate } from "react-router-dom";
import {auth, db} from '../firebaseConfig/Firebase';
import { getDatabase, ref, set } from "firebase/database";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import Navbar2 from '../Navbar2';
import {  toast } from 'react-toastify';

const CompanyLogin = () => {

  const [companydata, setcompanydata]=useState({
  email:"",
  password:"",
});
const navigate=useNavigate();

const handlechange=(e)=>{
const {name, value}= e.target;
setcompanydata((prevdata)=>({...prevdata,[name]:value}));
}
const handleLogin=(e)=>{
e.preventDefault();

signInWithEmailAndPassword(auth, companydata.email, companydata.password).then((userCredentials)=>{

   toast.success("You are Logged in Successfully!");
navigate('/companymain')
companydata({
    email:"",
  password:"",
 })
  setTimeout(()=>{
 navigate('/companymain')
  },4000)
}).catch((error)=>{

if(companydata.email==="" || companydata.password===""){
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
      <p className='header'>Log In To Your Company Portal</p>

  
     <label>Email</label>
      <input type="text" placeholder='Email here..' value={companydata?.email} name="email" onChange={handlechange}/>
    

     <label>Password</label>
      <input type="password" placeholder='Password here..' value={companydata?.password} name="password" onChange={handlechange}/>
    
    <button onClick={handleLogin}>Log In</button>

    <div className='createNewaccdiv'>
      <span>Create New Account</span>
      <Link to='/companyregister' className='signupLabel'>Sign Up</Link>
    </div>
    
    
    </form>
    
    </div>
  </>
  )
}

export default CompanyLogin