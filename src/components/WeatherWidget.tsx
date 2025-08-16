import React, { useState, useEffect } from 'react';
import { Activity, Cloud, Sun, CloudRain, Wind, Thermometer, Droplets, Eye, AlertTriangle } from 'lucide-react';

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  visibility: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy';
  description: string;
  alerts?: string[];
}

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 28,
    humidity: 75,
    windSpeed: 12,
    visibility: 10,
    condition: 'cloudy',
    description: 'Partly Cloudy',
    alerts: ['Thunderstorm possible this afternoon']
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate weather data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="text-yellow-500" size={32} />;
      case 'cloudy':
        return <Cloud className="text-gray-500" size={32} />;
      case 'rainy':
        return <CloudRain className="text-blue-500" size={32} />;
      case 'stormy':
        return <AlertTriangle className="text-red-500" size={32} />;
      default:
        return <Cloud className="text-gray-500" size={32} />;
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return 'from-yellow-400 to-orange-500';
      case 'cloudy':
        return 'from-gray-400 to-gray-600';
      case 'rainy':
        return 'from-blue-400 to-blue-600';
      case 'stormy':
        return 'from-red-400 to-red-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Weather Conditions</h2>
        <Activity className="h-5 w-5 text-gray-400" />
      </div>
      
      <div className={`bg-gradient-to-br ${getConditionColor(weather.condition)} rounded-lg p-6 text-white`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">Current Weather</h3>
          <p className="text-sm opacity-90">Pio Duran, Albay</p>
        </div>
        {getWeatherIcon(weather.condition)}
      </div>

      <div className="mb-4">
        <div className="text-3xl font-bold mb-1">{weather.temperature}°C</div>
        <div className="text-sm opacity-90">{weather.description}</div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center">
          <Droplets size={16} className="mr-2 opacity-75" />
          <span className="text-sm">{weather.humidity}%</span>
        </div>
        <div className="flex items-center">
          <Wind size={16} className="mr-2 opacity-75" />
          <span className="text-sm">{weather.windSpeed} km/h</span>
        </div>
        <div className="flex items-center">
          <Thermometer size={16} className="mr-2 opacity-75" />
          <span className="text-sm">Feels like {weather.temperature + 2}°C</span>
        </div>
        <div className="flex items-center">
          <Eye size={16} className="mr-2 opacity-75" />
          <span className="text-sm">{weather.visibility} km</span>
        </div>
      </div>

      {weather.alerts && weather.alerts.length > 0 && (
        <div className="bg-white bg-opacity-20 rounded-lg p-3">
          <div className="flex items-center mb-2">
            <AlertTriangle size={16} className="mr-2" />
            <span className="text-sm font-medium">Weather Alerts</span>
          </div>
          {weather.alerts.map((alert, index) => (
            <p key={index} className="text-xs opacity-90">{alert}</p>
          ))}
        </div>
      )}

      <div className="text-xs opacity-75 mt-4">
        Last updated: {new Date().toLocaleTimeString()}
      </div>
      </div>
    </div>
  );
};

export default WeatherWidget;