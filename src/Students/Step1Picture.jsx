import React, { useState, useEffect } from "react";
import "./Step1Picture.css";
import Button from "@mui/material/Button";
import dummyimg from "../Assets/dummyprofile.png";
import {auth, db, storage} from '../firebaseConfig/Firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const Step1Picture = (props) => {
  const user=auth.currentUser;
  if(user){
  console.log("useerrr", user.uid);

  }

  const [profilepicture, setprofilepicture] = useState("");

  const handleProfilePicture = (e) => {
    e.preventDefault();

   
    setprofilepicture(URL.createObjectURL(e.target.files[0]));


  if(user){
  // console.log("useerrr", user.uid);
    // console.log("hio");
// console.log("progule", profilepicture);


   const stoargeRef=ref(storage, `profile-picture/${user.uid}`)
uploadBytes(stoargeRef, profilepicture).then(()=>{
  getDownloadURL(stoargeRef).then(url=>{
    console.log("urll", url)
  
props.setStdata((prevdata)=>{
  prevdata.profilePicture=url;
  console.log("prevdata",prevdata)
});

  })
} )

  }
  
 


  };


  return (
    <>
      <div className="picture-container">
        <p>Upload a Picture</p>
        <p>White Background Photograph in Formal Attire</p>

        {profilepicture ? (
          <img src={profilepicture} width="150" height="150" />
        ) : (
          <img src={dummyimg} width="140" height="140" />
        )}
        <input
          type="file"
          onChange={handleProfilePicture}
          className="uploadProfile"
          
        />
        <Button onClick={props.handleNext} className="next-btn">
          Next
        </Button>
      </div>
    </>
  );
};

export default Step1Picture;
