import React, { useState, useEffect } from "react";
import "../Home.css";
import Navbar from "../Navbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "../Company/postajob.css";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { auth, db } from '../firebaseConfig/Firebase';
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { List } from "@mui/material";


const JobPortal = () => {
  const [open, setOpen] = React.useState(false);
  const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));


  const navigate = useNavigate();

  const [postedjob, setpostedjob] = useState([]);
  const [skilldb, setSkillDb] = useState([]);


  const companyuser = auth.currentUser;
  console.log("compam", companyuser, auth);

  useEffect(() => {
    auth.onAuthStateChanged((userlogged) => {
      if (userlogged) {
        console.log("helo", userlogged.uid)
        const dbRef = ref(db, 'CompanyVacanies//');
        onValue(dbRef, (snapshot) => {
console.log("snapshot vlaues", snapshot);
  const snapshotVal = snapshot?.val();
          if (snapshotVal) { 
                const newData = Object.values(snapshotVal);
                setpostedjob(newData);
                console.log("snapshot", newData);
            }     
        });
      }
    })
  }, []);

  useEffect(() => {
    if (postedjob.length > 0) {
      console.log("postedjob n", postedjob);
    //   const newData = Object.values(postedjob[0]);
    //   setSkillDb(newData);
    const newData = postedjob.map(job => Object.values(job)); // Transform each job to the desired structure
    console.log("new data", newData.flat())
    setSkillDb(newData.flat()); // Flatten the array if each job is an array of values
    
    }
  }, [postedjob]);
  console.log("skill db ", skilldb)

  return (
    <>
      <div className="image-banner">
        <div className="image-banner-text">
          <h1>Welcome to Campus Recuirtement!</h1>
        </div>
      </div>
      <Navbar />

      <Card sx={{ minWidth: 275 }}>
        <Paper
          component="div"
        >
          {
            skilldb.map((job, index) => {
              console.log("Job:", job);
              // Check if job.Skills is an array and render Chips
              return (
                <div style={{ display: 'flex' }} key={index} className="outer-div">

                  <Typography color="text.secondary" gutterBottom sx={{
                    textAlign: 'left',

                    mt: '5px', // Use a string to specify pixel values directly
                    fontSize: 14
                  }}>
                    {job.JobTitle}
                  </Typography>

                  <List className="listskills">
                    {Array.isArray(job.Skills) && job.Skills.map((skill, skillIndex) => (

                      <ListItem key={skillIndex}>
                        <Chip
                          label={skill}
                          style={{ background: '#2584a1', color: "white" }}
                        />
                      </ListItem>
                    ))}
                  </List>



                  <Typography color="text.secondary" gutterBottom sx={{
                    textAlign: 'right',

                    mt: '4px',
                    fontSize: 14
                  }}>
                    {job.JobType}

                    <Typography sx={{
                      textAlign: 'right',

                      m: '14px',
                      fontSize: 14,
                      display: "inline"
                    }} color="text.secondary" gutterBottom>
                      {job.JobLocation}
                    </Typography>

                  </Typography>

                  <Typography sx={{
                    textAlign: 'right',

                    m: '14px',
                    fontSize: 14,
                    display: "inline"
                  }} color="text.secondary" gutterBottom>
                    {job.JobDescription}
                  </Typography>

                  <Typography sx={{
                    textAlign: 'right',

                    m: '10px',
                    mt: '1px',
                    fontSize: 14,
                    display: "inline"
                  }} color="text.secondary" gutterBottom>
                    {job.CompanyName}
                  </Typography>
                </div >


              );
            })
          }
        </Paper>
      </Card>

    </>
  );
};

export default JobPortal;
