import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get WeatherLink API settings
    const { data: settings, error: settingsError } = await supabaseClient
      .from('weather_api_settings')
      .select('*')
      .eq('is_active', true)
      .single()

    if (settingsError || !settings) {
      throw new Error('WeatherLink API settings not found')
    }

    // Prepare WeatherLink API request
    const apiKey = settings.api_key
    const apiSecret = settings.api_secret
    const stationId = settings.station_id
    const timestamp = Math.floor(Date.now() / 1000)

    // Create signature for WeatherLink API v2
    const parameters = `api-key${apiKey}station-id${stationId}t${timestamp}`
    const signature = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(apiSecret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    ).then(key => 
      crypto.subtle.sign('HMAC', key, new TextEncoder().encode(parameters))
    ).then(signature => 
      Array.from(new Uint8Array(signature))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
    )

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
        alerts: [],
        last_updated: new Date().toISOString(),
        is_active: true
      })

    if (updateError) {
      throw updateError
    }

    // Update last sync time
    await supabaseClient
      .from('weather_api_settings')
      .update({ last_sync: new Date().toISOString() })
      .eq('id', settings.id)

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          temperature,
          humidity,
          wind_speed: windSpeed,
          condition,
          description,
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