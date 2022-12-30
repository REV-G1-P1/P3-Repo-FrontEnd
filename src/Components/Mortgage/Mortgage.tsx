import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import  './Mortgage.css';
import { DispatchType, RootState } from '../../Redux/Store';
import { MortgageApplication } from '../../Types/Mortgage';
import { CreateMortgage } from '../../Redux/Slices/MortgageSlice';
import { getUsers } from '../../Redux/Slices/UserSlice';
import { useNavigate } from 'react-router-dom';

export const MortgagePage:React.FC = () => {

    const userState = useSelector((state:RootState) => state.auth);
    const dispatch:DispatchType = useDispatch();
    let navigate = useNavigate();
    const [getMortgage, setMortgage] = useState<MortgageApplication>({
        applicationId: 0,
        firstName:userState.isLoggedIn? userState.currentUser.firstName:'' ,
        homeValue: 0,
        income: 0,
        lastName: userState.isLoggedIn? userState.currentUser.lastName:'' ,
        loanAddress: '',
        loanAmount: 0,
        ssn: userState.isLoggedIn? userState.currentUser.ssn:'' ,
        status: 'PENDING'
    });

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setMortgage({
            ...getMortgage,
            [e.target.name]:e.target.value
        });
    }

    useEffect(()=>{
      
    }, [])

    const handleCreateMortgage = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log(JSON.stringify(getMortgage));
        dispatch(CreateMortgage(getMortgage))
        .then(() => dispatch(getUsers()).then(()=>   navigate('/home')));
           // clearAllInputs();
    }

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
            <form id="auth" onSubmit={handleCreateMortgage}>
                <h1 className="h1Auth">Create Mortgage Application</h1>

                {userState.registeredError  ? <h1 className="h1Auth"></h1> : <></>}
                {userState.isRegistered  ? <h1 className="h1Auth"></h1> : <></>}
                <label>First Name</label>
                <input id= "first_name" 
                    name="firstName" 
                    placeholder="first name" 
                    value={userState.isLoggedIn ? userState.currentUser.firstName : ""}
                    onChange={handleChange} 
                    required
                />

                <label>Last Name</label>
                <input id= "lastName" 
                    name="lastName" 
                    placeholder="last name" 
                    value={userState.isLoggedIn ? userState.currentUser.lastName:''}
                    onChange={handleChange} 
                    required
                />
                <label>Income</label>
                <input type="number" id="password"  name="income" placeholder="income" onChange={handleChange} required/>

                <label>Home Value</label>
                <input type="number" id="password"  name="homeValue" placeholder="home value" onChange={handleChange} required/>

                <label>Loan Address</label>
                <input  type ="text" id= "email" name="loanAddress" placeholder="loan address" onChange={handleChange} required/>

                <label>Loan Amount</label>
                <input type="number" id="password" name="loanAmount" placeholder="loan amount" onChange={handleChange} required/>

                <label>SSN</label>
                <input type="number" 
                    id="password"  
                    maxLength={9}  
                    name="ssn" 
                    placeholder="ssn" 
                    value={userState.isLoggedIn? userState.currentUser.ssn:''}
                    onChange={handleChange} 
                    required
                />

                <div className='loginFormSubmit'>
                    <button id="login" className="authentication" >Submit</button>
                </div>
            </form>
        </div>
    )
}