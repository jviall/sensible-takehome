import { useState, useRef } from "react";
import useNearbyPlaces from "./hooks/useNearbyPlaces";

const center = { lat: 39.213, lng: -106.9378 };

interface Props {}
export default function NearbyPlaces({}: Props) {
  const [search, setSearch] = useState("");
  const mapEl = useRef<HTMLDivElement>(null);
  const { data, isLoading, error } = useNearbyPlaces(mapEl, center, search);
  return (
    <div className="flex flex-col items-center w-full">
      <label className="">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-neutral-700 ml-1 px-2 py-1 rounded-md"
          placeholder="Search"
        />
      </label>
      <div className="self-center my-2 w-full flex">
        {error && <pre>{JSON.stringify(error)}</pre>}
        {isLoading && search.length ? (
          <span className="text-xl self-center text-center w-full">
            loading...
          </span>
        ) : (
          <ul>
            {data?.map(({ name, formatted_address }) => (
              <li key={formatted_address}>
                <span className="inline-block">{name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div id="map" className="hidden" ref={mapEl} />
    </div>
  );
}
