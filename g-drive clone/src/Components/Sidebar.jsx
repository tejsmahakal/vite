import { useState } from "react";
import "./Sidebar.css"
import MobileScreenShareIcon from '@material-ui/icons/MobileScreenShare';
import DevicesIcon from '@material-ui/icons/Devices';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ScheduleIcon from '@material-ui/icons/Schedule';
import GradeIcon from '@material-ui/icons/Grade';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import WbCloudyIcon from '@material-ui/icons/WbCloudy';
import CloudOutlinedIcon from '@material-ui/icons/CloudOutlined';
import  { Modal} from '@material-ui/core';
import {db, storage} from './firebase';
import firebase from 'firebase';

function Sidebar (){
    const [open,setOpen] =useState(false);

    const [uploading, setUploading] =useState(false);
    const [file, setFile] = useState(null);

    const handleClose= ()=>{
        setOpen(false);
    }
    const handleOpen=()=>{
        setOpen(true)
    }
     const handleChange=(e)=>{
       if(e.target.files[0])
        {
           setFile(e.target.files[0])
        }
     }

     const handleUpload=(event)=>{
           event.preventDefault();
           setUploading(true);

           storage.ref(`files/${file.name}`).put(file).then(snapshot=>{
             storage.ref("files").child(file.name).getDownloadURL().then(url=>{
                db.collection("myfiles").add({
                    timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                    filename:file.name,
                    fileURL:url,
                    size:snapshot._delegate.bytesTransferred

                })

               setUploading(false);
               setFile(null);
               setOpen(false);
               
             })

           })
     }


    return(
        <>
        <Modal open={open} onClose={handleClose}>
           <div className="modal_pop">
            <form> 
                <div className="modalHeading">
                    <h3>Select file you want to upload</h3>
                </div>
                <div className="modalBody">
                    {
                        uploading ?(<p className="uploading">Uploading</p>) : (
                            <>
                         <input type="file" onChange={handleChange}/>
                            <input type="submit" className="post__submit" onClick={handleUpload}/>
                            </>
                            )
                    }
                   
                </div>
            </form>
           </div>
        </Modal>
        <div className="sidebar">
           <div className="sidebar_btn"> 
            <button onClick={handleOpen} >
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAACUCAMAAACp1UvlAAAAZlBMVEX///8jHyAAAAAeGhvj4+MRDA2XlZVoZmfIxscMAgU4NzclICL8/PwdGBno5+gGAAD39ve5ubnw8PDX1td+fH0ZFBatrK0xLi9KSEk/PT5iYWKHhoZwbW4oJCXPzs5dW1yioaJSUFE3F7tJAAAC2ElEQVR4nO2c65KiMBBGoTFKSLgKqNzU93/JJc7ullMGCLtAmKrvzF8znuqEAN0dHQcAAAAAAABgjcgvy/ScOI7s//aA7DWy8lowzmN2ybudeCmt8kaF+8KLKT/YVvpNllMo3L9w4ds2UkhZkfuNsPB3MJWyjr9rCTcMD/bFfOZ+wBpp16v/9rYQn2KUWtXq6ejTqg/Y3bZXzVxNvFwW2dVKqkIXL5cs7xXRNdRpCXrY9ToEnjZe/GjZ66bzEva99PES8IIXvOD1Q72wr8ILXvCCF7zgBS94wWvPXnt9XoXXANGmXlKqfPIhfTSnCapWq+V616mhTV2qks2svLXSivKg4JxNodfqxaYG8pi5VTk7YkfinsroijGGpBTjY78+U9DzPMPJcZKc9OtmaYq2My2N9HMoT9qs/BqoYpJxuI6bafVil8R0Is8DF9k6UG7qVfMtvbzWcO1nG635P5DhHuxvuLoUrDK7Irdc9QqvNSty5YOb+Eows0p9s7UXmXnl8fS/WhTDeD22XV8ivCVG96KORm/Ii8Mas+tR3vQ12LWIzYr00nlsut+HgWEtXCZPXe/BWpj2NPTPOf6GdyI6zXiUTkNP236wOIKazFxLypT0fREL49E9m9HKo16Gck7aFoQFYRSks/vrpF9faJqhhcimh7J7+Q9dKertI+r8CdKLPm/C8m50bOd3hxkL603LLLgD79tr5nNe8y7HGc9PjA101u1c+2H5L3jBC17wgteyXtbz5D8sXvCCF7zgBS94wQte/+u11+cveM30ii17ZU9dDUK4NLszYllkM3A+bUZfxCpoi1wibG2fy4y0xTeqrWopsUZTrTQu8a/IIfhM89PR+rlfXTGJKsvHfr/EHuw9YsLlT8uHWF/0kfGDt8Vf8FyunAQ383oVkxhnheeFBYsv/k5+uOBFVubPILie6s62yRuv8MgsiiLjlqnN2cGVCAAAAACwa34ByLI5YKjMlb0AAAAASUVORK5CYII=" alt="" />
                <span> New</span>
            </button>
             </div>

             <div className="sidebar_options">
                <div className="sidebar_option sidebar_option-Active">
                    <MobileScreenShareIcon/>
                    <span>My Drive</span>

                </div>

                <div className="sidebar_option">
                <DevicesIcon/>

                    <span>Computers</span>

                </div>

                <div className="sidebar_option">
                    <PeopleOutlineIcon/>
                    <span>Shared with me</span>

                </div>

                <div className="sidebar_option">
                    <ScheduleIcon/>
                    <span>Recent</span>

                </div>

                <div className="sidebar_option">
                    <GradeIcon/>
                    <span>Starred</span>

                </div>

                <div className="sidebar_option">
                    <DeleteOutlineIcon/>
                    <span>Trash</span>

                </div>

             </div>
             <hr />
             <div className="sidebar_options">
             <div className="sidebar_option">
                    <CloudOutlinedIcon/>
                    <span>Storage</span>
                </div>
                <div className="progress_bar">
                  <progress size="tiny" value="50" max="100"/>
                  <span>6.45GB of 15GB used</span>
                </div>
        </div>
        </div>
        </>
    );
}

export default Sidebar