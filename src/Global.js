import React, { useState } from "react";
import { MapCities } from "./MapCities";

export const LocationTracker = () => {
  const [userCoords, setUserCoords] = useState(false)

  return (
    <div>
      <button onClick={() => setUserCoords(k => !k)}>Show user coords</button>
      {userCoords && <MapCities />}
    </div>
  );
};