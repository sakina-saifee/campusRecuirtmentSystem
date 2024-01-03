import React, {useEffect, useState} from 'react'
import '../Students/StudentLoginRegister.css';
import { Link, useNavigate } from "react-router-dom";
import {auth, db} from '../firebaseConfig/Firebase';
import { getDatabase, ref, set } from "firebase/database";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'

import {  toast } from 'react-toastify';
import Navbar2 from '../Navbar2';

const AdminLogin = () => {

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



if(stddata.email=="admin12@gmail.com" && stddata.password=="1234567"){
    toast.success("User Logged in Successfully!");
    navigate('/adminmain')
    setStddata({
        email:"",
      password:"",
     })
   
}else if(stddata.email=="" || stddata.password==""){
    toast.error("Please Fill The Required Fields!");
}else{
    toast.error("Invalid Email or Password");
}
// if(email!==user.Email || password!==user.Password){
//      toast.error("Wrong Credentials!");
// }

  // if(error.message==="Firebase: Error (auth/invalid-credential)"){
  //  toast.error("Wrong Credentials!");
  // }

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
      <p className='header'>Administration</p>

  
     <label>Email</label>
      <input type="text" placeholder='Email here..' value={stddata.email} name="email" onChange={handlechange}/>
    

     <label>Password</label>
      <input type="password" placeholder='Password here..' value={stddata.password} name="password" onChange={handlechange}/>
    
    <button onClick={handleLogin}>Log In</button>


    
    
    </form>
    
    </div>
  </>
  )

}
export default AdminLogin