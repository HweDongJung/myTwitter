import React, { useState } from "react";
import { dbService, authService } from "../myfb";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newaccount, setNewaccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (event) => { //로그인 항목에 작성 시 발생하는 event, 로그인 항목에 버튼을 누를 때 마다 발생
        const {
            target: { name, value }, //target에서 name과 value 받아오기
        } = event;
        if (name === "email"){
            setEmail(value);
        } else {
            setPassword(value);
        }
    };
    const onSubmit = async(event) =>{ //Log In 버튼을 눌렀을때 이벤트, newaccount의 state가 true일때는 회원가입, false일때는 로그인 
        event.preventDefault(); 
        try{
            
            if(newaccount){ //create new account
               const newUserData = await authService.createUserWithEmailAndPassword(email, password);
               dbService.collection("nweetusers").doc(newUserData.user.uid).set({
                displayName: "New_user",
                photoURL: "https://firebasestorage.googleapis.com/v0/b/mytwitter-cfff0.appspot.com/o/default.png?alt=media&token=623ad82c-3e72-4a3c-84eb-c95ebbeafe19",
                uid: newUserData.user.uid
            });
            } else {
               const data = await authService.signInWithEmailAndPassword(email, password);
               console.log(data);
            }
        } catch (error){
            setError(error.message);
        }
    };
    const toggleAccount = () => setNewaccount(prev => !prev);
    return (
        <>
        <form onSubmit={onSubmit} className="container">
                <input name = "email" type="text" placeholder="Email" required value={email} onChange={onChange} className="authInput"/>
                <input name = "password" type="password" placeholder="password" required value={password} onChange={onChange} className="authInput"/>
                <input type="submit" value={newaccount ? "Create Account" : "Sign In"} onSubmit={onSubmit} className="authInput"/>
                {error && <span className="authError">{error}</span>}
            </form>
            <span onClick={toggleAccount} className="authSwitch">{newaccount ? "Sign In" : "Create Account" }</span>
        </>
    );
};

export default AuthForm;