import React, { useState } from "react";
import { dbService, storageService } from "../myfb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({Key, nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure delete?")
        if(ok){
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            if(nweetObj.fileUrl != "") await storageService.refFromURL(nweetObj.fileUrl).delete();
        }
    }
    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewNweet(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(nweetObj, newNweet);
        await dbService.doc(`nweets/${nweetObj.id}`).update({ text: newNweet });
        setEditing(false);
    }
    const toggleEditing = () => setEditing((prev) => !prev);
    return ( 
        <div className="nweet">
            <div>
            <img height="50" width="50" src = "https://firebasestorage.googleapis.com/v0/b/mytwitter-cfff0.appspot.com/o/default.png?alt=media&token=623ad82c-3e72-4a3c-84eb-c95ebbeafe19" />
            <span>{nweetObj.creatorDisplayName}</span>
            </div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit} className="container nweetEdit">
                        <input type="text" value={newNweet} required autoFocus onChange={onChange} className="formInput" />
                        <input type="submit" value="Update" className="formBtn"/>
                        <span onClick={toggleEditing} className="formBtn cancelBtn">Cancel</span>
                    </form>
                </>

            ) : (
                <>
                <h4>{nweetObj.text}</h4>
                {nweetObj.fileUrl && <img src = {nweetObj.fileUrl} />}
                {isOwner ? (
                    <div className="nweet_actions">
                        <span onClick={onDeleteClick}><FontAwesomeIcon icon={faTrash} /></span>
                        <span onClick={toggleEditing}><FontAwesomeIcon icon={faPencilAlt} /></span>
                        <span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{nweetObj.createdAtStr}</span>
                    </div>
                ) : (
                    <div>
                        <span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{nweetObj.createdAtStr}</span>
                    </div>
                )}
                
                </>
            )}
        </div>
    )
}


export default Nweet;