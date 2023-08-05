import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../myfb"

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); //로그인 상태인가에 대한 state, 기본 false, useState Hook으로 상태 초기화 
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
        
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });

  }, [])

  return (
  <>
    { init ? <AppRouter isLoggedIn={isLoggedIn} /> : "wait a min.." }
  </>
  ); 
}

export default App;
