import { Suspense } from "react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { MdStar } from "react-icons/md";
import ErrorFallback from "./ErrorFallback";
import { IPlace } from "../utils/types";
import PlaceDetails from "./PlaceDetails";

interface Props {
  place: IPlace;
  label?: string;
}
export default function PlaceCard({ place }: Props) {
  return (
    <section
      className={`
    m-auto grid grid-rows-[max-content_max-content_min-content] gap-2 items-start
    border-2 rounded-md p-6 w-full min-w-min max-w-lg
    bg-white border border-gray-200 rounded-lg drop-shadow-md dark:bg-zinc-800 dark:border-zinc-700`}
    >
      <div className="row-start-1">
        <h2 className="text-lg font-semibold">{place.name}</h2>
      </div>
      <div className="row-start-1 flex items-center justify-self-end">
        <span>{place.rating}</span>
        <MdStar aria-label="Average Rating" />
      </div>
      <div className="row-start-2 col-span-2 flex flex-col">
        <span className="font-semibold">Address</span>
        <span>{place.vicinity}</span>
      </div>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={(_p) => (
              <div className="row-start-3">
                <ErrorFallback {..._p} label="Error fetching details" />
              </div>
            )}
          >
            <Suspense>
              <PlaceDetails placeId={place.place_id as string} />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </section>
  );
}
