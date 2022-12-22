import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import  './Register.css'
import { Link, useNavigate} from 'react-router-dom';
import { DispatchType, RootState } from '../../Redux/Store';
import { registerUser, userInformation } from '../../Redux/Slices/UserSlice';
import { User } from '../../Types/User';
import { Addresses } from '../../Types/Addresses';
import { accountInformation, AccountType } from '../../Types/AccountInformation';


export const RegisterPage:React.FC = () => {
    let navigate = useNavigate();
    const userState = useSelector((state:RootState) => state.auth);
    const dispatch:DispatchType = useDispatch();

    const address:Addresses={
        city: '',
        state: '',
        streetAddress: '',
        streetAddressLine2: '',
        zipCode: 0
    }

    const [user, setUser] = useState<User>({
        firstName: '',
        lastName: '',
        email:'',
        password: '',
        ssn:0,
        address:address,
        accountInformation:[]
    
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
        dispatch(userInformation(user))
            navigate("/address");
            clearAllInputs();
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
           

            <form id="auth" onSubmit={handleRegisterUser}>
            <h1 className="h1Auth">Register</h1>
            {userState.registeredError  ? <h1 className="h1Auth">Email Already Exist</h1> : <></>}
            {userState.isRegistered  ? <h1 className="h1Auth">Please Login Now</h1> : <></>}
            <label>First Name</label>
            <input id= "first_name" name="firstName" placeholder="first name" onChange={handleChange} required/>
            <label>Last Name</label>
            <input id= "lastName" name="lastName" placeholder="last name" onChange={handleChange} required/>
            <label>Email</label>
            <input  type ="email" id= "email" name="email" placeholder="Your email" onChange={handleChange} required/>
            <label>Password</label>
            <input type="password" id="password" name="password" placeholder="password" onChange={handleChange} required/>
            <label>SSN</label>
            <input type="number" id="password"  maxLength={9}  name="ssn" placeholder="ssn" onChange={handleChange} required/>
            <div className='loginFormSubmit'>
            <button id="login" className="authentication" >Next</button>
            <Link to="/login" className="registerLinkFromLogin">Login</Link></div>
            
           
            </form>
        </div>
    )


}