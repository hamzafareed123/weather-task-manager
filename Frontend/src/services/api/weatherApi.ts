import type { Weather } from "../../types/weather.types";
import { weatherAxios } from "./weatherAxios";

export const weatherApi = {
    getByCityName: async(city:string):Promise<Weather>=>{
        const response = await weatherAxios.get("/weather",{
            params:{q:city}
        })
        return response.data;
    }
}