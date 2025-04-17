"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { getWeatherData } from "./actions"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Loader2 } from "lucide-react"

export default function WeatherApp() {
  const [city, setCity] = useState("Dubai")
  const [weatherData, setWeatherData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Fetch Dubai weather on component mount
    const fetchInitialWeather = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await getWeatherData("Dubai")
        setWeatherData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch weather data")
        setWeatherData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchInitialWeather()
  }, []) // Empty dependency array means this runs once on mount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!city.trim()) return

    setLoading(true)
    setError(null)

    try {
      const data = await getWeatherData(city)
      setWeatherData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch weather data")
      setWeatherData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-col py-16 flex justify-center max-w-3xl mx-auto my-auto min-h-screen font-mono">


      <form onSubmit={handleSubmit} className="mb-8 flex flex-col md:flex-row gap-4">
        <Input
          type="text"
          value={city === "Dubai" ? "" : city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="ENTER CITY NAME"
          className="flex-1 border-4 border-black rounded-none h-14 text-lg uppercase placeholder:text-gray-500"
        />
        <Button
          type="submit"
          disabled={loading || !city.trim()}
          className="bg-black text-white border-4 border-black rounded-none h-14 px-8 hover:bg-white hover:text-black transition-none text-lg"
        >
          {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "GET WEATHER"}
        </Button>
      </form>

      {error && (
        <div className="border-4 border-black p-6 mb-8 bg-white">
          <h2 className="text-2xl font-bold mb-4 uppercase">ERROR</h2>
          <p className="text-lg">{error}</p>
        </div>
      )}

      {weatherData && (
        <div className="border-4 border-black p-6 bg-white">
          <h2 className="text-2xl font-bold mb-4 uppercase border-b-4 border-black pb-2">
            {weatherData.name}, {weatherData.sys.country}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-4 border-black p-4">
              <h3 className="text-xl font-bold mb-2 uppercase">CURRENT CONDITIONS</h3>
              <p className="text-5xl font-bold mb-4">{Math.round(weatherData.main.temp)}°C</p>
              <p className="text-xl uppercase">{weatherData.weather[0].main}</p>
              <p className="text-lg">{weatherData.weather[0].description}</p>
            </div>

            <div className="border-4 border-black p-4">
              <h3 className="text-xl font-bold mb-2 uppercase">DETAILS</h3>
              <ul className="space-y-2 text-lg">
                <li className="flex justify-between">
                  <span>FEELS LIKE:</span>
                  <span>{Math.round(weatherData.main.feels_like)}°C</span>
                </li>
                <li className="flex justify-between">
                  <span>HUMIDITY:</span>
                  <span>{weatherData.main.humidity}%</span>
                </li>
                <li className="flex justify-between">
                  <span>WIND:</span>
                  <span>{Math.round(weatherData.wind.speed * 3.6)} KM/H</span>
                </li>
                <li className="flex justify-between">
                  <span>PRESSURE:</span>
                  <span>{weatherData.main.pressure} hPa</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 border-4 border-black p-4">
            <h3 className="text-xl font-bold mb-2 uppercase">MIN / MAX</h3>
            <div className="flex justify-between text-lg">
              <span>MIN: {Math.round(weatherData.main.temp_min)}°C</span>
              <span>MAX: {Math.round(weatherData.main.temp_max)}°C</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
