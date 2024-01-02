import React from 'react'
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import '../Home.css';
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const CompanyMain = () => {
const navigate=useNavigate();

   const handleStudentDetails=()=>{
navigate('/viewstdDetails')
   }

   const postAjob=()=>{
    navigate('/postajob')
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
    <Button variant="contained" className='stddetails-btn' onClick={handleStudentDetails}>View Students Details</Button>
    <Button variant="contained" className='postAjob-btn' onClick={postAjob}> Post a Job</Button>
 </div>
    </>
    
  )
}

export default CompanyMain