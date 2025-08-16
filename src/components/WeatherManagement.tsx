import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, Cloud, Sun, CloudRain, AlertTriangle, Thermometer, Wind, Droplets, Eye } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface WeatherData {
  id?: string;
  temperature: number;
  humidity: number;
  wind_speed: number;
  visibility: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy';
  description: string;
  location: string;
  alerts: string[];
  last_updated: string;
  is_active: boolean;
}

const WeatherManagement: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: 28,
    humidity: 75,
    wind_speed: 12,
    visibility: 10,
    condition: 'cloudy',
    description: 'Partly Cloudy',
    location: 'Pio Duran, Albay',
    alerts: [],
    last_updated: new Date().toISOString(),
    is_active: true
  });

  const [alertInput, setAlertInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const { data, error } = await supabase
        .from('weather_data')
        .select('*')
        .eq('is_active', true)
        .order('last_updated', { ascending: false })
        .limit(1)
        .single();

      if (error && !error.message.includes('relation "weather_data" does not exist')) {
        throw error;
      }
      
      if (data) {
        setWeatherData({
          id: data.id,
          temperature: data.temperature,
          humidity: data.humidity,
          wind_speed: data.wind_speed,
          visibility: data.visibility,
          condition: data.condition,
          description: data.description,
          location: data.location,
          alerts: data.alerts || [],
          last_updated: data.last_updated,
          is_active: data.is_active
        });
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      const dataToSave = {
        ...weatherData,
        last_updated: new Date().toISOString()
      };

      if (weatherData.id) {
        const { error } = await supabase
          .from('weather_data')
          .update(dataToSave)
          .eq('id', weatherData.id);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('weather_data')
          .insert([dataToSave])
          .select()
          .single();

        if (error) throw error;
        setWeatherData(prev => ({ ...prev, id: data.id }));
      }
      
      alert('Weather data updated successfully!');
    } catch (error) {
      console.error('Error saving weather data:', error);
      alert('Error saving weather data. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const addAlert = () => {
    if (alertInput.trim() && !weatherData.alerts.includes(alertInput.trim())) {
      setWeatherData(prev => ({
        ...prev,
        alerts: [...prev.alerts, alertInput.trim()]
      }));
      setAlertInput('');
    }
  };

  const removeAlert = (alertToRemove: string) => {
    setWeatherData(prev => ({
      ...prev,
      alerts: prev.alerts.filter(alert => alert !== alertToRemove)
    }));
  };

  const getConditionIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="text-yellow-500" size={24} />;
      case 'cloudy':
        return <Cloud className="text-gray-500" size={24} />;
      case 'rainy':
        return <CloudRain className="text-blue-500" size={24} />;
      case 'stormy':
        return <AlertTriangle className="text-red-500" size={24} />;
      default:
        return <Cloud className="text-gray-500" size={24} />;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Weather Management</h2>
          <p className="text-gray-600">Update weather conditions displayed on the homepage</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
        >
          {saving ? <RefreshCw className="animate-spin" size={16} /> : <Save size={16} />}
          <span>{saving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weather Data Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Weather Conditions</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Temperature (°C)
                </label>
                <div className="relative">
                  <Thermometer className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="number"
                    value={weatherData.temperature}
                    onChange={(e) => setWeatherData(prev => ({ ...prev, temperature: parseInt(e.target.value) || 0 }))}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="-10"
                    max="50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Humidity (%)
                </label>
                <div className="relative">
                  <Droplets className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="number"
                    value={weatherData.humidity}
                    onChange={(e) => setWeatherData(prev => ({ ...prev, humidity: parseInt(e.target.value) || 0 }))}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Wind Speed (km/h)
                </label>
                <div className="relative">
                  <Wind className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="number"
                    value={weatherData.wind_speed}
                    onChange={(e) => setWeatherData(prev => ({ ...prev, wind_speed: parseInt(e.target.value) || 0 }))}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    max="200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Visibility (km)
                </label>
                <div className="relative">
                  <Eye className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="number"
                    value={weatherData.visibility}
                    onChange={(e) => setWeatherData(prev => ({ ...prev, visibility: parseInt(e.target.value) || 0 }))}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    max="50"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weather Condition
              </label>
              <select
                value={weatherData.condition}
                onChange={(e) => setWeatherData(prev => ({ ...prev, condition: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="sunny">Sunny</option>
                <option value="cloudy">Cloudy</option>
                <option value="rainy">Rainy</option>
                <option value="stormy">Stormy</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                value={weatherData.description}
                onChange={(e) => setWeatherData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Partly Cloudy, Light Rain"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={weatherData.location}
                onChange={(e) => setWeatherData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Pio Duran, Albay"
              />
            </div>
          </div>
        </div>

        {/* Weather Preview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
          
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Current Weather</h3>
                <p className="text-sm opacity-90">{weatherData.location}</p>
              </div>
              {getConditionIcon(weatherData.condition)}
            </div>

            <div className="mb-4">
              <div className="text-3xl font-bold mb-1">{weatherData.temperature}°C</div>
              <div className="text-sm opacity-90">{weatherData.description}</div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center">
                <Droplets size={16} className="mr-2 opacity-75" />
                <span className="text-sm">{weatherData.humidity}%</span>
              </div>
              <div className="flex items-center">
                <Wind size={16} className="mr-2 opacity-75" />
                <span className="text-sm">{weatherData.wind_speed} km/h</span>
              </div>
              <div className="flex items-center">
                <Thermometer size={16} className="mr-2 opacity-75" />
                <span className="text-sm">Feels like {weatherData.temperature + 2}°C</span>
              </div>
              <div className="flex items-center">
                <Eye size={16} className="mr-2 opacity-75" />
                <span className="text-sm">{weatherData.visibility} km</span>
              </div>
            </div>

            {weatherData.alerts.length > 0 && (
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <AlertTriangle size={16} className="mr-2" />
                  <span className="text-sm font-medium">Weather Alerts</span>
                </div>
                {weatherData.alerts.map((alert, index) => (
                  <p key={index} className="text-xs opacity-90">{alert}</p>
                ))}
              </div>
            )}

            <div className="text-xs opacity-75 mt-4">
              Last updated: {new Date(weatherData.last_updated).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Weather Alerts Management */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weather Alerts</h3>
        
        <div className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={alertInput}
              onChange={(e) => setAlertInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAlert())}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Add weather alert (e.g., Thunderstorm possible this afternoon)"
            />
            <button
              type="button"
              onClick={addAlert}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Add Alert
            </button>
          </div>

          <div className="space-y-2">
            {weatherData.alerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center">
                  <AlertTriangle className="text-yellow-600 mr-2" size={16} />
                  <span className="text-sm text-gray-900">{alert}</span>
                </div>
                <button
                  onClick={() => removeAlert(alert)}
                  className="text-red-600 hover:text-red-800"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {weatherData.alerts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Cloud className="mx-auto h-12 w-12 text-gray-400 mb-2" />
              <p>No weather alerts active</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Weather Presets */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Presets</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => setWeatherData(prev => ({
              ...prev,
              temperature: 32,
              humidity: 85,
              wind_speed: 5,
              condition: 'sunny',
              description: 'Hot and Sunny',
              alerts: ['Heat index warning in effect']
            }))}
            className="p-4 border border-gray-200 rounded-lg hover:bg-yellow-50 hover:border-yellow-300 transition-colors"
          >
            <Sun className="text-yellow-500 mx-auto mb-2" size={24} />
            <p className="text-sm font-medium">Hot & Sunny</p>
          </button>

          <button
            onClick={() => setWeatherData(prev => ({
              ...prev,
              temperature: 26,
              humidity: 70,
              wind_speed: 8,
              condition: 'cloudy',
              description: 'Partly Cloudy',
              alerts: []
            }))}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
          >
            <Cloud className="text-gray-500 mx-auto mb-2" size={24} />
            <p className="text-sm font-medium">Cloudy</p>
          </button>

          <button
            onClick={() => setWeatherData(prev => ({
              ...prev,
              temperature: 24,
              humidity: 90,
              wind_speed: 15,
              condition: 'rainy',
              description: 'Light Rain',
              alerts: ['Rain expected throughout the day']
            }))}
            className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
          >
            <CloudRain className="text-blue-500 mx-auto mb-2" size={24} />
            <p className="text-sm font-medium">Rainy</p>
          </button>

          <button
            onClick={() => setWeatherData(prev => ({
              ...prev,
              temperature: 22,
              humidity: 95,
              wind_speed: 45,
              condition: 'stormy',
              description: 'Thunderstorm',
              alerts: ['Severe thunderstorm warning', 'Stay indoors and avoid outdoor activities']
            }))}
            className="p-4 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors"
          >
            <AlertTriangle className="text-red-500 mx-auto mb-2" size={24} />
            <p className="text-sm font-medium">Stormy</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherManagement;