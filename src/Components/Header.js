import React, { useState } from "react";
import "./Header.css";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import { Avatar } from "@mui/material";
import { db, storage } from "../Firebase";
import firebase from "firebase";

const Header = () => {
  const [change, setChange] = useState("");

  const OnInputChange = (e) => {
    setChange(e.target.value);
    console.log(e.target.value);

    // const filteredList = valuess.filter((item) =>
    //   item.name.toLowerCase().includes(e.target.value.toLowerCase())
    // );
  };

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
          <input
            type="text"
            placeholder="Search in Drive"
            value={change}
            onChange={OnInputChange}
          />
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
