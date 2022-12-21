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

const person:User={
    user_id: 0,
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    ssn: 0,
    user_role: ""
};
const initialState:AuthState =  {
    isLoggedIn: false, registeredError: false, loginError: false, currentUser: person,
    isRegistered: false,
};

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async(user:User, thunkAPI) => {
        try{
            
            const res = await axios.post(`${remoteUrl}/users/registerUser`, user);
            return res.data;
        } catch(e) {
            return thunkAPI.rejectWithValue('Email Already Exist');
        }
    }
);

export const registerAddress = createAsyncThunk(
    'user/registerAddress',
    async(addresss:Addresses, thunkAPI) => {
        try{
            
            const res = await axios.post(`${remoteUrl}/persons/registerAddress`, addresss);
            return res.data;
        } catch(e) {
            return thunkAPI.rejectWithValue('Failed to sava the addresss');
        }
    }
);
export const login = createAsyncThunk(
    'user/login',
    async(user:loginUser, thunkAPI) => {
        try{    
            const res = await axios.post(`${remoteUrl}/users/login`, user);
            console.log("login slice res data "+res.data);
           return {user: res.data};
         
        } catch(e) {
            return thunkAPI.rejectWithValue('Incorrect username or password');
        }
    }
);

export const personSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("user");
            state.isLoggedIn=false;
            state.isRegistered=true;
            state.currentUser=person;
            return state;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.loginError=false;
            state.currentUser= action.payload.user;
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            console.log("useruseruser "+JSON.stringify(localStorage.getItem('user')));
            return state;
        });
        builder.addCase(registerUser.fulfilled, (state,action) => {
            state.isRegistered=true;
            state.registeredError=false;
            state.currentUser=action.payload.user;
            return state
        });
        builder.addCase(registerAddress.fulfilled, (state,action) => {
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
export const {logout}= personSlice.actions;
export default personSlice.reducer;