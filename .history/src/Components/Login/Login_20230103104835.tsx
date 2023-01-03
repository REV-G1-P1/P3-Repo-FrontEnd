import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../Redux/Slices/UserSlice';
import { DispatchType, RootState } from '../../Redux/Store';
import { loginUser } from '../../Types/User';
import './Login.css';
export const LoginPage:React.FC= () => {

    let navigate = useNavigate();
    const userState = useSelector((state:RootState) => state.auth);
    const dispatch:DispatchType = useDispatch();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [valError, setValError] = useState<string>("");

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.name === "email") {
            setEmail(e.target.value);
        } else {
            setPassword(e.target.value);
        }
    }

    useEffect(() => {
        console.log(userState.isLoggedIn);
        if(userState.isLoggedIn) {navigate("/authentication")};
    }, [userState.isLoggedIn])

    const handleLogin = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const user:loginUser = {
           email: email,
           password: password
        }
        dispatch(login(user)).then(() => {
            clearAllInputs();
        });
       // navigate("/home");
    };
    
    const clearAllInputs = () => {
        const elements = Array.from(document.getElementsByTagName("input"));
        for (const element of elements) {
            if (element.type === "text") {
                element.value = "";
            }
        }
    }

    return (
        <div className="login">
            <form className="credentialsForm" name="loginForm" id="auth" onSubmit={handleLogin}>
                <h1>Login</h1>

                {userState.loginError ? <h3>Username or password incorrect</h3> : <></>}

                <label>Email</label>
                <input type="email" 
                    id= "email" 
                    name="email" 
                    onInvalid={() => {setValError("Please a valid email")}}
                    onInput={() => {setValError('')}}
                    placeholder="email address..." 
                    onChange = {handleChange} 
                    required
                />
                
                <label>Password</label>
                <input type="password" 
                    id="password" 
                    onInvalid={() => {setValError("Please enter a strong password")}}
                    onInput={() => {setValError('')}}
                    name="password" 
                    placeholder="password..." 
                    onChange={handleChange} 
                    required 
                />

                <div className='credentialsFormSubmit'>
                    <button id="credentialsBtn">Login</button>
                    <Link to="/register" className="registerLinkFromLogin">Register</Link>
                </div>
            </form>
        </div>
    )
}