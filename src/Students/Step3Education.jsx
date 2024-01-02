import React from "react";
import "./Step3Education.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// import Number from '@mui/material/Number';
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Step3Education = (props) => {
 


const handlechange=(e)=>{
const {name, value}=e.target;

props.setStdata((prevdata)=>({...prevdata,[name]:value}));

console.log("rubnn", props);
}

  return (
    <>
      <div className="form-container">
        <p>Education</p>
        <p>Enter your three most recent</p>

        <div className="text-fields-container">
{/* 
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DemoItem label="From - To " component="DateRangePicker">
                <DateRangePicker readOnly />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
<br/> */}
   <br/>

          <TextField
            id="outlined-basic"
            label="Institute Name"
            variant="outlined"
            placeholder="Iqra University"
             value={props.stddata.institutename}
              name="institutename"
               onChange={handlechange}
          />

          <br/>
   <br/>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Qualification</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
               value={props.stddata.qualification}
              name="qualification"
               onChange={handlechange} 
            >
              <MenuItem value={10}>M.Phill</MenuItem>
              <MenuItem value={20}>MBA</MenuItem>
              <MenuItem value={30}>BBA</MenuItem>
              <MenuItem value={30}>B.Com</MenuItem>
              <MenuItem value={30}>Alevels</MenuItem>
              <MenuItem value={30}>Intermediate</MenuItem>
              <MenuItem value={30}>Olevels</MenuItem>
              <MenuItem value={30}>Matriculation</MenuItem>
              <MenuItem value={30}>Other</MenuItem>
            </Select>
          </FormControl>

          <br />
          <br />
          <TextField
            id="outlined-basic"
            label="Grade/CGPA"
            variant="outlined"
            placeholder="3.45"
            value={props.stddata.cgpa}
              name="cgpa"
               onChange={handlechange}
          />
        </div>
        <br />
        <Button onClick={props.handleNext} className="next-btn">
          Next
        </Button>
        <Button onClick={props.handleBack} className="prev-btn">
          Previous
        </Button>
      </div>
    </>
  );
};

export default Step3Education;
