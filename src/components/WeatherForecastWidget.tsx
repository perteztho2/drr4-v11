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

  // Mock data for demonstration
  useEffect(() => {
    const mockForecast: ForecastDay[] = [
      {
        id: '1',
        date: new Date().toISOString().split('T')[0],
        temperature_high: 28,
        temperature_low: 18,
        condition: 'Sunny',
        humidity: 45,
        wind_speed: 12,
        precipitation: 0,
        icon: 'sunny'
      },
      {
        id: '2',
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        temperature_high: 26,
        temperature_low: 17,
        condition: 'Partly Cloudy',
        humidity: 52,
        wind_speed: 10,
        precipitation: 10,
        icon: 'partly-cloudy'
      },
      {
        id: '3',
        date: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
        temperature_high: 24,
        temperature_low: 16,
        condition: 'Cloudy',
        humidity: 65,
        wind_speed: 8,
        precipitation: 20,
        icon: 'cloudy'
      },
      {
        id: '4',
        date: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
        temperature_high: 22,
        temperature_low: 15,
        condition: 'Light Rain',
        humidity: 78,
        wind_speed: 15,
        precipitation: 60,
        icon: 'rainy'
      },
      {
        id: '5',
        date: new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0],
        temperature_high: 25,
        temperature_low: 17,
        condition: 'Rainy',
        humidity: 82,
        wind_speed: 18,
        precipitation: 80,
        icon: 'rainy'
      },
      {
        id: '6',
        date: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
        temperature_high: 27,
        temperature_low: 19,
        condition: 'Thunderstorms',
        humidity: 85,
        wind_speed: 22,
        precipitation: 90,
        icon: 'stormy'
      },
      {
        id: '7',
        date: new Date(Date.now() + 6 * 86400000).toISOString().split('T')[0],
        temperature_high: 29,
        temperature_low: 20,
        condition: 'Sunny',
        humidity: 40,
        wind_speed: 10,
        precipitation: 0,
        icon: 'sunny'
      }
    ];

    setTimeout(() => {
      setForecast(mockForecast);
      setLoading(false);
    }, 800);
  }, []);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getTemperatureColor = (temp: number) => {
    if (temp >= 35) return 'text-red-600';
    if (temp >= 30) return 'text-orange-600';
    if (temp >= 25) return 'text-yellow-600';
    if (temp >= 20) return 'text-green-600';
    return 'text-blue-600';
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-4 border border-white/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Calendar className="text-indigo-600" size={18} />
            <h3 className="text-lg font-bold text-gray-800">7-Day Forecast</h3>
          </div>
          <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="bg-white/80 rounded-xl p-3 shadow-sm">
              <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded mb-1 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (forecast.length === 0) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6 border border-white/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Calendar className="text-indigo-600" size={18} />
            <h3 className="text-lg font-bold text-gray-800">7-Day Forecast</h3>
          </div>
        </div>
        <div className="text-center py-8">
          <Cloud className="mx-auto h-12 w-12 text-gray-300 mb-3" />
          <p className="text-gray-500">Forecast data unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-4 border border-white/50 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Calendar className="text-indigo-600" size={18} />
          <h3 className="text-lg font-bold text-gray-800">7-Day Forecast</h3>
        </div>
        <div className="text-xs text-gray-500 bg-white/60 px-2 py-1 rounded-full">
          Updated now
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {forecast.map((day, index) => (
          <div
            key={day.id}
            className={`flex flex-col items-center justify-between bg-white/80 rounded-xl p-3 transition-all duration-300 hover:shadow-md hover:bg-white/90 ${
              index === 0 ? 'ring-2 ring-indigo-300' : ''
            }`}
          >
            

              

                {getDayName(day.date)}
              

              

                {formatDate(day.date)}
              

            

            
            

              {getWeatherIcon(day.icon)}