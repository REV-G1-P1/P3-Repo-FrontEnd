import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../Redux/Slices/UserSlice';
import { DispatchType, RootState } from '../../Redux/Store';
import { loginUser } from '../../Types/User';
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
        console.log(userState.isLoggedIn)
        if(userState.isLoggedIn)  {navigate("/home")};
    }, [userState.isLoggedIn])

    const handleLogin = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
       const user:loginUser ={
           email: email,
           password: password
         
       }   
        dispatch(login(user)).then(()=>{
            clearAllInputs();
        });
      
       // navigate("/home");
  };
    
  const  clearAllInputs = ()=>{
    let elements = document.getElementsByTagName("input");
    for (let i=0; i < elements.length; i++) {
    if (elements[i].type === "text") {
    elements[i].value = "";
  }
}
}

    return(
        <div className="login">
        
        <form name="loginForm" id="auth" onSubmit={handleLogin}>
            <h1 className="h1Auth">Login</h1>
            {userState.loginError ? <h3>Username or password incorrect</h3> : <></>}
            <label>Email</label>
            <input type="email" id= "email" name="email" placeholder="email address..." onChange={handleChange} required />
            <label>Password</label>
            <input type="password" id="password" maxLength={12} minLength={5} name="password" placeholder="password..." onChange={handleChange} required />
            <div className='loginFormSubmit'>
            <button id="login"  className="authentication" >Login</button>
            <Link to="/register" className="registerLinkFromLogin">register</Link></div>
            </form>
          
        </div>
    )


}