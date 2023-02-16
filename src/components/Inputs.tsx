import React, { useState } from "react";
import { BiCurrentLocation, BiSearch } from "react-icons/bi";
import { toast } from "react-toastify";

type Props = {
    setQuery: any,
    units: any,
    setUnits: any,
}

function Inputs({ setQuery, units, setUnits }: Props) {
    const [city, setCity] = useState("");

    // This function handles the change in units from Celcius/Fahrenheit on user selection.
    const handleUnitsChange = (e:any) => {
        const selectedUnit = e.currentTarget.name;
        if (units !== selectedUnit) setUnits(selectedUnit);
    };

    // This function shows the weather if you search for a place
    const handleSearchClick = () => {
        if (city !== "") setQuery({ q: city });
    };

    // This function shows the weather of the current location
    const handleLocationClick = () => {
        // Get the user's location using Geolocation
        if (navigator.geolocation) {
            toast.info("Fetching users location.");
            navigator.geolocation.getCurrentPosition((position) => {
                toast.success("Location fetched!");
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;

                // set query state with user's location data
                setQuery({
                    lat,
                    lon,
                });
            });
        }
    };

    return (
        <div className="flex flex-row justify-center items-c my-6 max-w-[50rem]">
            <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
                <input
                    value={city}
                    onChange={(e) => setCity(e.currentTarget.value)}
                    type="text"
                    placeholder="Search for city...."
                    className="w-full px-4 py-2 text-xl placeholder-gray-400 border rounded-full shadow-lg focus:outline-none focus:border-transparent"
                />
                <BiSearch
                    size={25}
                    className="text-white cursor-pointer transition ease-out hover:scale-125"
                    onClick={handleSearchClick}
                />
                <BiCurrentLocation
                    size={25}
                    className="text-white cursor-pointer transition ease-out hover:scale-125"
                    onClick={handleLocationClick}
                />
            </div>

            <div className="flex flex-row w-1/4 items-center justify-center">
                <button
                    name="metric"
                    className="text-xl text-white font-light transition ease-out hover:scale-125"
                    onClick={handleUnitsChange}
                >
                    °C
                </button>
                <p className="text-xl text-white mx-1">|</p>
                <button
                    name="imperial"
                    className="text-xl text-white font-light transition ease-out hover:scale-125"
                    onClick={handleUnitsChange}
                >
                    °F
                </button>
            </div>
        </div>
    );
}

export default Inputs