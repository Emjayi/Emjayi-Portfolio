"use server"

type GeocodingResult = {
  id: number
  name: string
  latitude: number
  longitude: number
  country: string
  country_code: string
}

type WeatherResponse = {
  latitude: number
  longitude: number
  current: {
    temperature_2m: number
    relative_humidity_2m: number
    apparent_temperature: number
    precipitation: number
    weather_code: number
    pressure_msl: number
    wind_speed_10m: number
  }
  current_units: {
    temperature_2m: string
    relative_humidity_2m: string
    apparent_temperature: string
    precipitation: string
    pressure_msl: string
    wind_speed_10m: string
  }
}

// Weather code mapping based on WMO codes
const weatherCodeToDescription: Record<number, { main: string; description: string }> = {
  0: { main: "Clear", description: "Clear sky" },
  1: { main: "Mainly Clear", description: "Mainly clear" },
  2: { main: "Partly Cloudy", description: "Partly cloudy" },
  3: { main: "Cloudy", description: "Overcast" },
  45: { main: "Fog", description: "Fog" },
  48: { main: "Fog", description: "Depositing rime fog" },
  51: { main: "Drizzle", description: "Light drizzle" },
  53: { main: "Drizzle", description: "Moderate drizzle" },
  55: { main: "Drizzle", description: "Dense drizzle" },
  56: { main: "Freezing Drizzle", description: "Light freezing drizzle" },
  57: { main: "Freezing Drizzle", description: "Dense freezing drizzle" },
  61: { main: "Rain", description: "Slight rain" },
  63: { main: "Rain", description: "Moderate rain" },
  65: { main: "Rain", description: "Heavy rain" },
  66: { main: "Freezing Rain", description: "Light freezing rain" },
  67: { main: "Freezing Rain", description: "Heavy freezing rain" },
  71: { main: "Snow", description: "Slight snow fall" },
  73: { main: "Snow", description: "Moderate snow fall" },
  75: { main: "Snow", description: "Heavy snow fall" },
  77: { main: "Snow Grains", description: "Snow grains" },
  80: { main: "Rain Showers", description: "Slight rain showers" },
  81: { main: "Rain Showers", description: "Moderate rain showers" },
  82: { main: "Rain Showers", description: "Violent rain showers" },
  85: { main: "Snow Showers", description: "Slight snow showers" },
  86: { main: "Snow Showers", description: "Heavy snow showers" },
  95: { main: "Thunderstorm", description: "Thunderstorm" },
  96: { main: "Thunderstorm", description: "Thunderstorm with slight hail" },
  99: { main: "Thunderstorm", description: "Thunderstorm with heavy hail" },
}

export async function getWeatherData(city: string) {
  try {
    // Step 1: Geocode the city name to get coordinates
    const geocodingResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`,
    )

    if (!geocodingResponse.ok) {
      throw new Error("Failed to geocode city")
    }

    const geocodingData = await geocodingResponse.json()

    if (!geocodingData.results || geocodingData.results.length === 0) {
      throw new Error("City not found. Please check the spelling and try again.")
    }

    const location = geocodingData.results[0] as GeocodingResult

    // Step 2: Get weather data using the coordinates
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,pressure_msl,wind_speed_10m&timezone=auto`,
    )

    if (!weatherResponse.ok) {
      throw new Error("Failed to fetch weather data")
    }

    const weatherData = (await weatherResponse.json()) as WeatherResponse

    // Format the data to match our component's expectations
    const current = weatherData.current
    const weatherCode = current.weather_code
    const weather = weatherCodeToDescription[weatherCode] || {
      main: "Unknown",
      description: "Unknown weather condition",
    }

    return {
      name: location.name,
      sys: {
        country: location.country_code,
      },
      main: {
        temp: current.temperature_2m,
        feels_like: current.apparent_temperature,
        humidity: current.relative_humidity_2m,
        pressure: current.pressure_msl,
        temp_min: current.temperature_2m - 1, // Open-Meteo doesn't provide min/max directly
        temp_max: current.temperature_2m + 1, // We're approximating for UI purposes
      },
      weather: [
        {
          main: weather.main,
          description: weather.description,
        },
      ],
      wind: {
        speed: current.wind_speed_10m / 3.6, // Convert km/h to m/s to match our component
      },
    }
  } catch (error) {
    console.error("Error fetching weather data:", error)
    throw error
  }
}
