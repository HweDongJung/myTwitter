import React, { useState } from "react";
import { dbService, storageService } from "../myfb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function extractVideoID(url) { //유투브 id 추출 
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[7].length == 11) {
      return match[7];
    } else {
      return "";
    }
  }

const Nweet = ({Key, nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const [profilePic, setProfilePic] = useState("");
    const [nweetDisName, setNweetDisName] = useState("");
    dbService.collection('nweetusers').doc(nweetObj.creatorId).get().then((value) => {
        setProfilePic(value.data()["photoURL"]);
        setNweetDisName(value.data()["displayName"]);
    });
    const youtubeID = extractVideoID(nweetObj.text);

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
        await dbService.doc(`nweets/${nweetObj.id}`).update({ text: newNweet }); //트윗 수정 
        setEditing(false);
    }
    const toggleEditing = () => setEditing((prev) => !prev);
    return ( 
        <div className="nweet">
            <div>
                <Link to={`/${nweetDisName}`} state= { {uid: nweetObj.creatorId, isOwner: isOwner} }>
                <img height="50" width="50" style={{verticalAlign: "top", border: "10px"}} src = {profilePic} />
                <span style={{fontWeight: "bold", fontSize: "25px"}}>&nbsp;{nweetDisName}</span>
                </Link>
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
                { //텍스트에 유투브 링크가 있다면 유투브 iframe 삽입
                    youtubeID && 
                    <iframe height="200px" style={{marginBottom: "10px"}} src={`https://www.youtube.com/embed/${youtubeID}`} frameborder="0" allowfullscreen />
                }
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