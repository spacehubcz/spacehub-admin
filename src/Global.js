import React, { useState } from "react";

export const LocationTracker = () => {
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });
  const [bom, setBom] = useState(8);

  const showCoordinates = () => {
    let watchId;

    if ("geolocation" in navigator) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });console.log(watchId);
        },
        (error) => {
          console.error("Error watching location:", error.message);
          setBom(error.message);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 10000,
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setBom(4);
    }

    // Cleanup function to stop watching on unmount
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }

  return (
    <div>
      
    </div>
  );
};