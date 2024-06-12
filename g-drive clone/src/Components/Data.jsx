import { useEffect, useState } from "react";
import "./Data.css"
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import ListIcon from '@material-ui/icons/List';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import InfoIcon from '@material-ui/icons/Info';
import {db} from './firebase';


function Data() {
    const [files, setFiles] = useState([]);

    useEffect(()=>{
        db.collection("myfiles").onSnapshot(snapshot=>{
            setFiles(snapshot.docs.map(doc=>({
                id:doc.id,
                data:doc.data()

            } )))
        })

    },[])



    function formatBytes (bytes , decimals  = 2) {
        if(bytes ===0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes','KB','MB','TB','PB','EB','ZB','YB'];

        const i = Math.floor(Math.log(bytes)/ Math.log(k));

        return parseFloat((bytes /Math.pow(k , i)).toFixed(dm)) + " "+ sizes[i];
    }


    return(
    <div className="data">
      <div className="data__header">
     <div className="data__headerLeft">
        <p>My Drive</p>
        <ArrowDropDownOutlinedIcon/>
     </div>
     <div className="data__headerRight">
        <ListIcon/>
        <InfoIcon/>

     </div>
      </div>

      <div className="content">
        <div className="data_grid">
            {
                files.map((file)=>{
                    return <div className="data__file">
                    <InsertDriveFileIcon/>
                    <p>{file.data.filename}</p>
                </div>
                })
            }
            
            
        </div>
        <div className="data_list">
            <div className="detailsRow">
                <p><b>Name <ArrowDownwardIcon/></b></p>
                <p><b>Owner</b></p>
                <p><b>Last Modified</b></p>
                <p><b>Size</b></p>

            </div>
             
             {
                files.map((file)=>{
                   return    <div className="detailsRow">
                <p> 
                    <a href={file.data.fileURL} target="_blank">   
                    <InsertDriveFileIcon/> {file.data.filename} 
                    </a>
                         </p>
                <p>Me</p>
                <p>{new Date(file.data.timestamp?.seconds*1000).toUTCString()}</p>
                <p>{formatBytes(file.data.size)}</p>

                       </div>
                })
             }
            
        </div>

      </div>
    </div>
    );
}

export default Data