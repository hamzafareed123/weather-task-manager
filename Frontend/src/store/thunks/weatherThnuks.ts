import { createAsyncThunk } from "@reduxjs/toolkit";
import { weatherApi } from "../../services/api/weatherApi";

export const getWeather = createAsyncThunk(
  "weather/getByCity",
  async (city: string, { rejectWithValue }) => {
    try {
      const data = await weatherApi.getByCityName(city);
      return data;
    } catch (error: any) {
      rejectWithValue(
        error?.response?.data.message || "Failed to Fetched Data",
      );
    }
  },
);
