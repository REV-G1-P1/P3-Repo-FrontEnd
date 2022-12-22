import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { updateBalance } from "../../Types/AccountInformation";
import { remoteUrl } from "../../Types/URL";


export interface AccountState{
   isUpdated:boolean
}

const initialState:AccountState =  {
isUpdated:true
};

export const UpdateRemoteBalance = createAsyncThunk(
    'account/update',
    async(account:updateBalance, thunkAPI) => {
        try{
          
            const res = await axios.put(`${remoteUrl}/accounts/update/balance`, account);
            return res.data;
        } catch(e) {
            return thunkAPI.rejectWithValue('Unable to complete the transaction');
        }
    }
);


export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
      
       
    },
    extraReducers: (builder) => {
        builder.addCase(UpdateRemoteBalance.fulfilled, (state, action) => {
          
            return state;
        });
      
        builder.addCase(UpdateRemoteBalance.rejected, (state,action) => {
            return state
        });
     
    }
});
//export const { updateLocalBalance }= accountSlice.actions;
export default accountSlice.reducer;