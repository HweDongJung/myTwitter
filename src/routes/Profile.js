import React,{useEffect, useState} from "react";
import { authService, dbService, storageService } from "../myfb";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default ( { userObj, refreshUser }) => {
    const navigate = useNavigate();
    const [picFile,setPicFile] = useState("");
    const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
    refreshUser();
    };

const [disName,setDisName] = useState(userObj.displayName);
const [introduce, setIntroduce] = useState("");

dbService.collection('nweetusers').doc(userObj.uid).get().then((value) => {
    setIntroduce(value.data()["introduce"]);
});

const getMyNweets = async () => {
    const myNweets = await dbService.collection("nweets").where("creatorId", "==", userObj.uid).orderBy("createdAt").get();
} 

useEffect(() => {
getMyNweets();
}, []);

const onSubmit = async (event) => { 
    event.preventDefault();
    if(userObj.displayName !== disName){
        await userObj.updateProfile({ displayName: disName});
        await dbService.doc(`nweetusers/${userObj.uid}`).update({ displayName: disName });
        refreshUser();
    } 
    
}
const onChange = (event) => {
    const {target:{value}} = event;
    setDisName(value);
}

const onSubmitPic = async (event) => {
    event.preventDefault();
    let fileUrl;
    if(picFile !== ""){
        const fileRef = storageService.ref().child(`profilePics/${userObj.uid}`); //프사 저장 
        const response = await fileRef.putString(picFile, "data_url");
        fileUrl = await response.ref.getDownloadURL(); //fileUrl = 프사 url
        //console.log(fileUrl);
        if(userObj.photoURL !== picFile){
            await userObj.updateProfile({photoURL: fileUrl});
            await dbService.doc(`nweetusers/${userObj.uid}`).update({ photoURL: fileUrl });
            refreshUser();
            window.location.replace("/");
        } 
    }
}
const onChangePicture = (event) => {
    const {
        target: {files},
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) =>{
        const {currentTarget: {result}} = finishedEvent;
        setPicFile(result);
    }
    reader.readAsDataURL(theFile);
}

return (
    <div className="container">
        <div style={{justifyContent: "center",alignItems: "center", display: "flex", marginBottom: "20px"}}>{introduce}</div>
        <form onSubmit={onSubmit} className="profileForm">
            <input type="text" onChange={onChange} value={disName} autoFocus placeholder="Display Name" className="formInput" />
            <input type="submit" value={"Update Profile Name"} className="formBtn" style={{ marginTop: 10, }} />
        </form>

        { picFile && //사용자가 사진을 등록했을때  
                <div style={{justifyContent: "center",alignItems: "center", display: "flex", fontSize: "20px", marginTop: "10px"}}>
                    <img width={"60px"} height={"60px"} src={picFile} style={{backgroundImage: picFile,}} />
                </div> 
        }

        <form onSubmit={onSubmitPic}>
            <label htmlFor="attach-file" className="factoryInput__label">
            <span style={{justifyContent: "center",alignItems: "center", display: "flex", fontSize: "20px", marginTop: "15px"}}>
                Change photo &nbsp;<FontAwesomeIcon icon={faPlus} />
            </span>
            </label>
            <input id="attach-file" type="file" accept="image/*" onChange={onChangePicture} style={{opacity: 0,}} />
            <input type="submit" value={"Update Profile Picture"} className="formBtn" style={{ marginTop: 10, }} />
        </form>
        <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>Log Out</span>
    </div>
);
};