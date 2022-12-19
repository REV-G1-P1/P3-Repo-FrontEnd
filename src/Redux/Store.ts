import { configureStore } from "@reduxjs/toolkit";
import personSlice  from "./Slices/UserSlice";


export const Store = configureStore({
    reducer: {
       
        auth: personSlice,
     
    },
    devTools:true
});
export type RootState = ReturnType<typeof Store.getState>;
export type DispatchType = typeof Store.dispatch;