import React from 'react'
import { useState, useEffect } from 'react'

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const API_KEY ="5a83fe8234fc03d79b5d319320864273";
    const CITY ="Seoul";

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`)
                const data = await response.json();
                setWeather(data);
                console.log(data);

            } catch (error) {
                console.error("날씨 정보를 가져오는데 실패했습니다.", error)
            }
        }
        fetchWeather();



    },[])



    if(!weather) return <div>날씨 로딩중...</div>

    return (
        <div>
            <h3>현재 : {weather.name}</h3>
            <p>온도 : {weather.main.temp}</p>
            <p>상태 : {weather.weather[0].description} <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} /></p>
        </div>
    )
}

export default Weather