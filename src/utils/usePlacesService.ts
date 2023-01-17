import { RefObject, useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const googleLoader = new Loader({
  apiKey: "AIzaSyDIb6tuC5IBX5yf8pYBMs_hLkZicqDHZ9k",
  version: "weekly",
  libraries: ["places"],
});

export default function usePlacesService(mapEl: RefObject<HTMLDivElement>) {
  const [service, setService] = useState<google.maps.places.PlacesService>();

  useEffect(() => {
    googleLoader
      .load()
      .then((google) =>
        mapEl.current
          ? setService(new google.maps.places.PlacesService(mapEl.current))
          : null
      );
  }, [mapEl.current]);

  return service;
}
