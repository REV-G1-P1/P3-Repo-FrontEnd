import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import  './Address.css'
import { Link, useNavigate} from 'react-router-dom';
import { DispatchType, RootState } from '../../Redux/Store';
import { registerAddress, registerUser } from '../../Redux/Slices/UserSlice';
import { User } from '../../Types/User';
import { Addresses } from '../../Types/Addresses';


export const AddressPage:React.FC = () => {
let navigate = useNavigate();
    const userState = useSelector((state:RootState) => state.auth);
    const dispatch:DispatchType = useDispatch();
    const [address, setAddress] = useState<Addresses>({
        city:'',
        state:'', 
        street_address:'',
        street_address_line_2:'',
        zip_code: 0
    });

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setAddress({
            ...address,
            [e.target.name]:e.target.value
    });
       
    }


    useEffect(()=>{
      
    }, [userState.isLoggedIn])

    const handleRegisterAddress = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
      
        // dispatch(registerAddress(address)).then(()=>{
        //     
        //     clearAllInputs();
        // });
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
            <input id= "city" name="city" placeholder="city" onChange={handleChange}/>
            <label>State</label>
            <input id= "state" name="state" placeholder="state" onChange={handleChange}/>
            <label>Street Address</label>
            <input id= "street_address" name="street_address" placeholder="street address" onChange={handleChange}/>
            <label>Street Address Line 2</label>
            <input type="text" id="street_address_line_2" name="street_address_line_2" placeholder="street address line 2" onChange={handleChange}/>
            <label>Zip Code</label>
            <input type="number" id="zip_code" name="zip_code" placeholder="zip code" onChange={handleChange}/>
            <div className='loginFormSubmit'>
            <button id="login" className="authentication" onClick={handleRegisterAddress}>Finish</button>
            <Link to="/login" className="registerLinkFromLogin">Login</Link></div>
           
            </form>
        </div>
    )


}