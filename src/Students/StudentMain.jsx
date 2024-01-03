import React from 'react'
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import '../Home.css'
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const StudentMain = () => {
const navigate=useNavigate();

   const handleCVBuilder=()=>{
navigate('/buildcv')
   }

   const handleJobPortal=()=>{
      
navigate('/jobportal')
   }

  return (
    <>
 <div className='image-banner'>
       <div className='image-banner-text'>
        <h1>Welcome to Campus Recuirtement!</h1>
       </div>
    </div>

<Navbar/>
 <div className='buttons'>
    <Button variant="contained" className='cvbuilder-btn' onClick={handleCVBuilder}>Cv Builder</Button>
    <Button variant="contained" className='jobportal-btn' onClick={handleJobPortal}>Job Portal</Button>
 </div>
    </>
    
  )
}

export default StudentMain