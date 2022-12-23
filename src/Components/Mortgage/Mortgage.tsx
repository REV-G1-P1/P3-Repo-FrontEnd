import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import  './Mortgage.css'
import { DispatchType, RootState } from '../../Redux/Store';
import { Mortgage } from '../../Types/Mortgage';
import { CreateMortgage } from '../../Redux/Slices/MortgageSlice';

export const MortgagePage:React.FC = () => {
    const userState = useSelector((state:RootState) => state.auth);
    const dispatch:DispatchType = useDispatch();

    const [getMortgage, setMortgage] = useState<Mortgage>({
        applicationId: 0,
        firstName: '',
        homeValue: 0,
        income: 0,
        lastName: '',
        loanAddress: '',
        loanAmount: 0,
        ssn: 0,
        status: ''
    
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
        dispatch(CreateMortgage(getMortgage))
           
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
           

            <form id="auth" onSubmit={handleCreateMortgage}>
            <h1 className="h1Auth">Create Mortgage Application</h1>
            {userState.registeredError  ? <h1 className="h1Auth"></h1> : <></>}
            {userState.isRegistered  ? <h1 className="h1Auth"></h1> : <></>}
            <label>First Name</label>
            <input id= "first_name" name="firstName" placeholder="first name" onChange={handleChange} required/>
            <label>Last Name</label>
            <input id= "lastName" name="lastName" placeholder="last name" onChange={handleChange} required/>
            <label>Income</label>
            <input type="number" id="password"  name="income" placeholder="income" onChange={handleChange} required/>
            <label>Home Value</label>
            <input type="number" id="password"  name="homeValue" placeholder="home value" onChange={handleChange} required/>
            <label>Loan Address</label>
            <input  type ="text" id= "email" name="loanAddress" placeholder="loan address" onChange={handleChange} required/>
            <label>Loan Amount</label>
            <input type="number" id="password" name="loanAmount" placeholder="loan amount" onChange={handleChange} required/>
            <label>SSN</label>
            <input type="number" id="password"  maxLength={9}  name="ssn" placeholder="ssn" onChange={handleChange} required/>
            <div className='loginFormSubmit'>
            <button id="login" className="authentication" >Submit</button>
            </div>
            
           
            </form>
        </div>
    )


}