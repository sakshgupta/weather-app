import React from "react";
import { formatToLocalTime } from "../utils/apiSlice";

type Props = {
    weather: any
}

function TimeAndLocation({ weather: { dt, timezone, name, country } }: Props) {
  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p className="text-white text-xl font-extralight">
          {formatToLocalTime(dt, timezone)}
        </p>
      </div>

      <div className="flex items-center justify-center my-3">
        <p className="text-white text-3xl font-medium">{`${name}, ${country}`}</p>
      </div>
    </div>
  )
}

export default TimeAndLocation