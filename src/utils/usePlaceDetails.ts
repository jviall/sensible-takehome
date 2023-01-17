import { useQuery } from "@tanstack/react-query";
import { IPlaceDetails } from "./types";

export async function getPlaceDetails(
  service: google.maps.places.PlacesService,
  placeId: string
): Promise<IPlaceDetails> {
  const request: google.maps.places.PlaceDetailsRequest = {
    placeId,
    fields: [
      "formatted_address",
      "formatted_phone_number",
      "opening_hours",
      "website",
    ],
  };
  return new Promise((resolve) => {
    service.getDetails(request, (details) => {
      resolve(details as IPlaceDetails);
    });
  });
}

export default function usePlaceDetails(
  service: google.maps.places.PlacesService | undefined,
  placeId: string,
  enabled = true
) {
  return useQuery({
    queryKey: ["getDetails", placeId],
    queryFn: () =>
      getPlaceDetails(service as google.maps.places.PlacesService, placeId),
    enabled: Boolean(enabled && service),
    staleTime: 60 * 1000, // only refetch if older than 1-minute
  });
}
