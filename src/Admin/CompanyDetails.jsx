import React, { useState, useEffect } from "react";
import "../Home.css";
import Navbar from "../Navbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
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
import { getDatabase, ref, set, push, onValue, remove } from "firebase/database";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { List } from "@mui/material";
import '../Admin/Admin.css';

const CompanyDetails = () => {
    const [open, setOpen] = React.useState(false);
    const ListItem = styled('li')(({ theme }) => ({
        margin: theme.spacing(0.5),
    }));


    const navigate = useNavigate();

    const [postedjob, setpostedjob] = useState([]);
    const [skilldb, setSkillDb] = useState([]);
    const [delarr, setdelarr] = useState([]);




    useEffect(() => {



        const dbRef = ref(db, 'CompanyVacanies/');
        onValue(dbRef, (snapshot) => {
            // console.log("snapshot vlaues", snapshot);
            const snapshotVal = snapshot?.val();
            if (snapshotVal) {
                const newData = Object.values(snapshotVal);
                setpostedjob(newData);
                console.log("snapshot", newData);
            }
        });


    }, []);

    useEffect(() => {
        if (postedjob.length > 0) {
            //   const newData = Object.values(postedjob[0]);
            //   setSkillDb(newData);
            // Transform each job to the desired structure
            let arr = [];
            console.log("postedjob", postedjob);
            postedjob.map(job => {
                let key = Object.keys(job);
                console.log("key", key)
                let obj2 = Object.values(job);
                console.log("obj2", obj2)
                obj2.map((abc, i) => {
                    arr.push({ ...abc, key: key[i] })
                })
            }); // Transform each job to the desired structure
            // console.log("new data", newData);

            setSkillDb(arr); // Flatten the array if each job is an array of values

        }
    }, [postedjob]);
    console.log("skill db ", skilldb)

    const deletebtn = (job) => () => {
        console.log("posted job now", job);
        remove(ref(db, 'CompanyVacanies/'+`${job.uid}/`+`${job.key}`));
    }

   


    return (
        <>
            <div className="image-banner">
                <div className="image-banner-text">
                    <h1>Welcome Admin</h1>
                </div>
            </div>
            <Navbar />

            <Card sx={{ minWidth: 275 }}>
                <Paper
                    component="div"
                >
                    {
                        skilldb.map((job, index) => {
                            console.log("JSkill db job:", job);
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



                                    <div >

                                        <Button className="deletebtn" onClick={deletebtn(job)}>Delete </Button>
                                    </div>





                                </div >


                            );
                        })
                    }
                </Paper>

            </Card>

        </>
    );
};

export default CompanyDetails;
