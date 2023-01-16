import { useState, useRef } from "react";
import Select from "./Select";
import useNearbyPlaces from "../utils/useNearbyPlaces";
import { locations } from "../utils/constants";
import { ILocation } from "../utils/types";
import PlaceCard from "./PlaceCard";
import Search from "./Search";

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
    console.log(JSON.parse(e.target.value));
    setLocation(JSON.parse(e.target.value) as ILocation);
  };
  return (
    <div className=" w-full flex flex-col items-center">
      <div className="w-full flex flex-col items-stretch md:flex-row md:items-end md:justify-center md:space-x-2">
        <Select
          value={JSON.stringify(location)}
          onChange={handleLocationChange}
          options={locations}
          label="Select a Location"
        />
        <Search
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          label={`Find in ${location.name}`}
        />
      </div>
      <div className="self-center my-2 w-full flex">
        {error && <pre>{JSON.stringify(error)}</pre>}
        {isLoading && search?.length ? (
          <span className="text-xl self-center text-center w-full">
            loading...
          </span>
        ) : data && data.length ? (
          <ul className="w-full">
            {data?.map((place) => (
              <li key={place.place_id} className="mb-4">
                <PlaceCard place={place} />
              </li>
            ))}
          </ul>
        ) : (
          <span className="text-lg self-center text-center w-full">
            {!search?.length ? "Search for a place." : "No results."}
          </span>
        )}
      </div>
      <div id="map" className="hidden" ref={mapEl} />
    </div>
  );
}
