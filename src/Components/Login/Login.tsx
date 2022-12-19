import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../Redux/Slices/UserSlice';
import { DispatchType, RootState } from '../../Redux/Store';
import { User } from '../../Types/User';
import './Login.css'
export const LoginPage:React.FC= ()=>{
    let navigate = useNavigate();
    const userState = useSelector((state:RootState) => state.auth);
    const dispatch:DispatchType = useDispatch();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.name === "email"){
            setEmail(e.target.value);
        } else {
            setPassword(e.target.value);
        }
    }

    useEffect(()=>{
        if(userState.isLoggedIn)  navigate("/list");
    }, [userState.isLoggedIn])

    const handleLogin = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
       const user:User ={
           email: email ,
           password: password
           }   
        dispatch(login(user)).then(()=>{
            clearAllInputs();
        });
  };
    
  const  clearAllInputs = ()=>{
    var elements = document.getElementsByTagName("input");
for (var ii=0; ii < elements.length; ii++) {
  if (elements[ii].type === "text") {
    elements[ii].value = "";
  }
}
}

    return(
        <div className="login">
        
            <form id="auth">
            <h1 className="h1Auth">Login</h1>
            {userState.loginError ? <h3>Username or password incorrect</h3> : <></>}
            <label>Email</label>
            <input id= "email" name="email" placeholder="Your email" onChange={handleChange}/>
            <label>Password</label>
            <input type="password" id="password" name="password" placeholder="Your password" onChange={handleChange}/>
            <div className='loginFormSubmit'>
            <button id="login" className="authentication" onClick={handleLogin}>Login</button>
            <Link to="/register" className="registerLinkFromLogin">register</Link></div>
            </form>
          
        </div>
    )


}