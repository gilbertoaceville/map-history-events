"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

import events, { DEFAULT_POSITION, DEFAULT_ZOOM } from "../utils/const";
import useMapClient from "../hooks/useMapClient";
import FavouriteEvents from "./favouriteEvents";
import FlyToMarker from "./flyToMarker";
import FilterCategories from "./FilterCategories";

const icon: Icon = new Icon({
  iconUrl: "marker.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
export default function Map() {
  const {
    favourites,
    handleFavourite,
    activeEvent,
    setActiveEvent,
    selectedCategory,
    setSelectedCategory,
    handleListItem,
  } = useMapClient();
  const isFavourite = favourites.includes(activeEvent?.id as number);

  return (
    <div className="content-wrapper">
      <div className="content flex flex-col gap-6 w-full h-full">
        <FilterCategories setSelectedCategory={setSelectedCategory} />
        <MapContainer
          center={DEFAULT_POSITION}
          zoom={DEFAULT_ZOOM}
          scrollWheelZoom={false}
          className="map-container"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {(events || [])
            .filter((event) => !selectedCategory || event.category === selectedCategory)
            .map((event, index) => {
              return (
                <Marker
                  key={`${event?.id}-${index}`}
                  position={event?.position}
                  icon={icon}
                  eventHandlers={{ click: () => setActiveEvent(event) }}
                />
              );
            })}
          {activeEvent && (
            <Popup position={activeEvent.position}>
              <div className="popup-inner">
                <h2 className="popup-inner__title">{activeEvent?.title}</h2>
              </div>
              <p className="popup-inner__description">
                {activeEvent?.description}
              </p>
              <button
                className="popup-inner__button"
                onClick={() => handleFavourite(activeEvent?.id)}
              >
                {isFavourite ? (
                  <span>
                    <i
                      className="fa-solid fa-star"
                      style={{
                        color: "#fdc401",
                      }}
                    />
                    Favourite
                  </span>
                ) : (
                  <span>
                    <i className="fa-regular fa-star" />
                    Unfavourite
                  </span>
                )}
                <small className="popup-inner__button--small">
                  {isFavourite ? "remove" : "add"}
                </small>
              </button>
            </Popup>
          )}

          {activeEvent && (
            <FlyToMarker position={activeEvent.position} zoomLevel={15} duration={2} />
          )}
        </MapContainer>
      </div>

      <FavouriteEvents {...{ favourites, events, handleListItem }} />
    </div>
  );
}
