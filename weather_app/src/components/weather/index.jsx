import React, { useEffect, useState } from 'react'
import Search from '../search'

function Weather() {
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [weatherData, setWeatherData] = useState(null)

    async function fetchWeatherData(param) {
        const city = param?.trim()
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY?.trim()

        if (!city || !apiKey) return

        setLoading(true)
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
                    city
                )}&appid=${apiKey}&units=metric`
            )

            const data = await response.json()

            if (!response.ok) {
                console.log('API error:', data)
                setWeatherData(null)
                return
            }

            setWeatherData(data)
        } catch (e) {
            console.log(e)
            setWeatherData(null)
        } finally {
            setLoading(false)
        }
    }

    function handleSearch() {
        fetchWeatherData(search)
    }

    function getCurrentDate() {
        return new Date().toLocaleDateString('en-us', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        })
    }

    useEffect(() => {
        fetchWeatherData('islamabad')
    }, [])

    return (
        <div>
            <Search
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}
            />

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <div className='city-name'>
                        <h2>
                            {weatherData?.name},<span>{weatherData?.sys?.country}</span>
                        </h2>
                    </div>
                    <div className='date'>
                        <span>{getCurrentDate()}</span>
                    </div>
                    <div>{weatherData?.main?.temp}°C</div>
                    <p className='description'>
                        {weatherData?.weather?.[0]?.description || ''}
                    </p>

                    <div className='weather-info'>
                        <div>
                            <div>
                                <p className='wind'>{weatherData?.wind?.speed}</p>
                                <p>Wind Speed</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p className='humidity'>{weatherData?.main?.humidity}%</p>
                                <p>Humidity</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Weather