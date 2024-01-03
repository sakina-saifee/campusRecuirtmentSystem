import React from 'react'
import "./Step2Form.css";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
// import Number from '@mui/material/Number';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';




const Step2Form = (props) => {

console.log("props", props);

const handlechange=(e)=>{
const {name, value}=e.target;

props.setStdata((prevdata)=>(
  {...prevdata,[name]:value}));
 console.log("rubnn", props);
}




  return (
    <>
      <div className="form-container">
        <p>Personal Information</p>
      
      <div className='text-fields-container'>
 <TextField id="outlined-basic" label="Full Name" variant="outlined" placeholder='Sakina Saifee'  value={props.stddata?.fullname} name="fullname" onChange={handlechange}
       />
 <br/>
  <br/>
 <TextField id="outlined-basic" label="Student ID" variant="outlined" placeholder='54573'type="number" value={props.stddata?.stdid} name="stdid" onChange={handlechange}/>
  <br/>
   <br/>
 <TextField id="outlined-basic" label="Mobile" variant="outlined" placeholder='+92 335 5323'  value={props.stddata?.mobile} name="mobile"  onChange={handlechange}/>
  <br/>
   <br/>
 <TextField id="outlined-basic" label="Email" variant="outlined" placeholder='example@gmail.com' value={props.stddata?.email} name="email"  onChange={handlechange}/>
  <br/>
   <br/>
    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="Basic date picker" value={props.stddata.dob} name="dob" onChange={(e)=>{console.log(e)}} />
      </DemoContainer>
    </LocalizationProvider> */}
   
       <TextField
            id="outlined-basic"
            label="CNIC"
            variant="outlined"
            placeholder="423 03234 043543685"
            type="text"
            value={props.stddata?.cnic}
             name="cnic" 
             onChange={handlechange}
          />
      </div>
 <br/>
        <Button onClick={props.handleNext} className="next-btn">
          Next
        </Button>
          <Button onClick={props.handleBack} className="prev-btn">
          Previous
        </Button>
      </div>
    </>
  )
}

export default Step2Form