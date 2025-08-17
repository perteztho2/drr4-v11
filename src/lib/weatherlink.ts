// WeatherLink API integration
import { supabase } from './supabase';

interface WeatherLinkData {
  temperature: number;
  humidity: number;
  wind_speed: number;
  condition: string;
  description: string;
  pressure?: number;
  uv_index?: number;
  visibility?: number;
}

interface WeatherLinkForecast {
  date: string;
  temperature_high: number;
  temperature_low: number;
  condition: string;
  humidity: number;
  wind_speed: number;
  precipitation: number;
  icon: string;
}

export class WeatherLinkAPI {
  private static async getAPISettings() {
    const { data, error } = await supabase
      .from('weather_api_settings')
      .select('*')
      .eq('is_active', true)
      .single();

    if (error) throw error;
    return data;
  }

  static async fetchCurrentWeather(): Promise<WeatherLinkData | null> {
    try {
      const settings = await this.getAPISettings();
      if (!settings) return null;

      // Note: In production, this should be done through a backend API/edge function
      // to keep API credentials secure. For demo purposes, we'll simulate the API call.
      
      console.log('Fetching current weather from WeatherLink API...');
      console.log('Station ID:', settings.station_id);
      
      // Simulate API response - replace with actual WeatherLink API call
      const simulatedData: WeatherLinkData = {
        temperature: 28 + Math.floor(Math.random() * 10),
        humidity: 70 + Math.floor(Math.random() * 20),
        wind_speed: 5 + Math.floor(Math.random() * 15),
        condition: 'partly-cloudy',
        description: 'Partly Cloudy',
        pressure: 1013,
        uv_index: 6,
        visibility: 10
      };

      // Update last sync time
      await supabase
        .from('weather_api_settings')
        .update({ last_sync: new Date().toISOString() })
        .eq('id', settings.id);

      return simulatedData;
    } catch (error) {
      console.error('Error fetching from WeatherLink API:', error);
      return null;
    }
  }

  static async fetchForecast(): Promise<WeatherLinkForecast[]> {
    try {
      const settings = await this.getAPISettings();
      if (!settings) return [];

      console.log('Fetching forecast from WeatherLink API...');
      
      // Simulate 7-day forecast - replace with actual WeatherLink API call
      const simulatedForecast: WeatherLinkForecast[] = [];
      
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        
        simulatedForecast.push({
          date: date.toISOString().split('T')[0],
          temperature_high: 25 + Math.floor(Math.random() * 10),
          temperature_low: 18 + Math.floor(Math.random() * 8),
          condition: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain'][Math.floor(Math.random() * 4)],
          humidity: 60 + Math.floor(Math.random() * 30),
          wind_speed: 5 + Math.floor(Math.random() * 15),
          precipitation: Math.floor(Math.random() * 80),
          icon: ['sunny', 'partly-cloudy', 'cloudy', 'rainy'][Math.floor(Math.random() * 4)]
        });
      }

      return simulatedForecast;
    } catch (error) {
      console.error('Error fetching forecast from WeatherLink API:', error);
      return [];
    }
  }

  static async syncWeatherData(): Promise<boolean> {
    try {
      const currentWeather = await this.fetchCurrentWeather();
      if (!currentWeather) return false;

      // Update current weather in database
      await supabase
        .from('weather_data')
        .upsert({
          temperature: currentWeather.temperature,
          humidity: currentWeather.humidity,
          wind_speed: currentWeather.wind_speed,
          visibility: currentWeather.visibility || 10,
          condition: currentWeather.condition,
          description: currentWeather.description,
          location: 'Pio Duran, Albay',
          alerts: [],
          last_updated: new Date().toISOString(),
          is_active: true
        });

      return true;
    } catch (error) {
      console.error('Error syncing weather data:', error);
      return false;
    }
  }

  static async syncForecastData(): Promise<boolean> {
    try {
      const forecastData = await this.fetchForecast();
      if (forecastData.length === 0) return false;

      // Clear existing forecast data
      await supabase
        .from('weather_forecast')
        .update({ is_active: false })
        .eq('is_active', true);

      // Insert new forecast data
      const { error } = await supabase
        .from('weather_forecast')
        .insert(forecastData.map(day => ({
          ...day,
          is_active: true
        })));

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error syncing forecast data:', error);
      return false;
    }
  }
}

export const weatherAPI = WeatherLinkAPI;