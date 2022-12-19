import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { remoteUrl } from "../../Types/URL";
import { User } from "../../Types/User";

export interface AuthState{
    isLoggedIn:boolean,
    isRegistered:boolean,
    registeredError: boolean,
    loginError: boolean,
    currentUser: User,
}

const person:User={
    personId: 0,
    name: "",
    email: "",
    password: ""
};
const initialState:AuthState =  {
    isLoggedIn: false, registeredError: false, loginError: false, currentUser: person,
    isRegistered: false,
};

export const register = createAsyncThunk(
    'user/register',
    async(user:User, thunkAPI) => {
        try{
            
            const res = await axios.post(`${remoteUrl}/persons/register`, user);
            return res.data;
        } catch(e) {
            return thunkAPI.rejectWithValue('Email Already Exist');
        }
    }
);
export const login = createAsyncThunk(
    'user/login',
    async(user:User, thunkAPI) => {
        try{    
            const res = await axios.post(`${remoteUrl}/persons/login`, user);
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
        builder.addCase(register.fulfilled, (state,action) => {
            state.isRegistered=true;
            state.registeredError=false;
            state.currentUser=action.payload.user;
            return state
        });
        builder.addCase(register.rejected, (state,action) => {
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