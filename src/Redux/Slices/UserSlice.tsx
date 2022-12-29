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
    isAuthenticated: boolean,
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
    phoneNumber: 0,
    ssn: 0,
    address: address,
    accountInformation: [],
    mortgageApplication:[],
    transactions:[]
}

const initialState:AuthState =  {
    isLoggedIn: false, registeredError: false, loginError: false, currentUser: person,
    isRegistered: false,
    isAuthenticated: false
};

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async(user:User, thunkAPI) => {
        try{
            const res = await axios.post(`${remoteUrl}/users/register`, user,{withCredentials:true});
            return res.data;
        } catch(e) {
            return thunkAPI.rejectWithValue('Email Already Exist');
        }
    }
);
export const login = createAsyncThunk(
    'login-credentials',
    async(user:loginUser, thunkAPI) => {
        try{    
            const res = await axios.post(`${remoteUrl}/login-credentials`, user,{withCredentials:true});
           return res.data;
         
        } catch(e) {
            return thunkAPI.rejectWithValue('Incorrect username or password');
        }
    }
);

export const getUsers = createAsyncThunk(
    'getAllUsers',
    async(thunkAPI) => {
        try{    
            const res = await axios.get(`${remoteUrl}/users/get/currentuser`,{withCredentials:true});
           return res.data;
         
        } catch(e) {
            //return thunkAPI.rejectWithValue('Incorrect username or password');
        }
    }
);

export const loginWithToken = createAsyncThunk(
    'login-token',
    async(token: number, thunkAPI) => {
        try{    
            const res = await axios.post(`${remoteUrl}/login-token`, {token},{withCredentials:true});
            console.log("userslice login token "+JSON.stringify(res.data));
           return res.data;
         
        } catch(e) {
            return thunkAPI.rejectWithValue('Incorrect username or password');
        }
    }
);

export const logoutUser = createAsyncThunk(
    'logout',
    async(thunkAPI) => {
        try{    
            const res = await axios.get(`${remoteUrl}/log-out`,{withCredentials:true});
        
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
        
        builder.addCase(getUsers.fulfilled, (state, action) => {

            state.currentUser= action.payload;
            return state;
        });
           
        builder.addCase(loginWithToken.fulfilled, (state, action) => {
           
            state.isAuthenticated = true;
            state.loginError=false;
            state.currentUser= action.payload;
            return state;
        });
        builder.addCase(logoutUser.fulfilled, (state,action) => {
            localStorage.removeItem("user");
            document.cookie= "SESSION=; Max-Age=-99999999;";
            state.isLoggedIn=false;
            state.isAuthenticated=false;

            state.currentUser=person;
            return state;
        });
        builder.addCase(registerUser.fulfilled, (state,action) => {
            state.isRegistered=true;
            state.registeredError=false;
            state.currentUser=action.payload;
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