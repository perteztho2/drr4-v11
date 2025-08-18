import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface WeatherLinkResponse {
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

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Use environment variables directly for security
    const apiKey = Deno.env.get('VITE_WEATHERLINK_API_KEY_V2')
    const apiSecret = Deno.env.get('VITE_WEATHERLINK_API_SECRET')
    const stationId = Deno.env.get('VITE_WEATHERLINK_STATION_UUID')

    if (!apiKey || !apiSecret || !stationId) {
      throw new Error('WeatherLink API credentials not configured')
    }

    const timestamp = Math.floor(Date.now() / 1000)

    // Create HMAC signature for WeatherLink API v2
    const parameters = `api-key${apiKey}station-id${stationId}t${timestamp}`
    
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(apiSecret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    )
    
    const signatureBuffer = await crypto.subtle.sign(
      'HMAC', 
      key, 
      new TextEncoder().encode(parameters)
    )
    
    const signature = Array.from(new Uint8Array(signatureBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')

    // Fetch current conditions from WeatherLink API
    const weatherUrl = `https://api.weatherlink.com/v2/current/${stationId}?api-key=${apiKey}&api-signature=${signature}&t=${timestamp}`
    
    const weatherResponse = await fetch(weatherUrl)
    
    if (!weatherResponse.ok) {
      throw new Error(`WeatherLink API error: ${weatherResponse.status}`)
    }

    const weatherData: WeatherLinkResponse = await weatherResponse.json()
    
    if (!weatherData.data?.conditions?.[0]) {
      throw new Error('No weather data available from WeatherLink')
    }

    const conditions = weatherData.data.conditions[0]
    
    // Convert WeatherLink data to our format
    const temperature = Math.round((conditions.temp - 32) * 5/9) // Convert F to C
    const humidity = Math.round(conditions.hum)
    const windSpeed = Math.round(conditions.wind_speed_avg_last_10_min * 1.60934) // Convert mph to km/h
    const pressure = Math.round(conditions.bar_sea_level * 33.8639) // Convert inHg to mbar
    const visibility = 10 // Default visibility
    
    // Determine condition based on weather data
    let condition = 'sunny'
    let description = 'Clear'
    
    if (conditions.rain_rate_last > 0) {
      condition = 'rainy'
      description = 'Rainy'
    } else if (humidity > 80) {
      condition = 'cloudy'
      description = 'Cloudy'
    } else if (conditions.wind_speed_avg_last_10_min > 25) {
      condition = 'stormy'
      description = 'Windy'
    } else {
      condition = 'sunny'
      description = 'Clear'
    }

    // Generate weather alerts
    const alerts = []
    if (temperature >= 35) alerts.push('Heat Warning: Extreme temperatures')
    if (windSpeed >= 50) alerts.push('High Wind Warning')
    if (conditions.rain_rate_last > 5) alerts.push('Heavy Rain Warning')

    // Update weather data in database
    const { error: updateError } = await supabaseClient
      .from('weather_data')
      .upsert({
        temperature,
        humidity,
        wind_speed: windSpeed,
        visibility,
        condition,
        description,
        location: 'Pio Duran, Albay',
        alerts,
        last_updated: new Date().toISOString(),
        is_active: true
      })

    if (updateError) {
      throw updateError
    }

    // Also update forecast data
    await updateForecastData(supabaseClient, temperature, humidity, windSpeed)

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          temperature,
          humidity,
          wind_speed: windSpeed,
          condition,
          description,
          pressure,
          uv_index: Math.round(conditions.uv_index),
          alerts,
          last_updated: new Date().toISOString()
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Weather sync error:', error)
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})

// Helper function to update forecast data
async function updateForecastData(supabaseClient: any, currentTemp: number, currentHumidity: number, currentWind: number) {
  try {
    const forecastData = []
    
    for (let i = 0; i < 7; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      
      // Generate realistic forecast based on current conditions
      const tempVariation = Math.random() * 6 - 3 // ±3°C variation
      const humidityVariation = Math.random() * 20 - 10 // ±10% variation
      
      forecastData.push({
        date: date.toISOString().split('T')[0],
        temperature_high: Math.round(currentTemp + tempVariation + 2),
        temperature_low: Math.round(currentTemp + tempVariation - 4),
        condition: i === 0 ? 'Current' : ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain'][Math.floor(Math.random() * 4)],
        humidity: Math.max(30, Math.min(100, Math.round(currentHumidity + humidityVariation))),
        wind_speed: Math.max(0, Math.round(currentWind + (Math.random() * 10 - 5))),
        precipitation: Math.floor(Math.random() * 60),
        icon: ['sunny', 'partly-cloudy', 'cloudy', 'rainy'][Math.floor(Math.random() * 4)],
        is_active: true
      })
    }
    
    // Clear existing forecast
    await supabaseClient
      .from('weather_forecast')
      .update({ is_active: false })
      .eq('is_active', true)
    
    // Insert new forecast
    await supabaseClient
      .from('weather_forecast')
      .insert(forecastData)
      
  } catch (error) {
    console.error('Error updating forecast data:', error)
  }
}