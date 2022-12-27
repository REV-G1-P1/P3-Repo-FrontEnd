import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { Addresses } from "../../Types/Addresses";
import { remoteUrl } from "../../Types/URL";
import { loginUser, User } from "../../Types/User";

export interface AuthState{
    isLoggedIn:boolean,
    isRegistered:boolean,
    registeredError: boolean,
    loginError: boolean,
    currentUser: User,
}
const address:Addresses={
    city: "",
    state: "",
    streetAddress: "",
    streetAddressLine2: "",
    zipCode: 0
}

const person:User={
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    ssn: 0,
    address: address,
    accountInformation: []
}

const initialState:AuthState =  {
    isLoggedIn: false, registeredError: false, loginError: false, currentUser: person,
    isRegistered: false,
};

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async(user:User, thunkAPI) => {
        try{
            const res = await axios.post(`${remoteUrl}/users/register`, user);
            return res.data;
        } catch(e) {
            return thunkAPI.rejectWithValue('Email Already Exist');
        }
    }
);
export const login = createAsyncThunk(
    'user/login',
    async(user:loginUser, thunkAPI) => {
        try{    
            const res = await axios.post(`${remoteUrl}/login`, user);
            document.cookie= `SESSION=${res.data.message}`;
           return res.data;
         
        } catch(e) {
            return thunkAPI.rejectWithValue('Incorrect username or password');
        }
    }
);

export const logoutUser = createAsyncThunk(
    'user/logout',
    async(thunkAPI) => {
        try{    
            const res = await axios.get(`${remoteUrl}/log-out/${document.cookie.slice(8)}`);
        
           console.log(res.data);
         
        } catch(e) {
           
        }
    }
);

export const personSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      
        userInformation: (state, actions) => {
            
            state.currentUser=actions.payload;
    
            return state;
        },
        updateLocalBalance: (state, actions) => {
        
            state.currentUser.accountInformation.filter
            (x => x.accountNumber=== actions.payload.accountNumber)[0].balance=Number(actions.payload.balance);
           
            return state;
        },
        addressInformation: (state, actions) => {
        
            state.currentUser.address=actions.payload;
      
            return state;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
           
            state.isLoggedIn = true;
            state.loginError=false;
            state.currentUser= action.payload.user;
            return state;
        });
        builder.addCase(logoutUser.fulfilled, (state,action) => {
            localStorage.removeItem("user");
            document.cookie= "SESSION=; Max-Age=-99999999;";
            state.isLoggedIn=false;
            state.isRegistered=true;
            state.currentUser=person;
            return state;
        });
        builder.addCase(registerUser.fulfilled, (state,action) => {
            state.isRegistered=true;
            state.registeredError=false;
            state.currentUser=action.payload.user;
            return state
        });
       
        builder.addCase(registerUser.rejected, (state,action) => {
            console.log("inside login rejected")
            state.registeredError=true;
            state.isRegistered=false;
           
            return state
        });
        builder.addCase(login.rejected, (state) => {
            state.loginError = true;
            state.isLoggedIn=false;
            state.currentUser=person;
            return state
        });
     
    }
});
export const { userInformation, addressInformation, updateLocalBalance}= personSlice.actions;
export default personSlice.reducer;