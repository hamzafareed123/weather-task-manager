import { createSlice } from "@reduxjs/toolkit";
import { getWeather } from "../thunks/weatherThnuks";
import type { weatherState } from "../../types/weather.types";

const initialState: weatherState = {
  weatherData: null,
  isLoading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getWeather.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.weatherData = null;
      })
      .addCase(getWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        state.weatherData = action.payload || null;
      })
      .addCase(getWeather.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) || "Failed to fetch weather";
      });
  },
});

export const { clearError } = weatherSlice.actions;
export default weatherSlice.reducer;
