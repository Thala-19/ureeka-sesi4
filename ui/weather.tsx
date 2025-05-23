'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Weather() {
  const [weather, setWeather] = useState<any>(null);
  const [city, setCity] = useState('Jakarta');
  const [loading, setLoading] = useState(false);

  const API_KEY = '0724d1a51d5016bd00765535ff3644dde';

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://api.weatherstack.com/current`, {
          params: {
            access_key: API_KEY,
            query: city,
          },
        });
        console.log(res.data)
        setWeather(res.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchWeather();
  }, [city]);

  if (!weather || !weather.location) {
    return <h1 className='text-6xl font-sans text-bold'>Loading weather...</h1>;
  }

  <p>City: {weather.location.name}</p>


  return (
    <div>
      <h2>Weather in {weather.location.name}</h2>
      <p>{weather.current.temperature}°C, {weather.current.weather_descriptions[0]}</p>
    </div>
  );
}
