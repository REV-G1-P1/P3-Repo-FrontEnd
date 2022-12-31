import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { getPendingMortgages } from "../../Redux/Slices/ManagerSlice";
import { loginWithToken } from "../../Redux/Slices/UserSlice";
import { DispatchType, RootState } from "../../Redux/Store";

const TwoFactorAuth = () => {

    const dispatch:DispatchType = useDispatch();
    const navigate = useNavigate();
    const userState = useSelector((state:RootState) => state.auth);
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

    useEffect(() => {
        console.log(userState.isLoggedIn)
        if(userState.isAuthenticated)
        {
            console.log("user role " + userState.currentUser.userRole);
        if(userState.currentUser.userRole === "CUSTOMER")
            navigate("/home");
        else {
            dispatch(getPendingMortgages());
            navigate("/manager");
        }
        }
    }, [userState.isAuthenticated])
    
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
export default TwoFactorAuth;