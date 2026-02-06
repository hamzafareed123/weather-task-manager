import type {
  AuthResponse,
  LoginCredentials,
  SignupCredentials,
} from "../../types";
import axiosInstance from "./axiosInstance";

export const authApi = {
  signup: async (credentials: SignupCredentials): Promise<AuthResponse> => {
    const response = await axiosInstance.post("/auth/signup", credentials);
    return response.data;
  },

  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axiosInstance.post("/auth/signin", credentials);
    return response.data;
  },

  checkAuth: async (): Promise<AuthResponse> => {
    const response = await axiosInstance.get("/auth/getAuthUser");
    return response.data;
  },

  logout: async () => {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  },
};
