import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import  './Address.css'
import { Link, useNavigate} from 'react-router-dom';
import { DispatchType, RootState } from '../../Redux/Store';
import { addressInformation, registerUser } from '../../Redux/Slices/UserSlice';
import { User } from '../../Types/User';
import { Addresses } from '../../Types/Addresses';


export const AddressPage:React.FC = () => {
let navigate = useNavigate();
    const userState = useSelector((state:RootState) => state.auth);
    const dispatch:DispatchType = useDispatch();
   console.log(JSON.stringify(userState.currentUser));
    const [address, setAddress] = useState<Addresses>({
        city: userState.currentUser.address.city,
        state: userState.currentUser.address.state,
        streetAddress: userState.currentUser.address.streetAddress,
        streetAddressLine2: userState.currentUser.address.streetAddressLine2,
        zipCode: userState.currentUser.address.zipCode
    });

    const [user, setUser] = useState<User>({
        firstName: userState.currentUser.firstName,
        lastName: userState.currentUser.lastName,
        email:userState.currentUser.email,
        password: userState.currentUser.password,
        phoneNumber: userState.currentUser.phoneNumber,
        ssn:userState.currentUser.ssn,
        address:address,
        accountInformation:[]
    
    });


    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setAddress({
            ...address,
            [e.target.name]:e.target.value
    });
    setUser({
        ...user,
       address:address
});
       
    }


    useEffect(()=>{
        
    }, [userState.currentUser])

    const handleRegisterAddress = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
      
        dispatch(addressInformation(address));
        console.log("zzzzzzzz "+JSON.stringify(user));
        dispatch(registerUser(user));
        console.log("inside address page dispatch " +userState.currentUser.email);
        console.log("inside address page dispatch "+userState.currentUser.address?.city);
            clearAllInputs();
            navigate("/login");
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
            <h1 className="h1Auth">Register Address</h1>
            {userState.registeredError  ? <h1 className="h1Auth">Email Already Exist</h1> : <></>}
            {userState.isRegistered  ? <h1 className="h1Auth">Please Login Now</h1> : <></>}
            <label>City</label>
            <input id= "city" name="city" placeholder="city" onChange={handleChange} required/>
            <label>State</label>
            <input id= "state" name="state" placeholder="state" onChange={handleChange} required/>
            <label>Street Address</label>
            <input id= "street_address" name="streetAddress" placeholder="street address" onChange={handleChange} required/>
            <label>Street Address Line 2</label>
            <input type="text" id="street_address_line_2" name="streetAddressLine2" placeholder="street address line 2" onChange={handleChange} required/>
            <label>Zip Code</label>
            <input type="number" id="zip_code" name="zipCode" placeholder="zip code" onChange={handleChange} required/>
            <div className='loginFormSubmit'>
            <button id="login" className="authentication" onClick={handleRegisterAddress}>Finish</button>
            <Link to="/login" className="registerLinkFromLogin">Login</Link></div>
           
            </form>
        </div>
    )


}