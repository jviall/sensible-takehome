import { RefObject, useMemo } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IPlace } from "./types";

const googleLoader = new Loader({
  apiKey: "AIzaSyDIb6tuC5IBX5yf8pYBMs_hLkZicqDHZ9k",
  version: "weekly",
  libraries: ["places"],
});

async function getNearbyPlaces(
  service: google.maps.places.PlacesService | null,
  center: google.maps.LatLngLiteral,
  searchTerm: string
): Promise<IPlace[]> {
  return new Promise<IPlace[]>((resolve, reject) => {
    if (service === null) return reject("Google Service undefined");
    service.nearbySearch(
      {
        location: center,
        rankBy: google.maps.places.RankBy.DISTANCE,
        keyword: searchTerm,
      },
      (places) => resolve(places as IPlace[])
    );
  });
}

export default function useNearbyPlaces(
  mapEl: RefObject<HTMLDivElement>,
  center: google.maps.LatLngLiteral,
  searchTerm: string
): UseQueryResult<IPlace[], Error> {
  // re-use the map/service of each location;
  const service = useMemo(
    () =>
      googleLoader
        .load()
        .then((google) =>
          mapEl.current
            ? new google.maps.places.PlacesService(mapEl.current)
            : null
        ),
    [mapEl]
  );

  const nearbyPlaces = useQuery<IPlace[], Error>(
    ["nearbyPlaces", { center, searchTerm }],
    async () => getNearbyPlaces(await service, center, searchTerm),
    { enabled: searchTerm.length > 0 }
  );

  return nearbyPlaces;
}
