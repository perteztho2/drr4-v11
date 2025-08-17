import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, AlertTriangle, Wind, Droplets, Thermometer, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface WeatherData {
  temperature: number;
  humidity: number;
  wind_speed: number;
  condition: string;
  description: string;
  location: string;
  alerts: string[];
  last_updated: string;
}

interface WeatherAPISettings {
  api_key: string;
  api_secret: string;
  station_id: string;
  is_active: boolean;
  last_sync: string;
}

const WeatherTickerWidget: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: 28,
    humidity: 75,
    wind_speed: 12,
    condition: 'partly-cloudy',
    description: 'Partly Cloudy',
    location: 'Pio Duran, Albay',
    alerts: [],
    last_updated: new Date().toISOString()
  });

  const [apiSettings, setApiSettings] = useState<WeatherAPISettings | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchWeatherData();
    fetchAPISettings();
    
    // Auto refresh every 10 minutes
    const interval = setInterval(() => {
      fetchWeatherData();
    }, 10 * 60 * 1000);

    // Check online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearInterval(interval);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const fetchAPISettings = async () => {
    try {
      const { data, error } = await supabase
        .from('weather_api_settings')
        .select('*')
        .eq('is_active', true)
        .single();

      if (error && !error.message.includes('relation "weather_api_settings" does not exist')) {
        throw error;
      }
      
      if (data) {
        setApiSettings(data);
      }
    } catch (error) {
      console.error('Error fetching weather API settings:', error);
    }
  };

  const fetchWeatherData = async () => {
    try {
      setIsRefreshing(true);
      
      // First try to get data from database
      const { data: dbData, error: dbError } = await supabase
        .from('weather_data')
        .select('*')
        .eq('is_active', true)
        .order('last_updated', { ascending: false })
        .limit(1)
        .single();

      if (dbData && !dbError) {
        setWeatherData({
          temperature: dbData.temperature,
          humidity: dbData.humidity,
          wind_speed: dbData.wind_speed,
          condition: dbData.condition,
          description: dbData.description,
          location: dbData.location,
          alerts: dbData.alerts || [],
          last_updated: dbData.last_updated
        });
      }

      // If API settings are available, fetch from WeatherLink
      if (apiSettings && isOnline) {
        await fetchFromWeatherLink();
      }
      
      setLastRefresh(new Date());
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const fetchFromWeatherLink = async () => {
    if (!apiSettings) return;

    try {
      // Note: In production, this should be done through a backend API to keep credentials secure
      // For demo purposes, we'll simulate the API call
      console.log('Fetching from WeatherLink API with station:', apiSettings.station_id);
      
      // Update last sync time
      await supabase
        .from('weather_api_settings')
        .update({ last_sync: new Date().toISOString() })
        .eq('id', apiSettings.id);
        
    } catch (error) {
      console.error('Error fetching from WeatherLink API:', error);
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun className="text-yellow-400" size={24} />;
      case 'partly-cloudy':
      case 'cloudy':
        return <Cloud className="text-gray-400" size={24} />;
      case 'rainy':
      case 'light-rain':
        return <CloudRain className="text-blue-400" size={24} />;
      case 'stormy':
      case 'thunderstorm':
        return <AlertTriangle className="text-red-400" size={24} />;
      default:
        return <Cloud className="text-gray-400" size={24} />;
    }
  };

  const getTemperatureColor = (temp: number) => {
    if (temp >= 35) return 'from-red-500 to-red-600'; // Very hot
    if (temp >= 30) return 'from-orange-500 to-orange-600'; // Hot
    if (temp >= 25) return 'from-yellow-500 to-yellow-600'; // Warm
    if (temp >= 20) return 'from-green-500 to-green-600'; // Mild
    return 'from-blue-500 to-blue-600'; // Cool
  };

  const getTemperatureTextColor = (temp: number) => {
    if (temp >= 30) return 'text-white'; // Hot temperatures - white text
    return 'text-gray-900'; // Cooler temperatures - dark text
  };

  const manualRefresh = () => {
    fetchWeatherData();
  };

  return (
    <div className={`bg-gradient-to-r ${getTemperatureColor(weatherData.temperature)} text-white py-3 px-4 shadow-lg border-t-4 border-yellow-500`}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Weather Info - Scrolling Ticker */}
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center space-x-8 animate-marquee whitespace-nowrap">
              <div className="flex items-center space-x-3">
                {getWeatherIcon(weatherData.condition)}
                <span className={`font-bold text-lg ${getTemperatureTextColor(weatherData.temperature)}`}>
                  {weatherData.temperature}°C
                </span>
                <span className={`${getTemperatureTextColor(weatherData.temperature)}`}>
                  {weatherData.description}
                </span>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-1">
                  <Droplets size={16} className={getTemperatureTextColor(weatherData.temperature)} />
                  <span className={`text-sm ${getTemperatureTextColor(weatherData.temperature)}`}>
                    {weatherData.humidity}% Humidity
                  </span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Wind size={16} className={getTemperatureTextColor(weatherData.temperature)} />
                  <span className={`text-sm ${getTemperatureTextColor(weatherData.temperature)}`}>
                    {weatherData.wind_speed} km/h Wind
                  </span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Thermometer size={16} className={getTemperatureTextColor(weatherData.temperature)} />
                  <span className={`text-sm ${getTemperatureTextColor(weatherData.temperature)}`}>
                    Feels like {weatherData.temperature + 2}°C
                  </span>
                </div>
              </div>

              {weatherData.alerts.length > 0 && (
                <div className="flex items-center space-x-2">
                  <AlertTriangle size={16} className="text-yellow-300 animate-pulse" />
                  <span className="text-yellow-100 font-medium">
                    {weatherData.alerts.join(' • ')}
                  </span>
                </div>
              )}

              <div className={`text-sm ${getTemperatureTextColor(weatherData.temperature)} opacity-75`}>
                📍 {weatherData.location} • Last updated: {new Date(weatherData.last_updated).toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-3 ml-4">
            <div className="flex items-center space-x-1">
              {isOnline ? (
                <Wifi size={16} className={`${getTemperatureTextColor(weatherData.temperature)} opacity-75`} />
              ) : (
                <WifiOff size={16} className="text-red-300" />
              )}
            </div>
            
            <button
              onClick={manualRefresh}
              disabled={isRefreshing}
              className={`${getTemperatureTextColor(weatherData.temperature)} hover:opacity-80 transition-opacity disabled:opacity-50`}
              title="Refresh weather data"
            >
              <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherTickerWidget;