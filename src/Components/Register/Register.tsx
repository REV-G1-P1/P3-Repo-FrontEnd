import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import  './Register.css'
import { Link} from 'react-router-dom';
import { DispatchType, RootState } from '../../Redux/Store';
import { register } from '../../Redux/Slices/UserSlice';
import { User } from '../../Types/User';


export const RegisterPage:React.FC = () => {

    const userState = useSelector((state:RootState) => state.auth);
    const dispatch:DispatchType = useDispatch();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.name === "email"){
            setEmail(e.target.value);
        } else if(e.target.name === "name"){
            setName(e.target.value);
        }else {
            setPassword(e.target.value);
        }
    }


    useEffect(()=>{
      
    }, [userState.isLoggedIn])

    const handleRegister = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
       const user:User ={
           email: email,
           password: password,
           name: name
       }   
        dispatch(register(user)).then(()=>{
            clearAllInputs();
        });
        
    }

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
            <h1 className="h1Auth">Register</h1>
            {userState.registeredError  ? <h1 className="h1Auth">Email Already Exist</h1> : <></>}
            {userState.isRegistered  ? <h1 className="h1Auth">Please Login Now</h1> : <></>}
            <label>Name</label>
            <input id= "name" name="name" placeholder="Your name" onChange={handleChange}/>
            <label>Email</label>
            <input id= "email" name="email" placeholder="Your email" onChange={handleChange}/>
            <label>Password</label>
            <input type="password" id="password" name="password" placeholder="Your password" onChange={handleChange}/>
            <div className='loginFormSubmit'>
            <button id="login" className="authentication" onClick={handleRegister}>Register</button>
            <Link to="/login" className="registerLinkFromLogin">Login</Link></div>
           
            </form>
        </div>
    )


}