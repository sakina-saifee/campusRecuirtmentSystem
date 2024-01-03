import React, {useEffect, useState} from 'react'
import '../Students/StudentLoginRegister.css';
import { Link, useNavigate } from "react-router-dom";
import {auth, db} from '../firebaseConfig/Firebase';
import { getDatabase, ref, set } from "firebase/database";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import {  toast } from 'react-toastify';
import Navbar2 from '../Navbar2';
import Button from '@mui/material/Button';
import '../Home.css'
import Navbar from "../Navbar";

const AdminMain = () => {


    const navigate=useNavigate();
    
       const handleCompanyDetails=()=>{
    navigate('/companydetails')
       }
    
       const handleStudentDetails=()=>{
          
    navigate('/studentdetails')
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
        <Button variant="contained" className='cvbuilder-btn' onClick={handleCompanyDetails}>Company Details</Button>
        <Button variant="contained" className='jobportal-btn' onClick={handleStudentDetails}>Student Details</Button>
     </div>
        </>
        
      )
 

}
export default AdminMain