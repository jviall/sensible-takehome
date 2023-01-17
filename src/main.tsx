import React from "react";
import ReactDOM from "react-dom/client";
import { Loader } from "@googlemaps/js-api-loader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import App from "./App";
import ErrorFallback from "./components/ErrorFallback";
import "./index.css";
import { PlacesServiceProvider } from "./utils/usePlacesService";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const googleLoader = new Loader({
  apiKey: "AIzaSyDIb6tuC5IBX5yf8pYBMs_hLkZicqDHZ9k",
  version: "weekly",
  libraries: ["places"],
});
const placesService = await googleLoader
  .load()
  .then(
    (google) =>
      new google.maps.places.PlacesService(
        document.getElementById("map") as HTMLDivElement
      )
  );

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary fallbackRender={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <PlacesServiceProvider value={placesService}>
          <App />
        </PlacesServiceProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
