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
    authService.onAuthStateChanged((user) => {
      if(user){
        //console.log(user);
        if(user.displayName == null) user.updateProfile({ displayName: "New_user" });   
        if(user.photoURL == null) user.updateProfile({photoURL: "https://firebasestorage.googleapis.com/v0/b/mytwitter-cfff0.appspot.com/o/default.png?alt=media&token=623ad82c-3e72-4a3c-84eb-c95ebbeafe19"})
        
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          photoURL: user.photoURL,
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
    { init ? <AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObj={userObj}/> : "wait a min.." }
  </>
  ); 
}

export default App;
