import React from 'react'
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import './Home.css'
import { Link, useNavigate } from "react-router-dom";

const Home = () => {

const navigate=useNavigate();

  const handlestudent=(e)=>{
    navigate('./studentlogin');

  }

  const handlecompany=(e)=>{
    navigate('./companylogin');
  }

  const handleadmin=(e)=>{
    navigate('./adminlogin');
  }
  
  return (
    <>
      <div className='image-banner'>
       <div className='image-banner-text'>
        <h1>Welcome to Campus Recuirtement!</h1>
       </div>
    </div>

   <div className='home-page-buttons'>

 <Button variant="contained" className='stud-btn' onClick={handlestudent}>Student</Button>
 <Button variant="contained"  className='company-btn' onClick={handlecompany}>Company</Button>
 <Button variant="contained"  className='admin-btn' onClick={handleadmin}> Admin</Button>
 
   </div>
    </>
  
  )
}

export default Home