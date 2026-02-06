import type { User } from "./user.types";
import type { Weather } from "./weather.types";

export interface AuthResponse {
  data: any;
  user: User;
}

export interface weatherResponse {
    data:Weather
}


