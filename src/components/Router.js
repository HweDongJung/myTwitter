import React, { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom"
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

//유저의 상태, 동작에 따른 페이지 라우팅을 담당하는 코드 

const AppRouter = ({ isLoggedIn }) => {
    
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Routes>
                {isLoggedIn ? 
                <>
                    <Route exact path="/" element={<Home />}></Route>
                    <Route exact path="/Profile" element={<Profile />}></Route> 
                </> 
                : <Route exact path="/" element={<Auth />}></Route>
                } 
            </Routes> 

        </Router>
    ) 
}

export default AppRouter;