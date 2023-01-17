import DataList from "./DataList";
import PlaceCard from "./PlaceCard";
import useNearbyPlaces from "../utils/useNearbyPlaces";
import usePlacesService from "../utils/usePlacesService";

interface Props {
  keyword: string;
  location: google.maps.LatLngLiteral;
}

export default function ({ keyword, location }: Props) {
  const placesService = usePlacesService();
  const { data } = useNearbyPlaces(placesService, location, keyword);

  return (
    <DataList
      data={data ?? []}
      getItemKey={(item) => String(item.place_id)}
      label={
        !keyword?.length
          ? "Search for a place."
          : `${data?.length ?? 0} results.`
      }
    >
      {(item) => <PlaceCard place={item} />}
    </DataList>
  );
}
