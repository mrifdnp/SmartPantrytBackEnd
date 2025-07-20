"use client"

import { useState } from "react"
import { Cloud, Sun, CloudRain } from "lucide-react"

export function WeatherWidget() {
  const [weather, setWeather] = useState({
    temp: 28,
    condition: "sunny",
    location: "Jakarta",
  })

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="w-6 h-6" />
      case "cloudy":
        return <Cloud className="w-6 h-6" />
      case "rainy":
        return <CloudRain className="w-6 h-6" />
      default:
        return <Sun className="w-6 h-6" />
    }
  }

  const getWeatherAdvice = (condition: string) => {
    switch (condition) {
      case "rainy":
        return "Hari hujan, pastikan stok sayuran cukup!"
      case "sunny":
        return "Cuaca cerah, waktu yang tepat untuk belanja"
      default:
        return "Cuaca mendung, perhatikan kelembaban makanan"
    }
  }

  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-white">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {getWeatherIcon(weather.condition)}
          <span className="text-2xl font-bold">{weather.temp}°C</span>
        </div>
        <div>
          <div className="font-medium">{weather.location}</div>
          <div className="text-sm text-green-100">{getWeatherAdvice(weather.condition)}</div>
        </div>
      </div>
    </div>
  )
}
