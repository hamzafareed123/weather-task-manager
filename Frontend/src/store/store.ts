import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/slices/authSlice';
import weatherReducer from "../store/slices/weatherSlice"
import taskReducer from "../store/slices/taskSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        weather:weatherReducer,
        tasks:taskReducer   
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch= typeof store.dispatch;