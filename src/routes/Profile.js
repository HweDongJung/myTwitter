import React from "react";
import { authService } from "../myfb";
import { useNavigate } from "react-router-dom";

export default () => {
    const navigate = useNavigate();
    const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
};
return (
    <>
        <button onClick={onLogOutClick}>Log Out</button>
        <span>Profile</span>
    </>
);
};