import Forecast from '@/components/Forecast';
import Inputs from '@/components/Inputs';
import TemperatureAndDetails from '@/components/TemperatureAndDetails';
import TimeAndLocation from '@/components/TimeAndLocation';
import getFormattedWeatherData from '@/utils/apiSlice';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface WeatherData {
  timezone: any;
  list_daily: any;
  list_hourly: any;
  lat: any;
  lon: any;
  temp: any;
  feels_like: any;
  temp_min: any;
  temp_max: any;
  humidity: any;
  name: any;
  dt: any;
  country: any;
  sunrise: any;
  sunset: any;
  details: any;
  icon: any;
  speed: any;
}

export default function Home() {

  // const testFetchWeather = async () => {
  //   const data = getFormattedWeatherData({ q: "london" });
  //   console.log(data);
  // }

  // testFetchWeather();

  const [query, setQuery] = useState({ q: "Lucknow" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => { // execute fetchWeather on mount using the query and units parameters
    const fetchWeather = async () => { // build friendly message depending on whether query.q exists or is currently location
      const message = query.q ? query.q : "current location.";

      // display information toast message
      toast.info("Fetching weather for " + message);

      // fetch formattedWeatherData with query and units parameters
      try{
        await getFormattedWeatherData({ ...query, units }).then((data) => {
          toast.success(
            `Successfully fetched weather for ${data.name}, ${data.country}.`
          );
  
          setWeather(data);
        });
      }
      catch{
        toast.error("City name invalid");
      }
    };

    fetchWeather();
  }, [query, units]); //update every time the location or the units have changed

  // This function determines the background of the page depending on the current temp of the city being searched.
  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 30 : 86;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  };

  return (
    <div
      className={`mx-auto max-w-screen h-screen py-5 px-32 flex justify-center bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <div className="max-w-[50rem] flex flex-col justify-center mb-10">
        <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

        {weather && (
          <div>
            <TimeAndLocation weather={weather} />
            <TemperatureAndDetails weather={weather} />

            <Forecast title="hourly forecast" items={weather.list_hourly} />
            <Forecast title="daily forecast" items={weather.list_daily} />
          </div>
        )}
      </div>

      <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
    </div>
  )
}
