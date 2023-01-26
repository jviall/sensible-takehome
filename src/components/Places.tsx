import DataList from "./DataList";
import PlaceCard from "./PlaceCard";
import useNearbyPlaces from "../utils/useNearbyPlaces";

interface Props {
  keyword: string;
  location: google.maps.LatLngLiteral;
}

export default function Places({ keyword, location }: Props) {
  const { data } = useNearbyPlaces(location, keyword);

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
