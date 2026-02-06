import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/slices/authSlice';
import weatherReducer from "../store/slices/weatherSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        weather:weatherReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch= typeof store.dispatch;