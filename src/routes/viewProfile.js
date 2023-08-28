import React, { useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import { dbService, storageService } from "../myfb"; 
import { arrayService } from "../myfb";


const ViewProfile = () => {
    const location = useLocation();
    const [profilePic, setProfilePic] = useState("");
    const [nweetDisName, setNweetDisName] = useState("");
    const [introduce, setIntroduce] = useState("");
    dbService.collection('nweetusers').doc(location.state.uid).get().then((value) => {
        setProfilePic(value.data()["photoURL"]);
        setNweetDisName(value.data()["displayName"]);
        setIntroduce(value.data()["introduce"]);
    });
    const onSubmitFollow = async (event) => {
        event.preventDefault();
        dbService.collection('nweetusers').doc('Evd8hqiu81YGS5QNM5s8UAlZUTG3').update({'followers': arrayService.arrayUnion("dqweqe")});

    }

    return (
        <div>
            <img height="100" width="100" style={{verticalAlign: "top", border: "10px", marginBottom: "15px"}} src = {profilePic} />
            <div style={{fontSize: "20px", marginBottom: "10px", textAlign: "center"}}>{nweetDisName}</div>
            <div style={{fontSize: "20px"}}>{introduce}</div>

            {!location.state.isOwner && //자기 자신이 아니라면 follow 버튼 생성
            <form onSubmit={onSubmitFollow}>
                <input type="submit" value={"Follow"} className="formBtn" style={{ marginTop: 10, }} />
            </form>}
        </div>
        

    );


}

export default ViewProfile;