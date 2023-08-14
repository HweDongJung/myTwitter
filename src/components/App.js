import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { dbService, authService } from "../myfb"
import { waitFor } from "@testing-library/react";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); //로그인 상태인가에 대한 state, 기본 false, useState Hook으로 상태 초기화 
  const [userObj, setUserObj] = useState(null);
  const [profileUrl, setProfileUrl] = useState("");
  
  
  useEffect(() => {
    authService.onAuthStateChanged( (user) => {
      if(user){
        dbService.collection('nweetusers').doc(user.uid).get().then((value) => {
          setProfileUrl(value.data()["photoURL"]);
        });
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args), //함수의 기능 승계 
        });

        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });

  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    dbService.collection('nweetusers').doc(user.uid).get().then((value) => {
      setProfileUrl(value.data()["photoURL"]);
    });
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args), //함수의 기능 승계 
    });
  }

  return (
  <>
    { init ? <AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObj={userObj} profileUrl={profileUrl}/> : "wait a min.." }
  </>
  ); 
}

export default App;
