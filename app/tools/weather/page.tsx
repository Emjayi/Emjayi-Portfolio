'use client'
// pages/weather-widget.tsx
import { useState } from 'react';

interface WeatherData {
    name: string;
    weather: { description: string }[];
    main: { temp: number; humidity: number };
}

const WeatherWidget = () => {
    const [city, setCity] = useState<string>('');
    const [weather, setWeather] = useState<WeatherData | null>(null);

    const fetchWeather = async () => {
        const response = await fetch(`http://api.weatherapi.com/v1?q=${city}&key=4e2656d0a9e24dccb9471316242507`);
        const data = await response.json();
        setWeather(data.temp_c);
    };

    return (
        <div>
            <h1>Weather Widget</h1>
            <input
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={fetchWeather}>Get Weather</button>
            {weather && (
                <div>
                    <h2>{weather.name}</h2>
                    <p>{weather.weather[0].description}</p>
                    <p>Temp: {weather.main.temp}°C</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                </div>
            )}
        </div>
    );
}

export default WeatherWidget;
