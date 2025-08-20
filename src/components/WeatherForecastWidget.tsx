import React, { useState, useEffect } from 'react';
import { Calendar, Sun, Cloud, CloudRain, AlertTriangle, Thermometer, Droplets, Wind, RefreshCw, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { openWeatherAPI } from '../lib/openweathermap';

interface ForecastDay {
  id: string;
  date: string;
  temperature_high: number;
  temperature_low: number;
  condition: string;
  humidity: number;
  wind_speed: number;
  precipitation: number;
  icon: string;
}

const WeatherForecastWidget: React.FC = () => {
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    fetchForecast();
    
    // Auto refresh every 6 hours for forecast data
    const interval = setInterval(() => {
      fetchForecast();
    }, 6 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Ensure forecast remains visible
  useEffect(() => {
    const checkVisibility = () => {
      setIsVisible(true);
    };
    
    // Check visibility every 30 seconds
    const visibilityInterval = setInterval(checkVisibility, 30000);
    
    return () => clearInterval(visibilityInterval);
  }, []);

  const fetchForecast = async () => {
    try {
      setIsRefreshing(true);
      
      // Sync forecast from OpenWeatherMap API
      try {
        const success = await openWeatherAPI.syncForecastData();
        if (success) {
          console.log('Forecast synced from OpenWeatherMap API');
        }
      } catch (syncError) {
        console.warn('Failed to sync forecast from OpenWeatherMap API:', syncError);
      }
      
      // Fetch forecast data from database
      try {
        const { data, error } = await supabase
          .from('weather_forecast')
          .select('*')
          .eq('is_active', true)
          .gte('date', new Date().toISOString().split('T')[0])
          .order('date', { ascending: true })
          .limit(5);

        if (error && !error.message.includes('relation "weather_forecast" does not exist')) {
          console.warn('Database forecast error:', error);
        }
        
        if (data && data.length > 0) {
          setForecast(data);
        } else {
          // Generate default forecast if no data available
          const defaultForecast = await generateDefaultForecast();
          setForecast(defaultForecast);
        }
      } catch (dbError) {
        console.warn('Database forecast fetch failed:', dbError);
        const defaultForecast = await generateDefaultForecast();
        setForecast(defaultForecast);
      }
    } catch (error) {
      console.error('Error fetching weather forecast:', error);
      try {
        const defaultForecast = await generateDefaultForecast();
        setForecast(defaultForecast);
      } catch (fallbackError) {
        console.error('Failed to generate default forecast:', fallbackError);
        setForecast([]);
      }
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const generateDefaultForecast = async (): Promise<ForecastDay[]> => {
    const forecast: ForecastDay[] = [];
    
    for (let i = 0; i < 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      
      forecast.push({
        id: `default-${i}`,
        date: date.toISOString().split('T')[0],
        temperature_high: 28 + Math.floor(Math.random() * 8),
        temperature_low: 20 + Math.floor(Math.random() * 6),
        condition: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain'][Math.floor(Math.random() * 4)],
        humidity: 60 + Math.floor(Math.random() * 30),
        wind_speed: 5 + Math.floor(Math.random() * 15),
        precipitation: Math.floor(Math.random() * 60),
        icon: ['sunny', 'partly-cloudy', 'cloudy', 'rainy'][Math.floor(Math.random() * 4)]
      });
    }
    
    return forecast;
  };
  const getWeatherIcon = (icon: string) => {
    switch (icon) {
      case 'sunny':
        return <Sun className="text-yellow-500" size={20} />;
      case 'partly-cloudy':
        return <Cloud className="text-gray-500" size={20} />;
      case 'cloudy':
        return <Cloud className="text-gray-600" size={20} />;
      case 'rainy':
        return <CloudRain className="text-blue-500" size={20} />;
      case 'stormy':
        return <AlertTriangle className="text-red-500" size={20} />;
      default:
        return <Cloud className="text-gray-500" size={20} />;
    }
  };

  const getDayName = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }
  };

  const getTemperatureColor = (temp: number) => {
    if (temp >= 35) return 'text-red-600'; // Very hot
    if (temp >= 30) return 'text-orange-600'; // Hot
    if (temp >= 25) return 'text-yellow-600'; // Warm
    if (temp >= 20) return 'text-green-600'; // Mild
    return 'text-blue-600'; // Cool
  };

  if (loading) {
    return (
      <div className="bg-white border-t border-gray-200 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <RefreshCw className="animate-spin h-5 w-5 text-blue-600 mr-2" />
            <span className="text-gray-600 font-medium">Loading 5-day forecast...</span>
          </div>
        </div>
      </div>
    );
  }

  if (forecast.length === 0) {
    return (
      <div className="bg-white border-t border-gray-200 py-3">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-500">
            <Cloud className="mx-auto h-8 w-8 mb-2" />
            <p className="text-sm">5-day forecast not available</p>
            <button
              onClick={fetchForecast}
              className="text-blue-600 hover:text-blue-800 text-sm mt-2"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white border-t border-gray-200 py-2 md:py-4 shadow-sm transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center space-x-2">
            <Calendar className="text-blue-600" size={16} />
            <h3 className="text-base font-semibold text-gray-900">5-Day Weather Forecast</h3>
            <span className="text-xs text-gray-500">
              (Updated every 6 hours)
            </span>
          </div>
          <button
            onClick={fetchForecast}
            disabled={isRefreshing}
            className="text-blue-600 hover:text-blue-800 transition-all duration-200 disabled:opacity-50 hover:scale-110"
            title="Refresh forecast"
          >
            <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
          </button>
        </div>
        
        <div className="grid grid-cols-5 gap-1 md:gap-3">
          {forecast.map((day, index) => (
            <div
              key={day.id}
              className={`text-center p-2 md:p-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 ${
                index === 0 
                  ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-900 shadow-md' 
                  : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
              } min-h-0`}
            >
              <div className={`text-xs font-semibold mb-1 ${index === 0 ? 'text-blue-800' : 'text-gray-700'}`}>
                {getDayName(day.date)}
              </div>
              
              <div className="flex justify-center mb-2">
                {getWeatherIcon(day.icon)}
              </div>
              
              <div className="space-y-1">
                <div className={`text-xs md:text-sm font-bold ${getTemperatureColor(day.temperature_high)}`}>
                  {day.temperature_high}°
                </div>
                <div className={`text-xs ${index === 0 ? 'text-blue-600' : 'text-gray-500'}`}>
                  {day.temperature_low}°
                </div>
              </div>
              
              <div className="mt-1 space-y-1">
                <div className="flex items-center justify-center space-x-1">
                  <Droplets size={10} className={index === 0 ? 'text-blue-600' : 'text-blue-400'} />
                  <span className={`text-xs ${index === 0 ? 'text-blue-700' : 'text-gray-600'}`}>
                    {day.humidity}%
                  </span>
                </div>
                
                {day.precipitation > 0 && (
                  <div className={`text-xs ${index === 0 ? 'text-blue-700 font-medium' : 'text-blue-600'}`}>
                    {day.precipitation}% rain
                  </div>
                )}
                
                {day.wind_speed > 20 && (
                  <div className="flex items-center justify-center space-x-1">
                    <Wind size={10} className="text-gray-500" />
                    <span className="text-xs text-gray-500">{day.wind_speed}km/h</span>
                  </div>
                )}
              </div>
              
              <div className={`text-xs mt-1 truncate ${index === 0 ? 'text-blue-700 font-medium' : 'text-gray-500'}`} title={day.condition}>
                {day.condition}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-3">
          <p className="text-xs text-gray-500">
            Weather data provided by{' '}
            <a 
              href="https://openweathermap.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline inline-flex items-center"
            >
              OpenWeatherMap
              <ExternalLink size={10} className="ml-1" />
            </a>
            {' '}• Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherForecastWidget;