import React, { useState } from "react";
import "./Sidebar.css";
import MobileScreenShareIcon from "@mui/icons-material/MobileScreenShare";
import DevicesIcon from "@mui/icons-material/Devices";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import { Modal } from "@mui/material";
import { db, storage } from "../Firebase";
import firebase from "firebase";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      
    }
  };

//   console.log(file);

  const handleUpload = (e) => {
    e.preventDefault();
    setUploading(true);
    storage
      .ref(`files/${file.name}`)
      .put(file)
      .then((snapshot) => {
        // console.log(snapshot);
        storage
          .ref("files")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("myfiles").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              filename: file.name,
              fileURL: url,
              size: snapshot._delegate.bytesTransferred,
            });
            setUploading(false);
            setFile(null);
            setOpen(false);
            
          });
      });
  };

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="ModalPopup">
          <form onSubmit={handleUpload}>
            <div className="ModalHeading">
              <h3>Select file you want to upload</h3>
            </div>
            <div className="ModalBody ">
              {uploading ? (
                <div className="UploadingPara ">Uploading...</div>
              ) : (
                <>
                  <input
                    type="file"
                    className="modal__file"
                    onChange={handleFile}
                  />
                  <input type="submit" className="modal__submit" />
                </>
              )}
            </div>
          </form>
        </div>
      </Modal>

      <div className="SidebarContainer">
        <div className="SidebarBtn">
          <button onClick={() => setOpen(true)}>
            <img src="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2236%22 height=%2236%22 viewBox=%220 0 36 36%22%3E%3Cpath fill=%22%2334A853%22 d=%22M16 16v14h4V20z%22/%3E%3Cpath fill=%22%234285F4%22 d=%22M30 16H20l-4 4h14z%22/%3E%3Cpath fill=%22%23FBBC05%22 d=%22M6 16v4h10l4-4z%22/%3E%3Cpath fill=%22%23EA4335%22 d=%22M20 16V6h-4v14z%22/%3E%3Cpath fill=%22none%22 d=%22M0 0h36v36H0z%22/%3E%3C/svg%3E" />
            <span>New</span>
          </button>
        </div>

        <div className="SidebarOptions">
          <div className="Sidebar1">
            <MobileScreenShareIcon />
            <span>My Drive</span>
          </div>
          <div className="SidebarOption">
            <DevicesIcon />
            <span>Computers</span>
          </div>
          <div className="SidebarOption">
            <PeopleAltIcon />
            <span>Shared with me</span>
          </div>
          <div className="SidebarOption">
            <QueryBuilderIcon />
            <span>Recent</span>
          </div>
          <div className="SidebarOption">
            <StarBorderPurple500Icon />
            <span>Starred</span>
          </div>
          <div className="SidebarOption">
            <DeleteOutlineIcon />
            <span>Trash</span>
          </div>
        </div>
        <hr />
        <div className="SidebarOptions">
          <div className="SidebarOption">
            <CloudQueueIcon />
            <span>Storage</span>
          </div>
          <div className="progress_bar">
            <progress size="tiny" value="50" max="100" />
            <span>600 MB of 15 GB used</span>
            <div>
            <button >Get more storage</button>
          </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default Sidebar;
