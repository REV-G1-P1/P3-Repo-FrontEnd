import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { updateBalance } from "../../Types/AccountInformation";
import { MortgageApplication } from "../../Types/Mortgage";
import { remoteUrl } from "../../Types/URL";


export interface MortgageState{
   isUpdated:boolean
}

const initialState:MortgageState =  {
isUpdated:true
};

export const CreateMortgage = createAsyncThunk(
    'mortgage/create',
    async(mortgage:MortgageApplication, thunkAPI) => {
        try{         
            const res = await axios.post(`${remoteUrl}/mortgages/create`, mortgage);
            return res.data;
        } catch(e) {
            return thunkAPI.rejectWithValue('Unable to create a mortgage');
        }
    }
);


export const mortgageSlice = createSlice({
    name: "mortgage",
    initialState,
    reducers: {
      

    },
    extraReducers: (builder) => {
        builder.addCase(CreateMortgage.fulfilled, (state, action) => {
          
            return state;
        });
      
        builder.addCase(CreateMortgage.rejected, (state,action) => {
            return state
        });
     
    }
});

export default mortgageSlice.reducer;