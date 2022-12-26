import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { updateBalance } from "../../Types/AccountInformation";
import { Mortgage } from "../../Types/Mortgage";
import { remoteUrl } from "../../Types/URL";


export interface MortgageState{
   isUpdated:boolean
}

const initialState:MortgageState =  {
isUpdated:true
};

export const CreateMortgage = createAsyncThunk(
    'mortgage/create',
    async(mortgage:Mortgage, thunkAPI) => {
        try{         
            const res = await axios.put(`${remoteUrl}/mortgages/create`, mortgage);
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