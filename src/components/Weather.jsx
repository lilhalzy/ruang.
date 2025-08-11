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
          <p className="text-gray-500 text-sm">Loading weather...</p>
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
    return (
      <div className="bg-blue-50 rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-2">{weather.name}</h2>
        <p className="text-4xl font-bold">{Math.round(weather.main.temp)}°C</p>
        <p className="text-sm capitalize">{weather.weather[0].description}</p>
      </div>
    )
}