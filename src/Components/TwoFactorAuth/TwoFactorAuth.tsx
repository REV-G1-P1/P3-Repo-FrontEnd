import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { loginWithToken } from "../../Redux/Slices/UserSlice";
import { DispatchType } from "../../Redux/Store";
import { loginUser } from "../../Types/User";

const TwoFactorAuth = () => {

    const dispatch:DispatchType = useDispatch();

    const [token, setToken] = useState<number>(0);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.name === "token"){
            setToken(Number(e.target.value));
        }
    }

    const handleLogin = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        dispatch(loginWithToken(token)).then(()=>{
            
        });
      
       // navigate("/home");
    };

  return (
    <div className="login">
        <form name="loginForm" id="auth" onSubmit={handleLogin}>
            <h1 className="">Verification Token:</h1>
            <input type="number" id="token" name="token" placeholder="token..." onChange={handleChange} required />
            <div className='loginFormSubmit'>
                <button id="login"  className="authentication">Login</button>
            </div>
            </form>
          
        </div>
  )
}

export default TwoFactorAuth