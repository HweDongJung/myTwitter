import React, { useState } from "react";
import { authService, firebaseInstance } from "../myfb";

const Auth = () => {
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
            
            if(newaccount){
               const data = await authService.createUserWithEmailAndPassword(email, password);
               console.log(data);
            } else {
               const data = await authService.signInWithEmailAndPassword(email, password);
               console.log(data);
            }
        } catch (error){
            setError(error.message);
        }
    };
    const toggleAccount = () => setNewaccount(prev => !prev);
    const onSocialClick = async (event) => {
        console.log(event.target.name);
        let provider;
        const {target:{name}, } = event;
        if(name === "google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name = "email" type="text" placeholder="Email" required value={email} onChange={onChange} />
                <input name = "password" type="password" placeholder="password" required value={password} onChange={onChange} />
                <input type="submit" value={newaccount ? "Create Account" : "Sign In"} onSubmit={onSubmit} />
                {error}
            </form>
            <span onClick={toggleAccount}>{newaccount ? "Sign In" : "Create Account" }</span>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Continue with Github</button>
            </div>
        </div>
    )
};
export default Auth;