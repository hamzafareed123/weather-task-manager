import type { User } from "./user.types";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  fullName: string;
  email: string;
  password: string;
}

export interface authState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
}
