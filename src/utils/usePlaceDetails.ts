import { useQuery } from "@tanstack/react-query";
import { IPlaceDetails } from "./types";
import usePlacesService from "./usePlacesService";

export async function getPlaceDetails(
  service: google.maps.places.PlacesService | undefined,
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
  if (!service) throw new Error("Google Service undefined");
  return new Promise((resolve) => {
    service.getDetails(request, (details) => resolve(details as IPlaceDetails));
  });
}

export default function usePlaceDetails(
  placeId: string,
  enabled = true
) {
  const service = usePlacesService();
  return useQuery({
    queryKey: ["getDetails", placeId],
    queryFn: () => getPlaceDetails(service, placeId),
    enabled: Boolean(enabled && service),
    staleTime: 60 * 1000, // only refetch if older than 1-minute
  });
}
