import { getEnvVar } from "../utils/getEnvVar";

const API_KEY = getEnvVar("API_KEY");

export async function getWeatherByCity(city: string): Promise<any> {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?q=${city}&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch weather data");
  }
}
