import { IPlace } from "../utils/types";

interface Props {
  place: IPlace;
}
export default function PlaceCard({ place }: Props) {
  return (
    <div className="m-auto grid grid-rows-3 border-2 rounded-md p-2 w-full min-w-min max-w-lg">
      <h1 className="text-lg font-semibold">{place.name}</h1>
      <span className="row-start-1">{place.rating}</span>
      <span>{place.vicinity}</span>
      {/* <pre>
        {"available keys:\n"}
        {Object.entries(place)
          .reduce<string[]>(
            (acc, [k, v]) => acc.concat(v ? [`${k}: ${String(v)}`] : []),
            []
          )
          .join("\n")}
      </pre> */}
    </div>
  );
}
