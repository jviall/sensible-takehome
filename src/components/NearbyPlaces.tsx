import { useState, useRef } from "react";
import Select from "./Select";
import useNearbyPlaces from "../utils/useNearbyPlaces";
import { locations } from "../utils/constants";
import { ILocation } from "../utils/types";
import Search from "./Search";
import DataList from "./DataList";
import PlaceCard from "./PlaceCard";

interface Props {}
export default function NearbyPlaces({}: Props) {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState<ILocation>(locations[0]);
  const mapEl = useRef<HTMLDivElement>(null);
  const { data, isLoading, error } = useNearbyPlaces(
    mapEl,
    location.center,
    search
  );

  const handleLocationChange: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    setLocation(JSON.parse(e.target.value) as ILocation);
  };
  return (
    <div className="w-full grid grid-cols-1 grid-rows=[min-content_1fr] items-center gap-2">
      <div className="w-full flex flex-col items-stretch md:flex-row md:items-end md:justify-center md:space-x-2">
        <Select
          value={JSON.stringify(location)}
          onChange={handleLocationChange}
          options={locations}
          label="Location"
        />
        <Search
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          label={`Search in ${location.name}`}
        />
      </div>

      <DataList
        data={data ?? []}
        getItemKey={(item) => String(item.place_id)}
        label={
          !search?.length
            ? "Search for a place."
            : isLoading
            ? "Loading..."
            : `${data?.length ?? 0} results.`
        }
      >
        {(item) => <PlaceCard place={item} />}
      </DataList>

      <div id="map" className="hidden" ref={mapEl} />
    </div>
  );
}
