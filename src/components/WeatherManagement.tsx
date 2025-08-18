import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, Cloud, Sun, CloudRain, AlertTriangle, Thermometer, Wind, Droplets, Eye, Key, Database, Calendar, Plus, Edit, Trash2, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { weatherAPI } from '../lib/weatherlink';

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

interface WeatherAPISettings {
  id?: string;
  api_key: string;
  api_secret: string;
  station_id: string;
  is_active: boolean;
  last_sync?: string;
}

interface ForecastDay {
  id?: string;
  date: string;
  temperature_high: number;
  temperature_low: number;
  condition: string;
  humidity: number;
  wind_speed: number;
  precipitation: number;
  icon: string;
  is_active: boolean;
}

const WeatherManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'current' | 'api' | 'forecast'>('current');
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
  
  const [apiSettings, setApiSettings] = useState<WeatherAPISettings>({
    api_key: '',
    api_secret: '',
    station_id: '',
    is_active: true
  });
  
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [isForecastModalOpen, setIsForecastModalOpen] = useState(false);
  const [editingForecastId, setEditingForecastId] = useState<string | null>(null);
  const [forecastFormData, setForecastFormData] = useState<ForecastDay>({
    date: '',
    temperature_high: 30,
    temperature_low: 22,
    condition: 'Partly Cloudy',
    humidity: 75,
    wind_speed: 10,
    precipitation: 0,
    icon: 'partly-cloudy',
    is_active: true
  });

  const [alertInput, setAlertInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchWeatherData();
    fetchAPISettings();
    fetchForecast();
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
      console.error('Error fetching API settings:', error);
    }
  };

  const fetchForecast = async () => {
    try {
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
      console.error('Error fetching forecast:', error);
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

  const handleSaveAPISettings = async () => {
    try {
      setSaving(true);
      
      if (apiSettings.id) {
        const { error } = await supabase
          .from('weather_api_settings')
          .update(apiSettings)
          .eq('id', apiSettings.id);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('weather_api_settings')
          .insert([apiSettings])
          .select()
          .single();

        if (error) throw error;
        setApiSettings(prev => ({ ...prev, id: data.id }));
      }
      
      alert('API settings saved successfully!');
    } catch (error) {
      console.error('Error saving API settings:', error);
      alert('Error saving API settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleSyncFromAPI = async () => {
    try {
      setSaving(true);
      
      // Call the edge function to sync weather data
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/weather-sync`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      
      const result = await response.json();
      
      if (result.success) {
        await fetchWeatherData();
        alert('Weather data synced successfully from WeatherLink API!');
      } else {
        alert(`Failed to sync weather data: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error syncing weather data:', error);
      alert('Error syncing weather data. Please check your API configuration.');
    } finally {
      setSaving(false);
    }
  };

  const handleForecastSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingForecastId) {
        const { data, error } = await supabase
          .from('weather_forecast')
          .update(forecastFormData)
          .eq('id', editingForecastId)
          .select()
          .single();

        if (error) throw error;
        
        setForecast(prev => prev.map(day => 
          day.id === editingForecastId ? data : day
        ));
        alert('Forecast updated successfully!');
      } else {
        const { data, error } = await supabase
          .from('weather_forecast')
          .insert([forecastFormData])
          .select()
          .single();

        if (error) throw error;
        
        setForecast(prev => [...prev, data].sort((a, b) => 
          new Date(a.date).getTime() - new Date(b.date).getTime()
        ));
        alert('Forecast created successfully!');
      }
      
      resetForecastForm();
      fetchForecast();
    } catch (error) {
      console.error('Error saving forecast:', error);
      alert('Error saving forecast. Please try again.');
    }
  };

  const resetForecastForm = () => {
    setForecastFormData({
      date: '',
      temperature_high: 30,
      temperature_low: 22,
      condition: 'Partly Cloudy',
      humidity: 75,
      wind_speed: 10,
      precipitation: 0,
      icon: 'partly-cloudy',
      is_active: true
    });
    setEditingForecastId(null);
    setIsForecastModalOpen(false);
  };

  const handleEditForecast = (day: ForecastDay) => {
    setForecastFormData(day);
    setEditingForecastId(day.id || null);
    setIsForecastModalOpen(true);
  };

  const handleDeleteForecast = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this forecast day?')) {
      try {
        const { error } = await supabase
          .from('weather_forecast')
          .delete()
          .eq('id', id);

        if (error) throw error;
        
        setForecast(prev => prev.filter(day => day.id !== id));
        alert('Forecast deleted successfully!');
      } catch (error) {
        console.error('Error deleting forecast:', error);
        alert('Error deleting forecast. Please try again.');
      }
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
          <p className="text-gray-600">Manage weather data, API settings, and forecasts</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'current', label: 'Current Weather', icon: Cloud },
            { id: 'api', label: 'API Settings', icon: Key },
            { id: 'forecast', label: '7-Day Forecast', icon: Calendar }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Current Weather Tab */}
      {activeTab === 'current' && (
        <div className="space-y-6">
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleSyncFromAPI}
              disabled={saving}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
            >
              <RefreshCw className={saving ? 'animate-spin' : ''} size={16} />
              <span>Sync from API</span>
            </button>
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
      )}

      {/* API Settings Tab */}
      {activeTab === 'api' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              onClick={handleSaveAPISettings}
              disabled={saving}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
            >
              {saving ? <RefreshCw className="animate-spin" size={16} /> : <Save size={16} />}
              <span>{saving ? 'Saving...' : 'Save API Settings'}</span>
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">WeatherLink API Configuration</h3>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-blue-900 mb-2">Setup Instructions</h4>
              <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                <li>Create an account at <a href="https://weatherlink.com" target="_blank" rel="noopener noreferrer" className="underline">weatherlink.com</a></li>
                <li>Generate API Key and Secret in your account settings</li>
                <li>Find your Station ID from your weather station</li>
                <li>Enter the credentials below to enable real-time weather data</li>
              </ol>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  API Key
                </label>
                <input
                  type="text"
                  value={apiSettings.api_key}
                  onChange={(e) => setApiSettings(prev => ({ ...prev, api_key: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your WeatherLink API Key"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  API Secret
                </label>
                <input
                  type="password"
                  value={apiSettings.api_secret}
                  onChange={(e) => setApiSettings(prev => ({ ...prev, api_secret: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your WeatherLink API Secret"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Station ID
                </label>
                <input
                  type="text"
                  value={apiSettings.station_id}
                  onChange={(e) => setApiSettings(prev => ({ ...prev, station_id: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your Weather Station ID"
                />
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={apiSettings.is_active}
                    onChange={(e) => setApiSettings(prev => ({ ...prev, is_active: e.target.checked }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">Enable API Integration</span>
                </label>
                <p className="text-xs text-gray-500 ml-6">Automatically fetch weather data from WeatherLink</p>
              </div>

              {apiSettings.last_sync && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm text-green-800">
                    <strong>Last Sync:</strong> {new Date(apiSettings.last_sync).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 7-Day Forecast Tab */}
      {activeTab === 'forecast' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">7-Day Weather Forecast</h3>
            <button
              onClick={() => setIsForecastModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Add Forecast Day</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {forecast.map((day) => (
              <div key={day.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                    </h4>
                    <p className="text-sm text-gray-600">{day.condition}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditForecast(day)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteForecast(day.id!)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-gray-900">
                    {day.temperature_high}° / {day.temperature_low}°
                  </div>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-between">
                    <span>Humidity:</span>
                    <span>{day.humidity}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Wind:</span>
                    <span>{day.wind_speed} km/h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Rain:</span>
                    <span>{day.precipitation}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Forecast Modal */}
      {isForecastModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingForecastId ? 'Edit Forecast Day' : 'Add Forecast Day'}
                </h2>
                <button
                  onClick={resetForecastForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleForecastSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={forecastFormData.date}
                  onChange={(e) => setForecastFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    High Temperature (°C)
                  </label>
                  <input
                    type="number"
                    value={forecastFormData.temperature_high}
                    onChange={(e) => setForecastFormData(prev => ({ ...prev, temperature_high: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    max="50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Low Temperature (°C)
                  </label>
                  <input
                    type="number"
                    value={forecastFormData.temperature_low}
                    onChange={(e) => setForecastFormData(prev => ({ ...prev, temperature_low: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    max="50"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weather Condition
                </label>
                <input
                  type="text"
                  value={forecastFormData.condition}
                  onChange={(e) => setForecastFormData(prev => ({ ...prev, condition: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Partly Cloudy, Light Rain"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weather Icon
                </label>
                <select
                  value={forecastFormData.icon}
                  onChange={(e) => setForecastFormData(prev => ({ ...prev, icon: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="sunny">Sunny</option>
                  <option value="partly-cloudy">Partly Cloudy</option>
                  <option value="cloudy">Cloudy</option>
                  <option value="rainy">Rainy</option>
                  <option value="stormy">Stormy</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Humidity (%)
                  </label>
                  <input
                    type="number"
                    value={forecastFormData.humidity}
                    onChange={(e) => setForecastFormData(prev => ({ ...prev, humidity: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    max="100"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Wind Speed (km/h)
                  </label>
                  <input
                    type="number"
                    value={forecastFormData.wind_speed}
                    onChange={(e) => setForecastFormData(prev => ({ ...prev, wind_speed: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    max="200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Precipitation (%)
                  </label>
                  <input
                    type="number"
                    value={forecastFormData.precipitation}
                    onChange={(e) => setForecastFormData(prev => ({ ...prev, precipitation: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    max="100"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={forecastFormData.is_active}
                    onChange={(e) => setForecastFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">Active</span>
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={resetForecastForm}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Save size={16} />
                  <span>{editingForecastId ? 'Update' : 'Create'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherManagement;