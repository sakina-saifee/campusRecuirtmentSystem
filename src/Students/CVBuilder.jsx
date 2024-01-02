import React, { useState } from "react";
import "../Home.css";
import Navbar from "../Navbar";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import "./CVBuilder.css";
import { ConstructionOutlined } from "@mui/icons-material";
import Step1Picture from "./Step1Picture";
import Step2Form from "./Step2Form";
import Step3Education from "./Step3Education";
import Step4Submit from "./Step4Submit";

const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];

const CVBuilder = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [stddata, setStdata]=useState({
  fullname:"",
   stdid:"",
      mobile:"",
  email:"",
  cnic:"",
  institutename:"",
  qualification:"",
  cgpa:"",
  profilePicture: "",
  })


  const handleNext = () => {
  setActiveStep((prevActiveStep) => prevActiveStep + 1);
  console.log("std data at parent", stddata);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };



  return (
    <>
      <div className="image-banner">
        <div className="image-banner-text">
          <h1>Welcome to Campus Recuirtement!</h1>
        </div>
      </div>

      <Navbar />
    
      <Box sx={{ width: "100%" }} className="step-progress-box">
        <Stepper activeStep={activeStep}>
          {steps.map((label) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>

      {activeStep == 0 ? (
        <Step1Picture handleNext={handleNext} setStdata={setStdata} stddata={stddata}/>
      ) : activeStep == 1 ? (
        <Step2Form handleBack={handleBack} handleNext={handleNext} setStdata={setStdata} stddata={stddata} />
      ) : activeStep == 2 ? (
        <Step3Education handleBack={handleBack} handleNext={handleNext} setStdata={setStdata} stddata={stddata}/>
      ) : (
        <Step4Submit handleBack={handleBack} setStdata={setStdata} stddata={stddata}/>
      )}
    </>
  );
};

export default CVBuilder;
