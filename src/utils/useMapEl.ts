import { createContext, RefObject, createRef, useContext } from "react";

const MapElContext = createContext<RefObject<HTMLDivElement>>(createRef());
export default function useMapEl() {
  return useContext(MapElContext);
}
