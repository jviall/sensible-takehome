import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IPlace } from "./types";

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
  service: google.maps.places.PlacesService | undefined,
  center: google.maps.LatLngLiteral,
  searchTerm: string
): UseQueryResult<IPlace[], Error> {
  const nearbyPlaces = useQuery<IPlace[], Error>(
    ["nearbyPlaces", { center, searchTerm }],
    async () =>
      getNearbyPlaces(
        service as google.maps.places.PlacesService,
        center,
        searchTerm
      ),
    { enabled: Boolean(searchTerm.length > 0 && service) }
  );

  return nearbyPlaces;
}
