import { DateTime } from "luxon";
import { toast } from 'react-toastify';

const API_KEY = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// https://api.openweathermap.org/data/2.5/onecall?lat=48.8534&lon=2.3488&exclude=current,minutely,hourly,alerts&appid=08853c52ffeb1cbe54169013d9605322&units=metric



// This function fetches weather data based on the provided input parameters
const getWeatherData = (infoType: any, searchParams: any) => {
    // Create the request url using the base url and the infoType
    const url = new URL(BASE_URL + "/" + infoType);
    // Append search parameters along with api key
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY }).toString();
    // Fetch the data by passing the constructed url
    return fetch(url).then((res) => res.json());
};


// current weather formatter
const formatCurrentWeather = (data: any) => {
    // destructuring to get what I need 
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed },
    } = data;

    // because weather is an array so only getting the main and icon
    const { main: details, icon } = weather[0];

    return {
        lat,
        lon,
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        name,
        dt,
        country,
        sunrise,
        sunset,
        details,
        icon,
        speed,
    };
};

// daily and hourly weather formatter
const formatForecastWeather = (data: any) => {
    let { list } = data;
    let { timezone } = data.city;

    // for daily forcast
    const list_daily = list?.slice(1, 6).map((d: any) => {
        return {
            title: formatToLocalTime(d.dt, timezone, "ccc"),
            temp: d.main.temp,
            icon: d.weather[0].icon,
        };
    });

    // for hourly forcast
    const list_hourly = list?.slice(1, 6).map((d: any) => {
        return {
            title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
            temp: d.main.temp,
            icon: d.weather[0].icon,
        };
    });

    return { timezone, list_daily, list_hourly };
};

// Async function to fetch current and forecast weather data from the api with given params
const getFormattedWeatherData = async (searchParams: any) => {
    // current weather
    const formattedCurrentWeather = await getWeatherData(
        "weather",
        searchParams
    ).then(formatCurrentWeather);

    let lat: any;
    let lon: any;

    try {
        ({ lat, lon } = formattedCurrentWeather);
    } catch (error) {
        throw error;
    }

    // daily and hourly weather
    const formattedForecastWeather = await getWeatherData("forecast", {
        lat,
        lon,
        exclude: "current,minutely,alerts",
        units: searchParams.units, //for celcius and fahrenheit
    }).then(formatForecastWeather);

    // console.log(formattedCurrentWeather);
    // console.log(formattedForecastWeather);


    // final data with current, daily and hourly data from the api
    return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

// getting current time from 'luxon' library
const formatToLocalTime = (
    secs: any,
    zone: any,
    format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code: any) =>
    `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };

