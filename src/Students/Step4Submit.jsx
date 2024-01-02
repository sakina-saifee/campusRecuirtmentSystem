import React from 'react'
import './Step1Picture.css';
import Button from "@mui/material/Button";
import {auth, db} from '../firebaseConfig/Firebase';
import { getDatabase, ref, set } from "firebase/database";
import {  toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const Step4Submit = (props) => {

  const navigate=useNavigate();

  const handleSubmit=()=>{
    const user=auth.currentUser;
    // if(user){
    // console.log("useerrr", user.uid);
  
    // }

set(ref(db, 'studentApplied/' + user?.uid), {
  FullName:props.stddata.fullname,
  stdid:props.stddata.stdid,
     mobile:props.stddata.mobile,
 email:props.stddata.email,
 cnic:props.stddata.cnic,
 institutename:props.stddata.institutename,
 qualification:props.stddata.qualification,
 cgpa:props.stddata.cgpa,
 profilePicture: "",
})
.then(() => {
   toast.success("Registered for job Successfully!");
    props.setStdata({
      fullname:"",
      stdid:"",
         mobile:"",
     email:"",
     cnic:"",
     institutename:"",
     qualification:"",
     cgpa:"",
     profilePicture: "",
  }
      );
    

     setTimeout(()=>{
          navigate('/stdmain'); 
     },4000);
})


  }
  return (
    <>
     <div className="form-container">
      
        <p>Click submit to submit the details</p>

        <Button onClick={props.handleBack} className="prev-btn">
          Previous
        </Button>
        <Button onClick={handleSubmit} className="submit-btn">
          Submit
        </Button>
      
      </div>
    </>
  )
}

export default Step4Submit