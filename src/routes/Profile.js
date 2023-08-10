import React,{useEffect, useState} from "react";
import { authService, dbService } from "../myfb";
import { useNavigate } from "react-router-dom";

export default ( { userObj, refreshUser }) => {
    const navigate = useNavigate();
    const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
    refreshUser();
    };

const [disName,setDisName] = useState(userObj.displayName);

const getMyNweets = async () => {
    const myNweets = await dbService.collection("nweets").where("creatorId", "==", userObj.uid).orderBy("createdAt").get();
    console.log(myNweets.docs.map((doc) => doc.data()));
} 

useEffect(() => {
getMyNweets();
}, []);

const onSubmit = async (event) => { 
    event.preventDefault();
    if(userObj.displayName !== disName){
        await userObj.updateProfile({ displayName: disName});
        refreshUser();
    } 
    
}
const onChange = (event) => {
    const {target:{value}} = event;
    setDisName(value);
}

return (
    <div className="container">
        <form onSubmit={onSubmit} className="profileForm">
            <input tyoe="text" onChange={onChange} value={disName} autoFocus placeholder="Display Name" className="formInput" />
            <input type="submit" value={"Update Profile"} className="formBtn" style={{ marginTop: 10, }} />
        </form>
        <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>Log Out</span>
    </div>
);
};