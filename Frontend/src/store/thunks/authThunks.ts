import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LoginCredentials, SignupCredentials } from "../../types";
import { authApi } from "../../services/api/authApi";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const data = await authApi.login(credentials);
      return { user: data.data };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (credentials: SignupCredentials, { rejectWithValue }) => {
    try {
      const data = await authApi.signup(credentials);
      return { user: data.data };
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || "Signup Failed");
    }
  },
);

export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const data = await authApi.checkAuth();
      console.log("data is ", data);
      return { user: data.data };
    } catch (error: any) {
      if (error?.response?.status === 401) {
        return rejectWithValue(null);
      }
      return rejectWithValue(
        error?.response?.data?.message || "Authentication Failed",
      );
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const data = await authApi.logout();
      return { user: data.data };
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || "Logout Failed");
    }
  },
);

export const getAllUsers = createAsyncThunk(
  "auth/getAllUser",
  async (_, { rejectWithValue }) => {
    try {
      const data = await authApi.getAllUsers();

      return data.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch users",
      );
    }
  },
);
