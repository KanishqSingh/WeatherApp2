import React, { useEffect, useRef } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import { useState } from 'react';

const Weather = () => {

    const inputref = useRef()

    const [weatherData , setWeatherData] = useState(false)

    const allIcons = {
        "01d":clear_icon,
        "01n":clear_icon,
        "02d":cloud_icon,
        "02n":cloud_icon

    }

       const search=async(city)=>{
        if(city == ""){
            alert("enter city name");
            return
        }


        try {
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response =await fetch(url);
            const data=await response.json();
            console.log(data);
            
            const icon = allIcons[data.weather[0].icon] || clear_icon;

            setWeatherData({
                humidity:data.main.humidity,
                windSpeed:data.wind.speed,
                temperature:data.main.temp,
                location:data.name,
                icon:icon
            })

        } catch (error) {
            
        }
       }

       useEffect(()=>{
        search("Delhi");
       },[])


    return (
        <div className='weather'>
            <div className='search-bar'>
                <input ref = {inputref} type="text" placeholder='Search' />
                <img src={search_icon} alt="Search" onClick={() => search(inputref.current.value)}/>
            </div>
            <img src={clear_icon} alt="Clear" className='weather-icon' />
            <p className='temperature'>{weatherData.temperature}°C</p>
            <p className='city-name'>{weatherData.location}</p>
            <div className='weather-data'>
                <div className='weather-item'>
                    <img src={humidity_icon} alt="Humidity" />
                    <div>
                        <p>{weatherData.humidity}</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className='weather-item'>
                    <img src={wind_icon} alt="Wind Speed" />
                    <div>
                        <p>{weatherData.windSpeed}</p>

                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;
