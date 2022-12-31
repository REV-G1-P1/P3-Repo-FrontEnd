import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import  './Register.css';
import { Link, useNavigate} from 'react-router-dom';
import { DispatchType, RootState } from '../../Redux/Store';
import {  userInformation } from '../../Redux/Slices/UserSlice';
import { User } from '../../Types/User';
import { Addresses } from '../../Types/Addresses';


export const RegisterPage:React.FC = () => {

    let navigate = useNavigate();
    const userState = useSelector((state:RootState) => state.auth);
    const dispatch:DispatchType = useDispatch();

    const address:Addresses = {
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
        phoneNumber:0,
        ssn:0,
        address:address,
        accountInformation:[],
        mortgageApplication:[],
        transactions:[]
    });

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]:e.target.value
        });
    }

    useEffect(() => {
        if(userState.isLoggedIn) navigate('/home')
    }, [userState.isLoggedIn])

    const handleRegisterUser = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        dispatch(userInformation(user))
        navigate("/address");
        clearAllInputs();
    }

    const  clearAllInputs = () => {
        const elements = Array.from(document.getElementsByTagName("input"));
        for (const element of elements) {
            if (element.type === "text") {
                element.value = "";
            }
        }
    }

    return (
        <form id="registerForm" onSubmit={handleRegisterUser}>
            <h1>Registration</h1>
            <div id="registerFormContainer">
                <label>First Name</label>
                <input name="firstName" placeholder="First Name" onChange={handleChange} required/>

                <label>Last Name</label>
                <input name="lastName" placeholder="Last Name" onChange={handleChange} required/>

                <label>Email</label>
                <input type ="email" name="email" placeholder="Email" onChange={handleChange} required/>

                <label>Password</label>
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required/>

                <label>Phone Number</label>
                <input type="number" maxLength={9} name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required/>

                <label>Social Security #</label>
                <input type="number" maxLength={9} name="ssn" placeholder="Social Security #" onChange={handleChange} required/>
            </div>
            <div className='registerFormSubmit'>
                <button className="registerNextButton">Next</button>
                <Link className="linkButtonToLogin" to="/login">Login</Link>
            </div>
        </form>
    )
}