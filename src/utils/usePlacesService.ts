import { createContext, useContext } from "react";

const PlacesServiceContext =
  createContext<google.maps.places.PlacesService | null>(null);

export const PlacesServiceProvider = PlacesServiceContext.Provider;
export default function usePlacesService() {
  return useContext(PlacesServiceContext) as google.maps.places.PlacesService;
}
