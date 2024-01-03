import React, { useState, useEffect } from "react";
import "../Home.css";
import Navbar from "../Navbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./postajob.css";
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
const PostAJob = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));


  const [chipData, setChipData] = React.useState([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
    { key: 5, label: 'NextJs' },
    { key: 6, label: 'Python' },
  ]);

  let defaultcolour = '#6b6bf1';
  let whitetext = '#ffffff';

  const navigate = useNavigate();
  const [textColor, settextColor] = useState(whitetext);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedSkillName, setSelectedSkillName] = useState([]);
  const [postedjob, setpostedjob] = useState([]);
  const [skilldb, setSkillDb] = useState([]);

  const [vacancydata, setVacancydata] = useState({
    jobtitle: "",
    jobtype: "",
    joblocation: "",
    companyname: "",
    jobdescription: "",
    skills: [],
  })


  const handleSelectedSkills = (data) => () => {

    //for selected skills bg colour change
    if (selectedSkills.includes(data.key)) {
      // Skill is already selected, remove it from the array
      setSelectedSkills(selectedSkills.filter(selectedKey => selectedKey !== data.key));
    } else {
      // Skill is not selected, add it to the array
      setSelectedSkills([...selectedSkills, data.key]);
    }

    //for skill name
    setSelectedSkillName(data.label);
    if (selectedSkillName.includes(data.label)) {
      // Skill is already selected, remove it from the array
      setSelectedSkillName(selectedSkillName.filter(selectedKey => selectedKey !== data.label));
    } else {
      // Skill is not selected, add it to the array
      setSelectedSkillName([...selectedSkillName, data.label]);
    }

  };



  const handlechange = (e) => {
    const { name, value } = e.target;

    setVacancydata((prevdata) => (
      { ...prevdata, [name]: value }));

  }
  const companyuser = auth.currentUser;
  console.log("compam", companyuser, auth);
  const SubmitJob = () => {

    push(ref(db, 'CompanyVacanies/' + companyuser?.uid), {
      JobTitle: vacancydata.jobtitle,
      JobType: vacancydata.jobtype,
      JobLocation: vacancydata.joblocation,
      CompanyName: vacancydata.companyname,
      JobDescription: vacancydata.jobdescription,
      Skills: selectedSkillName,
      uid: companyuser?.uid,

    })
      .then(() => {
        toast.success("Posted job Successfully!");
        setVacancydata({
          jobtitle: "",
          jobtype: "",
          joblocation: "",
          companyname: "",
          jobdescription: "",
          skills: [],
          uid:"",
        }
        );


        setTimeout(() => {
          navigate('/companymain');
        }, 4000);
      })

  }



  useEffect(() => {
    auth.onAuthStateChanged((userlogged) => {
      if (userlogged) {
        console.log("helo", userlogged.uid)
        const dbRef = ref(db, 'CompanyVacanies/' + userlogged?.uid);
        onValue(dbRef, (snapshot) => {
          const snapshotVal = snapshot?.val();
          if (snapshotVal) { 
       
            const newData = Object.values(snapshotVal);

            setSkillDb(newData);
            console.log("snapshot", newData);
          }
       
        });
      }
    })
  }, []);

  // useEffect(() => {
  //   if (postedjob.length > 0) {
  //     console.log("postedjob n", postedjob);
  //     const newData = Object.values(postedjob[0]);
  //     setSkillDb(newData);

  //     console.log("skill db ", skilldb)
  //   }
  // }, [postedjob]);


  return (
    <>
      <div className="image-banner">
        <div className="image-banner-text">
          <h1>Welcome to Campus Recuirtement!</h1>
        </div>
      </div>
      <Navbar />

      {/* modal popover */}
      <div>
        <Button onClick={handleOpen}>Post a Job</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="modal"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Post A Job
            </Typography>

            <br />
            <TextField
              id="outlined-basic"
              label="Job Title *"
              variant="outlined"
              value={vacancydata.jobtitle}
              name="jobtitle"
              onChange={handlechange}
            />

            <br />
            <br />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Job Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="jobtype"
                value={vacancydata.jobtype}
                onChange={handlechange}
              >

                <MenuItem value="full-time">Full Time</MenuItem>
                <MenuItem value="part-time">Part-Time</MenuItem>
              </Select>
            </FormControl>

            <br />
            <br />
            <TextField
              id="outlined-basic"
              label="Company Name"
              variant="outlined"
              value={vacancydata.companyname}
              name="companyname"
              onChange={handlechange}
            />
            <br />
            <br />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Job Location</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="joblocation"
                onChange={handlechange}
                value={vacancydata.joblocation}
              >
                <MenuItem value="remote">Remote</MenuItem>
                <MenuItem value="on-site">On-Site</MenuItem>
              </Select>
            </FormControl>
            <br />
            <br />
            <textarea id="outlined-basic"
              label="Outlined"
              variant="outlined" placeholder="Job Description"
              value={vacancydata.jobdescription}
              name="jobdescription"
              onChange={handlechange}
            ></textarea>

            <h2>Skill *</h2>

            <Paper
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0.5,
                m: 0,
              }}
              component="ul"
            >
              {chipData.map((data) => {

                return (
                  <ListItem key={data.key}>
                    <Chip

                      label={data.label}

                      onClick={handleSelectedSkills(data)}
                      style={{ background: selectedSkills.includes(data.key) ? '#191984' : '#0969a1', color: textColor }}

                    />
                  </ListItem>
                );
              })}
            </Paper>

            <Button onClick={SubmitJob}>Post</Button>


          </Box>
        </Modal>
      </div>

      {/* modal popover finsih */}
      <Card sx={{ minWidth: 275, marginTop: "60px"}}>
        <Paper
          // sx={{
          //   display: 'flex',
          //   justifyContent: 'center',
          //   flexWrap: 'wrap',
          //   listStyle: 'none',
          //   p: 0.5,
          //   m: 0,
          // }}
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

export default PostAJob;
