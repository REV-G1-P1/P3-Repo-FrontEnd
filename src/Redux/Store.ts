import { AnyAction, combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/es/storage";
import  accountSlice  from "./Slices/AccountSlice";
import personSlice  from "./Slices/UserSlice";

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
    if (action.type === 'auth/logout') {
        storage.removeItem('persist:root')
        state = {} as RootState
    }
    return appReducer(state, action);
};

const appReducer = combineReducers({ 
    auth: personSlice,
    account: accountSlice,
});
  
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const Store = configureStore({
    reducer: persistedReducer,
    devTools:true
});

export const Persistor= persistStore(Store);

export type RootState = ReturnType<typeof Store.getState>;
export type DispatchType = typeof Store.dispatch;