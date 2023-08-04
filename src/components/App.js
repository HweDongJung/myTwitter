import React, { useState } from "react";
import AppRouter from "./Router";
import { authService } from "../myfb"

function App() {
  console.log(authService.currentuser);
  const [isLoggedIn, setIsLoggedIn] = useState(false); //로그인 상태인가에 대한 state, 기본 false, useState Hook으로 상태 초기화 
  return (
  <AppRouter isLoggedIn={isLoggedIn} />
  ); 
}

export default App;
