import { useEffect, useState } from "react"

export default function Weather() {
    const [weather, setWeather] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

    useEffect(() => {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser")
        setLoading(false)
        return
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            setLoading(true)
            const { latitude, longitude } = position.coords
            const res = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
            )

            if (!res.ok) throw new Error("Weather data not found")

            const data = await res.json()
            setWeather(data)
          } catch (err) {
            setError(err.message)
          } finally {
            setLoading(false)
          }
        },
        (err) => {
          console.error(err)
          setError("Unable to retrieve your location")
          setLoading(false)
        }
      )
    }, [])

    if (loading) {
      return (
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-medium">Weather
            <div className="flex justify-center items-center py-6 space-x-2">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
            </div>
          </h2>
        </div>
      )
    }
    if (error) {
      return (
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-red-500 text-sm">Error: {error}</p>
        </div>
      )
    }

    const iconCode = weather.weather[0].icon
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    const temp = Math.round(weather.main.temp)
    const isBreezy = temp < 29

    return (
      <div className={`rounded-lg shadow p-4 ${isBreezy ? "bg-blue-200" : "bg-orange-200"}`}>
        <h2 className="text-lg font-semibold mb-2">{weather.name}</h2>
        <div className="flex items-center justify-between">
          <p className="text-5xl font-bold">{Math.round(weather.main.temp)}°C
          </p>
          <img src={iconUrl} alt={weather.weather[0].description} className="w-20 h-20 object-contain self-center"/>
        </div>
        <p className="text-sm capitalize">{weather.weather[0].description}</p>
      </div>
    )
}