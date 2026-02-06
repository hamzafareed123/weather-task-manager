import { createSlice } from "@reduxjs/toolkit";
import type { authState } from "../../types";
import { checkAuthStatus, loginUser, logoutUser, signupUser } from "../thunks/authThunks";

const initialState: authState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    //login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    //signup
    builder
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

      //chekAuth 
      builder
      .addCase(checkAuthStatus.pending,(state)=>{
        state.isLoading=true;
        state.error=null;
      })
      .addCase(checkAuthStatus.fulfilled,(state,action)=>{
        state.isLoading=false;
        state.isAuthenticated=true;
        state.user=action.payload.user;
        state.error=null;
      })
      .addCase(checkAuthStatus.rejected,(state)=>{
        state.isLoading=false;
        state.isAuthenticated=false;
        state.user=null;
      })

      // logout 

      builder
      .addCase(logoutUser.pending,(state)=>{
        state.isLoading=true;
        state.error=null;
      })
      .addCase(logoutUser.fulfilled,(state)=>{
        state.isLoading=false;
        state.isAuthenticated=false;
        state.user=null;
        state.error=null;
      })
      .addCase(logoutUser.rejected,(state,action)=>{
        state.isLoading=false;
        state.error=action.payload as string;
      })
  },
});


export const {clearError} = authSlice.actions;
export default authSlice.reducer;