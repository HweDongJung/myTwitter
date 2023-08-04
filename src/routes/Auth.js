import React, { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
    const onSubmit = (event) =>{
        event.preventDefault();
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name = "email" type="text" placeholder="Email" required value={email} onChange={onChange} />
                <input name = "password" type="password" placeholder="password" required value={password} onChange={onChange} />
                <input type="submit" value="Log In" />
            </form>
            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>

        </div>
    )
};
export default Auth;