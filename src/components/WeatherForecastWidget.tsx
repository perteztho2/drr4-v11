import React, { useState, useEffect } from 'react';
import { Calendar, Sun, Cloud, CloudRain, AlertTriangle, Thermometer, Droplets, Wind, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabase';

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

  useEffect(() => {
    fetchForecast();
    
    // Auto refresh every 30 minutes
    const interval = setInterval(() => {
      fetchForecast();
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const fetchForecast = async () => {
    try {
      setIsRefreshing(true);
      
      const { data, error } = await supabase
        .from('weather_forecast')
        .select('*')
        .eq('is_active', true)
        .gte('date', new Date().toISOString().split('T')[0])
        .order('date', { ascending: true })
        .limit(7);

      if (error && !error.message.includes('relation "weather_forecast" does not exist')) {
        throw error;
      }
      
      setForecast(data || []);
    } catch (error) {
      console.error('Error fetching weather forecast:', error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
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
      <div className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <RefreshCw className="animate-spin h-5 w-5 text-blue-600 mr-2" />
            <span className="text-gray-600">Loading 7-day forecast...</span>
          </div>
        </div>
      </div>
    );
  }

  if (forecast.length === 0) {
    return (
      <div className="bg-white border-t border-gray-700 py-4">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-500">
            <Cloud className="mx-auto h-8 w-8 mb-2" />
            <p className="text-sm">7-day forecast not available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-t border-gray-200 py-4 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Calendar className="text-blue-600" size={16} />
            <h3 className="text-sm font-semibold text-gray-900">7-Day Weather Forecast</h3>
          </div>
          <button
            onClick={fetchForecast}
            disabled={isRefreshing}
            className="text-blue-600 hover:text-blue-800 transition-colors disabled:opacity-50"
            title="Refresh forecast"
          >
            <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-2 md:gap-4">
          {forecast.map((day, index) => (
            <div
              key={day.id}
              className={`text-center p-3 rounded-lg transition-all duration-200 hover:shadow-md ${
                index === 0 
                  ? 'bg-blue-50 border-2 border-blue-200' 
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="text-xs font-medium text-gray-700 mb-2">
                {getDayName(day.date)}
              </div>
              
              <div className="flex justify-center mb-2">
                {getWeatherIcon(day.icon)}
              </div>
              
              <div className="space-y-1">
                <div className={`text-sm font-bold ${getTemperatureColor(day.temperature_high)}`}>
                  {day.temperature_high}°
                </div>
                <div className="text-xs text-gray-500">
                  {day.temperature_low}°
                </div>
              </div>
              
              <div className="mt-2 space-y-1">
                <div className="flex items-center justify-center space-x-1">
                  <Droplets size={10} className="text-blue-400" />
                  <span className="text-xs text-gray-600">{day.humidity}%</span>
                </div>
                
                {day.precipitation > 0 && (
                  <div className="text-xs text-blue-600">
                    {day.precipitation}% rain
                  </div>
                )}
              </div>
              
              <div className="text-xs text-gray-500 mt-1 truncate" title={day.condition}>
                {day.condition}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherForecastWidget;