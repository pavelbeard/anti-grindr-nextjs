"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";

export default function Geolocalization() {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<GeolocationPositionError | string | null>(
    null
  );

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position);
      },
      (error) => {
        setError(error);
        setLocation(
          {
            coords: {
              latitude: 40.416775,
              longitude: -3.70379,
              accuracy: 0,
              altitude: null,
              altitudeAccuracy: null,
              heading: null,
              speed: null,
            },
            timestamp: Date.now(),
          } as GeolocationPosition // Fallback to a default location (Madrid, Spain)
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 600000,
      }
    );
  }, []);

  return null;
}
