import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./Layout";
import Header from "./Header";
import NearbyPlaces from "./NearbyPlaces";

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
