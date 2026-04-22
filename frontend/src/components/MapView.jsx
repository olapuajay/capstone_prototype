import {
  GoogleMap,
  MarkerF,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import Loader from "./Loader";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const centerPunjab = { lat: 31.1471, lng: 75.3412 };

const mapOptions = {
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: true,
  zoomControl: true,
};

const buildBusIcon = () => ({
  path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
  scale: 5,
  fillColor: "#3ddc97",
  fillOpacity: 1,
  strokeColor: "#0f172a",
  strokeWeight: 2,
});

const buildFilteredBuses = (buses, selectedBusId) => {
  if (selectedBusId === "ALL") {
    return buses;
  }

  return buses.filter((bus) => String(bus.id) === String(selectedBusId));
};

const MapView = ({ buses, selectedBusId }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
  });

  if (!apiKey) {
    return <Loader label="Set VITE_GOOGLE_MAPS_API_KEY to load Google Maps" />;
  }

  if (!isLoaded) {
    return <Loader label="Loading map..." />;
  }

  const filteredBuses = buildFilteredBuses(buses, selectedBusId);

  return (
    <div className="glass-panel card-enter h-[430px] overflow-hidden sm:h-[540px]">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={centerPunjab}
        zoom={8}
        options={mapOptions}
      >
        {filteredBuses.map((bus) => (
          <MarkerF
            key={bus.id}
            position={{
              lat: bus.currentLocation.lat,
              lng: bus.currentLocation.lng,
            }}
            icon={buildBusIcon()}
            title={`${bus.name} (${bus.status})`}
          />
        ))}

        {filteredBuses.length === 1 &&
          filteredBuses[0].route?.points?.length > 1 && (
            <Polyline
              path={filteredBuses[0].route.points.map((point) => ({
                lat: point.lat,
                lng: point.lng,
              }))}
              options={{
                strokeColor: "#ff7b54",
                strokeOpacity: 0.9,
                strokeWeight: 5,
              }}
            />
          )}
      </GoogleMap>
    </div>
  );
};

export default MapView;
