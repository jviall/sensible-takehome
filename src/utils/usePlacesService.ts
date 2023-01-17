import { RefObject, useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import useMapEl from "./useMapEl";

const googleLoader = new Loader({
  apiKey: "AIzaSyDIb6tuC5IBX5yf8pYBMs_hLkZicqDHZ9k",
  version: "weekly",
  libraries: ["places"],
});

export default function usePlacesService() {
  const [service, setService] = useState<google.maps.places.PlacesService>();
  const mapEl = useMapEl();

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
