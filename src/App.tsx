import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/Layout";
import Header from "./components/Header";
import NearbyPlaces from "./components/NearbyPlaces";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout
        header={<Header text="Nearby Places Search" />}
        main={<NearbyPlaces />}
      />
    </QueryClientProvider>
  );
}

export default App;
