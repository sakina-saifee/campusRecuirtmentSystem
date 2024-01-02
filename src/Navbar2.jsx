import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { auth, db } from "./firebaseConfig/Firebase";
import HomeIcon from "@mui/icons-material/Home";

const Navbar2 = () => {
  return (
    <>
      <div className="navbar">
        <nav>
            <Link to='/'>
          <HomeIcon className="profile-icon" ></HomeIcon>
            
            </Link>
        </nav>
      </div>
    </>
  );
};

export default Navbar2;
