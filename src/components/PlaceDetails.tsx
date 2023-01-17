import { useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { IPlaceDetails } from "../utils/types";
import usePlaceDetails, { getPlaceDetails } from "../utils/usePlaceDetails";
import usePlacesService from "../utils/usePlacesService";

const extractHostname = (str: string) =>
  str.match(
    new RegExp(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/)
  )?.[0] ?? str;

interface Props {
  placeId: string;
}

export default function PlaceDetails({ placeId }: Props) {
  const mapEl = useRef<HTMLDivElement>(null);
  const [fetchEnabled, setFetchEnabled] = useState(false);
  const queryClient = useQueryClient();
  const placesService = usePlacesService(mapEl);
  const { data } = usePlaceDetails(placesService, placeId, fetchEnabled);
  const {
    formatted_address: address,
    formatted_phone_number: phoneNumber,
    opening_hours = {} as google.maps.places.PlaceOpeningHours,
    website,
  } = data ?? ({} as IPlaceDetails);
  const { weekday_text: hours } = opening_hours;
  return (
    <details className="row-start-3">
      <summary
        className="cursor-pointer font-semibold mb-2"
        onMouseEnter={async () => {
          await queryClient.prefetchQuery({
            queryKey: ["getDetails", placeId],
            queryFn: () =>
              getPlaceDetails(
                placesService as google.maps.places.PlacesService,
                placeId
              ),
            staleTime: 60 * 1000, // only prefetch if older than 1 minute
          });
        }}
        onClick={() => setFetchEnabled(true)}
      >
        Detailed Info
      </summary>
      {/* expanded details */}
      <div className="grid grid-cols-2 gap-x-2">
        {address && (
          <>
            <div className="font-semibold text-sm col-start-1 row-start-1">
              Full Address
            </div>
            <div className="text-sm col-start-2 row-start-1">{address}</div>
          </>
        )}
        {phoneNumber && (
          <>
            <div className="font-semibold text-sm col-start-1 row-start-2">
              Phone Number
            </div>
            <div className="text-sm col-start-2 row-start-2">{phoneNumber}</div>
          </>
        )}
        {hours && (
          <>
            <div className="font-semibold text-sm col-start-1 row-start-3">
              Hours
            </div>
            <div className="text-sm col-start-2 row-start-3">
              {hours?.join(", ") ?? "n/a"}
            </div>
          </>
        )}
        {website && (
          <>
            <div className="font-semibold text-sm col-start-1 row-start-4">
              Website
            </div>
            <a
              className="text-sm col-start-2 row-start-4 break-words"
              href={website}
            >
              {extractHostname(website)}
            </a>
          </>
        )}
      </div>
      <div className="hidden" ref={mapEl} />
    </details>
  );
}
