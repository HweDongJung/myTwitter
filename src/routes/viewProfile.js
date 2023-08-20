import React, { useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import { dbService, storageService } from "../myfb";

const ViewProfile = ({}) => {
    const location = useLocation();
    const [profilePic, setProfilePic] = useState("");
    const [nweetDisName, setNweetDisName] = useState("");
    const [introduce, setIntroduce] = useState("");
    dbService.collection('nweetusers').doc(location.state.uid).get().then((value) => {
        setProfilePic(value.data()["photoURL"]);
        setNweetDisName(value.data()["displayName"]);
        setIntroduce(value.data()["introduce"]);
    });

    return (
        <div>
            <img height="100" width="100" style={{verticalAlign: "top", border: "10px", marginBottom: "15px"}} src = {profilePic} />
            <div style={{fontSize: "20px", marginBottom: "10px", textAlign: "center"}}>{nweetDisName}</div>
            <div style={{fontSize: "20px"}}>{introduce}</div>
        </div>
        

    );


}

export default ViewProfile;