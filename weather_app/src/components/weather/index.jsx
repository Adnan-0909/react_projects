import React, { useEffect, useState } from 'react'
import Search from '../search'

function Weather() {
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [weatherData, setWeatherData] = useState(null)

    async function fetchWeatherData(param) {
        setLoading(true)
        try {
            const response = await fetch(
                `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${param}&appid=05c51ced5757217bd8cbe1201a9b8faf`
            )

            const data = await response.json()
            console.log(data, 'data')
            if (data) {
                setLoading(false)
                setWeatherData(data)
            }
        }


        catch (e) {
            setLoading(false)
            console.log(e)
        }
    }

    function handleSearch() {
        fetchWeatherData(search)
    }

    function getCurrentDate(){
        return new Date().toLocaleDateString('en-us',{
            weekday: 'long',
            month:'long',
            day:'numeric',
            year:'numeric'
        })
    }

    useEffect(() => {
        fetchWeatherData('islamabad')
    }, [])

    console.log(weatherData)
    return (
        <div>
            <Search
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}
            />

            {
                loading ? <div>Loading...</div> :
                    <div>
                        <div className='city-name'>
                            <h2> {weatherData?.name},<span>{weatherData?.sys?.country}</span></h2>
                        </div>
                        <div className='date'><span>{getCurrentDate()}</span></div>
                        <div>{weatherData?.main?.temp}</div>
                        <p className='description'>{weatherData && weatherData.weather && weatherData.weather[0] ? weatherData.weather[0].description:''}</p>
                        <div className='weather-info'>
                            <div>
                                <div>
                                    <p className='wind'>
                                        {weatherData?.wind?.speed}
                                    </p>
                                    <p>
                                        Speed
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

            }
        </div>
    )
}

export default Weather