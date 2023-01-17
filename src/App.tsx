import Layout from "./components/Layout";
import Header from "./components/Header";
import NearbyPlaces from "./components/NearbyPlaces";

function App() {
  return (
    <Layout
      header={<Header text="Nearby Places Search" />}
      main={<NearbyPlaces />}
    />
  );
}

export default App;
