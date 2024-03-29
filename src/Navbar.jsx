import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { auth, db } from "./firebaseConfig/Firebase";

import Button from '@mui/material/Button';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Person2Icon from '@mui/icons-material/Person2';
   import { getDatabase, ref, onValue } from "firebase/database";

   
const Navbar = (props) => {

const navigate=useNavigate();

   function GetCurrentUser() {
    const [user, setUser] = useState("");
  

    useEffect(() => {
      auth.onAuthStateChanged((userlogged) => {
        if (userlogged) {
console.log("helo",userlogged.uid)
       
// set(ref(db, 'studentSignedup/' + userlogged.uid), {
//   Username: stddata.username,
//   Email: stddata.email,
//   Password:stddata.password,
//   Mobile: stddata.mobile
// })

const userRef = ref(db, 'studentSignedup/' + userlogged.uid);
onValue(userRef, (snapshot) => {
  const data = snapshot.val();
  setUser(data);
});

          // const getUsers = async () => {
          //   const q = query(
          //     collection(db, "users"),
          //     where("uid", "==", userlogged.uid)
          //   );
          //   // console.log(q);
          //   const data = await getDocs(q);
          //   setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          // };
          // getUsers();
        } else {
          setUser(null);
        }
      });
    }, []);

    return user;
  }

  const loggeduser = GetCurrentUser();
  if (loggeduser) {
    console.log(loggeduser)
  }


  function handleLogout() {
    auth.signOut().then(() => {
      navigate("/studentlogin");
      console.log("now uid", loggeduser)
    });
  }
  
  function handlePostAJob(){

  }

  return (
    <>

 <div className="navbar">
       
 
         <nav>

           
             <AccountCircleIcon className="profile-icon"></AccountCircleIcon>
      
       
           <button className="logout-btn" onClick={handleLogout}>
             Logout
           </button>
         </nav>
 
     </div> 
    
    </>
  )
}

export default Navbar