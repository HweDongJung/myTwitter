import React, { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom"
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

//유저의 상태, 동작에 따른 페이지 라우팅을 담당하는 코드 

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj}/>}
            <div style={{maxWidth: 890, width: "100%", margin: "0 auto", marginTop: 80, display: "flex", justifyContent: "center",}}>               
                <Routes>
                    {isLoggedIn ? 
                    <>
                        <Route exact path="/" element={<Home userObj={userObj} />} />
                        <Route exact path="/Profile" element={<Profile userObj={userObj} refreshUser={refreshUser} />} />
                    </>
                    : 
                    <>
                        <Route exact path="/" element={<Auth />} />
                    </>
                    } 
                </Routes> 
            </div>
        </Router>
    ) 
}

export default AppRouter;