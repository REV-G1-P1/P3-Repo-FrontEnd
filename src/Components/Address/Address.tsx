import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import  './Address.css';
import { Link, useNavigate} from 'react-router-dom';
import { DispatchType, RootState } from '../../Redux/Store';
import { addressInformation, registerUser } from '../../Redux/Slices/UserSlice';
import { User } from '../../Types/User';
import { Addresses } from '../../Types/Addresses';


export const AddressPage:React.FC = () => {

    let navigate = useNavigate();
    const userState = useSelector((state:RootState) => state.auth);
    const dispatch:DispatchType = useDispatch();

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
        accountInformation:[],
        mortgageApplication:[],
        transactions:[]
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

    const handleStateChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        setAddress({
            ...address,
            [event.target.name]:event.target.value
        });
        setUser({
            ...user,
            address:address
        });
    }


    useEffect(()=>{
        if(userState.isLoggedIn) navigate('/home')
    }, [userState.currentUser])

    const handleRegisterAddress = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
      
        dispatch(addressInformation(address));
        console.log("zzzzzzzz " + JSON.stringify(user));
        dispatch(registerUser(user));
        console.log("inside address page dispatch " + userState.currentUser.email);
        console.log("inside address page dispatch "+ userState.currentUser.address?.city);
        clearAllInputs();
        navigate("/login");
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
        <div className="addressContainer">
            <form id="addressForm">
                <h1>Register Address</h1>
                <label>City</label>
                <input id= "city" name="city" placeholder="city" onChange={handleChange} required/>

                <label>State</label>
                <select id="state" name="state" onChange={handleStateChange} required>
                    <option value="">Select a state</option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                </select>

                <label>Street Address</label>
                <input id= "street_address" name="streetAddress" placeholder="street address" onChange={handleChange} required/>

                <label>Street Address Line 2</label>
                <input type="text" id="street_address_line_2" name="streetAddressLine2" placeholder="street address line 2" onChange={handleChange} required/>

                <label>Zip Code</label>
                <input type="number" id="zip_code" name="zipCode" placeholder="zip code" onChange={handleChange} required/>

                <div className='addressFormSubmit'>
                <button id="addressSubmitButton" onClick={handleRegisterAddress}>Finish</button>
                
                <Link to="/login" className="addressLinkFromLogin">Login</Link></div>
            </form>
        </div>
    )
}