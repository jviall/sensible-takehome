import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IPlace } from "./types";

async function getNearbyPlaces(
  service: google.maps.places.PlacesService | undefined,
  center: google.maps.LatLngLiteral,
  keyword: string
): Promise<IPlace[]> {
  return new Promise<IPlace[]>((resolve) => {
    if (!service) throw new Error("Google Service undefined");
    service.nearbySearch(
      {
        location: center,
        rankBy: google.maps.places.RankBy.PROMINENCE,
        keyword: keyword,
      },
      (places) => resolve(places as IPlace[])
    );
  });
}

export default function useNearbyPlaces(
  service: google.maps.places.PlacesService | undefined,
  center: google.maps.LatLngLiteral,
  keyword: string
): UseQueryResult<IPlace[]> {
  const nearbyPlaces = useQuery({
    queryKey: ["nearbyPlaces", { center, keyword }],
    queryFn: async () => getNearbyPlaces(service, center, keyword),
    enabled: Boolean(keyword.length > 0 && service),
  });

  return nearbyPlaces;
}
