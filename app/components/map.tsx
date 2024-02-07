"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import eventsData from "../utils/const";

export default function Map() {
  const icon: Icon = new Icon({
    iconUrl: "marker.svg",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <div className="content-wrapper">
      <div className="flex flex-col w-full h-full">
        <div className="h-12"></div>
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
          className="map-container"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {(eventsData || []).map((event, index) => (
            <Marker
              key={`${event?.id}-${index}`}
              position={event?.position}
              icon={icon}
            >
              <Popup>
                <div className="popup-inner">
                  <h2 className="popup-inner__title">{event?.title}</h2>
                </div>
                <p className="popup-inner__description">{event?.description}</p>
                <button className="popup-inner__button">
                  Favourite
                  {/* {favourites.includes(activeEvent.id) ? (
                    <span>{fullStar} Unfavourite</span>
                  ) : (
                    <span>{emptyStar} Favourite</span>
                  )} */}
                </button>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
