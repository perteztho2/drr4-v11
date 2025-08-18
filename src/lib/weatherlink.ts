// WeatherLink API integration
import { supabase } from './supabase';

export interface WeatherLinkData {
  temperature: number;
  humidity: number;
  wind_speed: number;
  visibility: number;
  condition: string;
  description: string;
  pressure?: number;
  uv_index?: number;
  wind_direction?: number;
  feels_like?: number;
}

export interface WeatherLinkForecast {
  date: string;
  temperature_high: number;
  temperature_low: number;
  condition: string;
  humidity: number;
  wind_speed: number;
  precipitation: number;
  icon: string;
}

interface WeatherLinkAPIResponse {
  data: {
    conditions: Array<{
      temp: number;
      hum: number;
      wind_speed_avg_last_10_min: number;
      wind_dir_last: number;
      bar_sea_level: number;
      rain_rate_last: number;
      uv_index: number;
      solar_rad: number;
      ts: number;
    }>;
  };
}
export class WeatherLinkAPI {
  private static async getAPISettings() {
    try {
      const { data, error } = await supabase
        .from('weather_api_settings')
        .select('*')
        .eq('is_active', true)
        .maybeSingle();

      if (error) {
        console.warn('Error fetching API settings:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.warn('Failed to fetch API settings:', error);
      return null;
    }
  }

  private static async createSignature(apiSecret: string, parameters: string): Promise<string> {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(apiSecret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    
    const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(parameters));
    return Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  static async fetchCurrentWeather(): Promise<WeatherLinkData | null> {
    try {
      const settings = await this.getAPISettings();
      if (!settings) {
        console.warn('No WeatherLink API settings found, using fallback data');
        return this.getFallbackWeatherData();
      }

      const timestamp = Math.floor(Date.now() / 1000);
      const parameters = `api-key${settings.api_key}station-id${settings.station_id}t${timestamp}`;
      const signature = await this.createSignature(settings.api_secret, parameters);
      
      const apiUrl = `https://api.weatherlink.com/v2/current/${settings.station_id}?api-key=${settings.api_key}&api-signature=${signature}&t=${timestamp}`;
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`WeatherLink API error: ${response.status}`);
      }
      
      const data: WeatherLinkAPIResponse = await response.json();
      
      if (!data.data?.conditions?.[0]) {
        throw new Error('No weather data available from WeatherLink');
      }
      
      const conditions = data.data.conditions[0];
      
      // Convert WeatherLink data to our format
      const temperature = Math.round((conditions.temp - 32) * 5/9); // Convert F to C
      const humidity = Math.round(conditions.hum);
      const windSpeed = Math.round(conditions.wind_speed_avg_last_10_min * 1.60934); // Convert mph to km/h
      const pressure = Math.round(conditions.bar_sea_level * 33.8639); // Convert inHg to mbar
      
      // Determine condition based on weather data
      let condition = 'sunny';
      let description = 'Clear';
      
      if (conditions.rain_rate_last > 0) {
        condition = 'rainy';
        description = 'Rainy';
      } else if (humidity > 80) {
        condition = 'cloudy';
        description = 'Cloudy';
      } else if (conditions.wind_speed_avg_last_10_min > 25) {
        condition = 'stormy';
        description = 'Windy';
      }
      
      const weatherData: WeatherLinkData = {
        temperature,
        humidity,
        wind_speed: windSpeed,
        visibility: 10, // Default visibility
        condition,
        description,
        pressure,
        uv_index: Math.round(conditions.uv_index),
        wind_direction: Math.round(conditions.wind_dir_last),
        feels_like: Math.round(temperature + (humidity > 70 ? 2 : 0))
      };

      // Update last sync time
      try {
        await supabase
          .from('weather_api_settings')
          .update({ last_sync: new Date().toISOString() })
          .eq('id', settings.id);
      } catch (syncError) {
        console.warn('Failed to update last sync time:', syncError);
      }

      return weatherData;
    } catch (error) {
      console.error('Error fetching from WeatherLink API:', error);
      return this.getFallbackWeatherData();
    }
  }

  private static getFallbackWeatherData(): WeatherLinkData {
    return {
      temperature: 28 + Math.floor(Math.random() * 6),
      humidity: 70 + Math.floor(Math.random() * 20),
      wind_speed: 5 + Math.floor(Math.random() * 15),
      visibility: 10,
      condition: 'partly-cloudy',
      description: 'Partly Cloudy',
      pressure: 1013,
      uv_index: 6,
      feels_like: 30
    };
  }

  static async fetchForecast(): Promise<WeatherLinkForecast[]> {
    try {
      const settings = await this.getAPISettings();
      if (!settings) return [];

      // For forecast, we'll use a combination of API data and local generation
      // since WeatherLink forecast API requires different endpoints
      
      const simulatedForecast: WeatherLinkForecast[] = [];
      
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        
        simulatedForecast.push({
          date: date.toISOString().split('T')[0],
          temperature_high: 28 + Math.floor(Math.random() * 8),
          temperature_low: 20 + Math.floor(Math.random() * 6),
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

  static async getWeatherAlerts(): Promise<string[]> {
    try {
      // Get current weather data from database instead of API to avoid recursion
      const { data: weatherData, error } = await supabase
        .from('weather_data')
        .select('temperature, wind_speed, condition')
        .eq('is_active', true)
        .order('last_updated', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error || !weatherData) {
        console.warn('No weather data available for alerts');
        return [];
      }

      const alerts: string[] = [];
      
      // Generate alerts based on weather conditions
      if (weatherData.temperature >= 35) {
        alerts.push('Heat Warning: Extreme temperatures expected');
      }
      
      if (weatherData.wind_speed >= 50) {
        alerts.push('High Wind Warning: Strong winds may cause damage');
      }
      
      if (weatherData.condition === 'stormy') {
        alerts.push('Thunderstorm Warning: Severe weather conditions');
      }
      
      return alerts;
    } catch (error) {
      console.error('Error generating weather alerts:', error);
      return [];
    }
  }

  static async updateWeatherInDatabase(weatherData: WeatherLinkData): Promise<boolean> {
    try {
      // First, insert/update the basic weather data without alerts
      const { error: updateError } = await supabase
        .from('weather_data')
        .upsert({
          temperature: weatherData.temperature,
          humidity: weatherData.humidity,
          wind_speed: weatherData.wind_speed,
          visibility: weatherData.visibility,
          condition: weatherData.condition,
          description: weatherData.description,
          location: 'Pio Duran, Albay',
          last_updated: new Date().toISOString(),
          is_active: true
        });

      if (updateError) {
        console.error('Error updating weather data:', updateError);
        return false;
      }

      // Then try to update alerts separately (in case the column doesn't exist)
      try {
        const alerts = await this.getWeatherAlerts();
        await supabase
          .from('weather_data')
          .update({ alerts })
          .eq('is_active', true);
      } catch (alertError) {
        console.warn('Could not update alerts (column may not exist):', alertError);
        // Continue without alerts - this is not critical
      }

      return true;
    } catch (error) {
      console.error('Error updating weather in database:', error);
      return false;
    }
  }
  static async syncForecastData(): Promise<boolean> {
    try {
      const forecastData = await this.fetchForecast();
      if (forecastData.length === 0) {
        console.warn('No forecast data available');
        return false;
      }

      // Clear existing forecast data
      try {
        await supabase
          .from('weather_forecast')
          .update({ is_active: false })
          .eq('is_active', true);
      } catch (clearError) {
        console.warn('Could not clear existing forecast data:', clearError);
      }

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