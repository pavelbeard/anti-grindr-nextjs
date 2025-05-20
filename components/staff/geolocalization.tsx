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

  if (process.env.NODE_ENV !== "production") {
    // Only show the geolocation section in non-production environments
    // This is useful for testing purposes
    // and to avoid showing it in production builds.
    // You can remove this check if you want to show it in production as well
    // or if you want to show it conditionally based on some other criteria.

    return (
      <section
        className={clsx(
          "fixed z-50 bottom-0 right-24 m-4 p-4 bg-white rounded shadow-lg"
        )}
      >
        <h2 className="text-lg font-semibold">Geolocation</h2>
        {location && (
          <p className="text-sm text-gray-500">
            Latitude: {location.coords.latitude}, Longitude:{" "}
            {location.coords.longitude}
          </p>
        )}
        {error && (
          <p className="text-sm text-red-500">
            Error:{" "}
            {error instanceof GeolocationPositionError ? error.message : error}
          </p>
        )}
      </section>
    ); // or render something based on the location or error state
  }
}
