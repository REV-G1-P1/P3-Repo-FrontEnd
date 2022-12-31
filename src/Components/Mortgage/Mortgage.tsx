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

    const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMortgage({
            ...getMortgage,
            [event.target.name]:event.target.value
        });
      }

    useEffect(()=>{
        if(!userState.isLoggedIn) navigate('/login')
        if(userState.currentUser.userRole !== "CUSTOMER")navigate("/home");
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
        <div>
            <form id="mortgageApplicationForm" onSubmit={handleCreateMortgage}>
                <h1>Mortgage Application</h1>
                <div className="applicationContainer">
                    {userState.registeredError  ? <h1 className="h1Auth"></h1> : <></>}
                    {userState.isRegistered  ? <h1 className="h1Auth"></h1> : <></>}
                    <div className="leftApplication">
                        <label>First Name</label>
                        <input id= "first_name" 
                            name="firstName" 
                            placeholder="First Name" 
                            value={userState.isLoggedIn ? userState.currentUser.firstName : ""}
                            onChange={handleChange} 
                            required
                        />

                        <label>Income</label>
                        <input type="number" id="password"  name="income" placeholder="Income" onChange={handleChange} required/>

                        <label>Home Value</label>
                        <input type="number" id="password"  name="homeValue" placeholder="Home Value" onChange={handleChange} required/>
                    </div>

                    <div className="rightApplication">
                        <label>Last Name</label>
                        <input id= "lastName" 
                            name="lastName" 
                            placeholder="Last Name" 
                            value={userState.isLoggedIn ? userState.currentUser.lastName:''}
                            onChange={handleChange} 
                            required
                        />

                        <label>Social Security Number</label>
                        <input type="number" 
                            id="password"  
                            maxLength={9}  
                            name="ssn" 
                            placeholder="Social Security Number" 
                            value={userState.isLoggedIn? userState.currentUser.ssn:''}
                            onChange={handleChange} 
                            required
                        />

                        <label>Loan Amount</label>
                        <input type="number" id="password" name="loanAmount" placeholder="Loan Amount" onChange={handleChange} required/>
                    </div>

                </div>
                <label>Loan Address</label>
                <textarea rows={3} name="loanAddress" placeholder="Loan Address..." onChange={handleTextAreaChange} required/>

                <div className='mortgageApplicationSubmit'>
                    <button id="mortgageApplicationSubmit">Submit</button>
                </div>
            </form>
        </div>
    )
}