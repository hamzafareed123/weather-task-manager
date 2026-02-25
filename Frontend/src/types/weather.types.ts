export interface Weather {
  name: string;
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];

  main: {
    temp: number;
    humidity: string;
  };

  wind: {
    speed: number;
  };
}

export interface weatherState {
  weatherData: Weather | null;
  isLoading: boolean;
  error: string | null;
}
