import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { authService, firebaseInstance } from "../myfb";
import AuthForm from "../components/AuthForm";

const Auth = () => {
    
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

    return ( //AuthForm에서 OAuth 기능을 제외한 로그인 기능에 대한 코드 clean
        <div className="authContainer">
            <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="3x" style={{ marginBottom: 30 }} />
            <AuthForm /> 
            <div className="authBtns">
                <button onClick={onSocialClick} name="google" className="authBtn">Continue with Google <FontAwesomeIcon icon={faGoogle} /></button>
                <button onClick={onSocialClick} name="github" className="authBtn">Continue with Github <FontAwesomeIcon icon={faGithub} /></button>
            </div>
        </div>
    )
};
export default Auth;