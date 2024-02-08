import React, { useEffect, useState } from 'react'
import "./Data.css";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import InfoIcon from '@mui/icons-material/Info';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import { db } from '../Firebase';



const Data = () => {

    const [files, setFiles] = useState([]);


    //    TODO: useState for image and pdf icon 

    const [filetype , setFiletype] = useState(null);


    useEffect(() => {
        db.collection("myfiles").onSnapshot(snapshot => {
            setFiles(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
                // type:doc.data().filename.split('.').toLowerCase()
            })))
        })
        
    },[])
  
    console.log(files);
    // TODO: for storage

    const changeBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }


    //   TODO: for delete files

      const Delete=(idx)=>{
        let del = [...files];
        del.splice(idx ,1);
        setFiles(del);
     }

     console.log(files);


    return (
        <div className="DataContainer">
          <div className="DataHeader">
            <div className="headerLeft">
              <p>My Drive</p>
              <ArrowDropDownIcon />
            </div>
            <div className="headerRight">
              <FormatListBulletedIcon />
              <InfoIcon />
            </div>
          </div>
    
          <div>
            <div className="DataGrid">
              {files.map((file,idx) => (
                <div className="DataFile" key={file.id}>

                    {/* <InsertDriveFileIcon /> */}
                    {
                      file.data.filename.split('.').pop()=== "pdf" ? <PictureAsPdfIcon style={{color:"red", opacity:"0.54"}}/> : <ImageIcon style={{color:"red",opacity:"0.54"}}/>
                    }
                  
                  <p>{file.data.filename}</p>
                </div>
              ))}
            </div>

               <div className='Database'>
              <div className='DataListRow'>
                <p>
                  <b>
                    Name <ArrowDownwardIcon />
                  </b>
                </p>
                <p>
                  <b>Owner </b>
                </p>
                <p>
                  <b>Last Modified</b>
                </p>
                <p>
                  <b>File Size</b>
                </p>
                <p>
                    <b className='del'>
                    <DeleteIcon/>
                    </b>
                </p>
                
              </div>
              {files.map((file,idx) => (
                <div className='DataListRow' key={file.id}>
                  <a href={file.data.fileURL} target="_blank">
                    <p>
                       
                     {
                      file.data.filename.split('.').pop().toLowerCase() === 'pdf' ? 
                      <PictureAsPdfIcon style={{color:"red",opacity:"0.74"}}/> : <ImageIcon style={{color:"red",opacity:"0.74"}}/> 
                     }

                   {file.data.filename}
                    </p>
                  </a>
                  <p>Owner </p>
                  <p>
                    {new Date(file.data.timestamp?.seconds * 1000).toUTCString()}
                  </p>
                  <p>{changeBytes(file.data.size)}</p>
                  <>
                  <DeleteIcon className='del' onClick={()=>Delete(idx)}/>
                  </>
                  
                </div>
               
              ))}
              

              
            </div>
          </div>
        </div>
      );
    };
    
    export default Data;
    