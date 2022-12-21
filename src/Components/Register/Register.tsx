import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import  './Register.css'
import { Link, Navigate, useNavigate} from 'react-router-dom';
import { DispatchType, RootState } from '../../Redux/Store';
import { registerUser } from '../../Redux/Slices/UserSlice';
import { User } from '../../Types/User';


export const RegisterPage:React.FC = () => {
    let navigate = useNavigate();
    const userState = useSelector((state:RootState) => state.auth);
    const dispatch:DispatchType = useDispatch();
    const [user, setUser] = useState<User>({
        first_name: '',
        last_name: '',
        email:'',
        password: '',
        ssn:0,
        
        
    });

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]:e.target.value
    });
       
    }


    useEffect(()=>{
      
    }, [userState.isLoggedIn])

    const handleRegisterUser = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // dispatch(registerUser(user)).then(()=>{
        //     navigate("/address");
        //     clearAllInputs();
        // });
        navigate("/address");
        
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
            <label>First Name</label>
            <input id= "first_name" name="first_name" placeholder="first name" onChange={handleChange}/>
            <label>Last Name</label>
            <input id= "last_name" name="last_name" placeholder="last name" onChange={handleChange}/>
            <label>Email</label>
            <input id= "email" name="email" placeholder="Your email" onChange={handleChange}/>
            <label>Password</label>
            <input type="password" id="password" name="password" placeholder="password" onChange={handleChange}/>
            <label>SSN</label>
            <input type="password" id="password" name="ssn" placeholder="ssn" onChange={handleChange}/>
            <div className='loginFormSubmit'>
            <button id="login" className="authentication" onClick={handleRegisterUser}>Next</button>
            <Link to="/login" className="registerLinkFromLogin">Login</Link></div>
            
           
            </form>
        </div>
    )


}