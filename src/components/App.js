import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../myfb"

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); //로그인 상태인가에 대한 state, 기본 false, useState Hook으로 상태 초기화 
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args), //함수의 기능 승계 
        });

        if(user.displayName == null) user.updateProfile({ displayName: "Jung"})
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });

  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
  }

  return (
  <>
    { init ? <AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObj={userObj} /> : "wait a min.." }
  </>
  ); 
}

export default App;
