import { LatLngExpression } from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface FlyToMarkerProps {
  position: LatLngExpression;
  zoomLevel: number;
  duration?: number;
}

const FlyToMarker = ({
  position,
  zoomLevel,
  duration = 1,
}: FlyToMarkerProps) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      const zoom = zoomLevel ?? map.getZoom();
      map.flyTo(position, zoom, {
        duration,
      });
    }
  }, [map, position, zoomLevel]);

  return null;
};

export default FlyToMarker;
