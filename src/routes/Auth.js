import React, { useState } from "react";
import { authService } from "../myfb";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newaccount, setNewaccount] = useState(true);
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
               const data = await authService.Auth.signInWithEmailAndPassword(email, password);
               console.log(data);
            }
        } catch (error){
            console.log(error);
        }
    };
        
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name = "email" type="text" placeholder="Email" required value={email} onChange={onChange} />
                <input name = "password" type="password" placeholder="password" required value={password} onChange={onChange} />
                <input type="submit" value={newaccount ? "Create Account" : "Log In"} onSubmit={onSubmit} />
            </form>
            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>

        </div>
    )
};
export default Auth;