import React, { useState } from "react";
import "./Header.css";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import { Avatar } from "@mui/material";
import { db, storage, auth } from "../Firebase";
import firebase from "firebase";
// import getDocs from "firebase/firestore";
// import collection from "firebase/firestore";
// import addDoc from "firebase/firestore";

const Header = () => {
  const [change, setChange] = useState("");

  //   const inputcollectioRef = collection(db , "myfiles");

  //   const OnInputChange = async(e) => {
  //     setChange(e.target.value);
  //     console.log(e.target.value);
  //     try{
  //       const data = await getDocs(inputcollectioRef);
  //       console.log("data is coming");
  //       const filterData = data.docs.map((data)=>({
  //         ...docs.data(),
  //         id: document.id,
  //       }));

  //       console.log("filterData", filterData);
  //       setChange(filterData);
  //     }catch(err){
  //       console.log(err);
  //     }
  // };

  // console.log(db.collection);

  const storage = firebase.storage();

  // console.log(storage);

  return (
    <div>
      <div className="HeaderContainer">
        <div className="HeaderLogo">
          <img
            src="https://1000logos.net/wp-content/uploads/2021/04/Google-Drive-logo.png"
            alt="Google Drive"
          />
          <span>Drive</span>
        </div>
        <div className="HeaderSearch">
          <SearchRoundedIcon />
          <input type="text" placeholder="Search in Drive" value={change} />
          <FormatAlignCenterIcon />
        </div>
        <div className="HeaderIcons">
          <span>
            <HelpOutlineIcon />
            <SettingsRoundedIcon />
            <AppsOutlinedIcon />
            <Avatar style={{ color: "white", backgroundColor: "brown" }}>
              PS
            </Avatar>

            {/* <Avatar src={photoURL} /> */}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
