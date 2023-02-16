import Image from "next/image";
import React from "react";
import { GiWaterDrop } from "react-icons/gi";
import {
    TbArrowDown, TbArrowUp, TbSunrise,
    TbSunset, TbTemperature
} from "react-icons/tb";
import { TiWeatherWindy } from "react-icons/ti";
import { formatToLocalTime, iconUrlFromCode } from "../utils/apiSlice";


type Props = {
    weather: any
}

function TemperatureAndDetails({
    weather: {
        details,
        icon,
        temp,
        temp_min,
        temp_max,
        sunrise,
        sunset,
        speed,
        humidity,
        feels_like,
        timezone,
    },
}:Props) {
    return (
        <div>
            <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
                <p>{details}</p>
            </div>

            <div className="flex flex-row items-center justify-between text-white py-3">
                <Image 
                    src={iconUrlFromCode(icon)} 
                    width={500}
                    height={500}
                    alt="main weather icon" 
                    className="w-20" 
                />
                <p className="text-5xl">{`${temp.toFixed()}°`}</p>
                <div className="flex flex-col space-y-2 justify-center">
                    <div className="flex font-light text-sm items-center">
                        <TbTemperature size={18} className="mr-1" />
                        Feels Like:
                        <span className="font-medium ml-1">{`${feels_like.toFixed()}°`}</span>
                    </div>
                    <div className="flex font-light text-sm items-center">
                        <GiWaterDrop size={18} className="mr-1" />
                        Humidity:
                        <span className="font-medium ml-1">{`${humidity.toFixed()}%`}</span>
                    </div>
                    <div className="flex font-light text-sm items-center">
                        <TiWeatherWindy size={18} className="mr-1" />
                        Wind:
                        <span className="font-medium ml-1">{`${speed.toFixed()} km/h`}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
                <TbSunrise />
                <p className="font-light">
                    Rise:{" "}
                    <span className="font-medium ml-1">
                        {formatToLocalTime(sunrise, timezone, "hh:mm a")}
                    </span>
                </p>
                <p className="font-light">|</p>

                <TbSunset />
                <p className="font-light">
                    Set:{" "}
                    <span className="font-medium ml-1">
                        {formatToLocalTime(sunset, timezone, "hh:mm a")}
                    </span>
                </p>
                <p className="font-light">|</p>

                <TbArrowUp />
                <p className="font-light">
                    High:{" "}
                    <span className="font-medium ml-1">{`${temp_max.toFixed()}°`}</span>
                </p>
                <p className="font-light">|</p>

                <TbArrowDown />
                <p className="font-light">
                    Low:{" "}
                    <span className="font-medium ml-1">{`${temp_min.toFixed()}°`}</span>
                </p>
            </div>
        </div>
    );
}

export default TemperatureAndDetails;