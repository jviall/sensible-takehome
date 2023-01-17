import { Suspense, useState } from "react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback";
import Select from "./components/Select";
import { locations } from "./utils/constants";
import { ILocation } from "./utils/types";
import Search from "./components/Search";
import Places from "./components/Places";
import Loading from "./components/Loading";
import Layout from "./components/Layout";
import Header from "./components/Header";

function App() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState<ILocation>(locations[0]);
  const handleLocationChange: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    setLocation(JSON.parse(e.target.value) as ILocation);
  };

  return (
    <>
      <Layout
        header={<Header text="Nearby Places Search" />}
        main={
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
            <QueryErrorResetBoundary>
              {({ reset }) => (
                <ErrorBoundary fallbackRender={ErrorFallback} onReset={reset}>
                  <Suspense fallback={<Loading />}>
                    <Places keyword={search} location={location.center} />
                  </Suspense>
                </ErrorBoundary>
              )}
            </QueryErrorResetBoundary>
          </div>
        }
      />
    </>
  );
}

export default App;
