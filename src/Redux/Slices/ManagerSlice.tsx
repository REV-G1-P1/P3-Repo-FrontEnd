import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { MortgageApplication } from "../../Types/Mortgage";
import { remoteUrl } from "../../Types/URL";


export interface ManagerState{
    pendingMortgages:MortgageApplication,
    isUpdated:boolean
}

const mortage:MortgageApplication={
    applicationId: 0,
    firstName: "",
    homeValue: 0,
    income: 0,
    lastName: "",
    loanAddress: "",
    loanAmount: 0,
    ssn: 0,
    status: ""
}

const initialState:ManagerState =  {
    pendingMortgages:mortage,
    isUpdated:false
};

export const getPendingMortgages = createAsyncThunk(
    'get-pending-mortgages',
    async(thunkAPI) => {
        try{    
            const res = await axios.get(`${remoteUrl}/mortgages/get/all`, {withCredentials:true});
            return res.data;

        } catch(e) {
           // return thunkAPI.rejectWithValue('Incorrect username or password');
        }
    }
);

export  interface ApproveDenyState{
    applicationId: number,
    status:string
}

export const approveDenyMortgage = createAsyncThunk(
    'approve-deny-mortgages',
    async(params:ApproveDenyState ,thunkAPI) => {
        try{    
            const res = await axios.put(`${remoteUrl}/mortgages/process/${params.applicationId}`, params.status ,{withCredentials:true});
           return res.data;
         
        } catch(e) {
           // return thunkAPI.rejectWithValue('Incorrect username or password');
        }
    }
);


export const managerSlice = createSlice({
    name: "manager",
    initialState,
    reducers: {
      
    },
    extraReducers: (builder) => {
        builder.addCase(getPendingMortgages.fulfilled, (state, action) => {
            console.log("getMortgagePending " + JSON.stringify(action.payload))
            state.pendingMortgages= action.payload;
            return state;
        });
      
        builder.addCase(approveDenyMortgage.fulfilled, (state,action) => {
            state.isUpdated=true;
            return state
        });
    }
});

export default managerSlice.reducer;
