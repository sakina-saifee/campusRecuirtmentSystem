import React ,{useEffect, useState}from "react";
import './ViewStudentDetails.css';
import Navbar from "../Navbar";
import '../Home.css';
import {auth, db } from '../firebaseConfig/Firebase';
import { getDatabase, ref, set, onValue} from "firebase/database";
const ViewStudentDetails = () => {

    const [stddata, setstdata]=useState([]);
  


    
   
    
    // tasks.forEach(task =>
    //   Object.entries(task).forEach(([key, value]) =>
    //     formattedTasks.push({ name: key, data: value })
    //   )
    // );

const dbRef = ref(db, '/studentApplied/');

useEffect(() => {
    onValue(dbRef, (snapshot) => {
      const newData = Object.values(snapshot.val());
      setstdata(newData);
      console.log("snapshot", snapshot.val());
    });
  }, []);
  
  useEffect(() => {
    if (stddata.length > 0) {
      console.log("stddata n", stddata);
    }
  }, [stddata]);


  return <>
   <div className='image-banner'>
       <div className='image-banner-text'>
        <h1>Welcome to Campus Recuirtement!</h1>
       </div>
    </div>

<Navbar/>


  <table>
    <thead>
    <tr>
    {/* <th>Profile Picture</th> */}
    <th>FullName</th>
    <th>Student ID</th>
    <th>CGPA</th>
    <th>CNIC</th>
    <th>Email</th>
    <th>Institute Name</th>
    <th>Mobile</th>
    <th>Qualification</th>
  </tr>

    </thead>

    <tbody>
    {stddata.map((item, index) => (
      <tr key={index}>
        <td>{item?.FullName}</td>
        <td>{item?.stdid}</td>
        <td>{item?.cgpa}</td>
        <td>{item?.cnic}</td>
        <td>{item?.email}</td>
        <td>{item?.institutename}</td>
        <td>{item?.mobile}</td>
        <td>{item?.qualification}</td>
        {/* <td>{item.contact}</td>
        <td>{item.country}</td> */}
      </tr>
    ))}
  </tbody>

</table>
  </>;
};

export default ViewStudentDetails;
