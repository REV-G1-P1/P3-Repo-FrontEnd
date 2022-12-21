import { configureStore } from "@reduxjs/toolkit";
import  accountSlice  from "./Slices/AccountSlice";
import personSlice  from "./Slices/UserSlice";


export const Store = configureStore({
    reducer: {
       
        auth: personSlice,
        account: accountSlice,
     
    },
    devTools:true
});
export type RootState = ReturnType<typeof Store.getState>;
export type DispatchType = typeof Store.dispatch;