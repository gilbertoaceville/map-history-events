import React from "react";
import { HistoricalEvent } from "../types/event";

interface FavouriteEventProps {
  favourites: (number | string)[];
  events: HistoricalEvent[];
  handleListItem: (id: number) => void;
}

export default function FavouriteEvents({
  favourites,
  events,
  handleListItem
}: FavouriteEventProps) {
  return (
    <div className="liked-events">
      <h2 className="liked-events__title">
        <i className="fa-solid fa-star"></i> Favourite Events
      </h2>
      <ul>
        {favourites
          .map((id) => {
            return events.find((event) => event.id === id);
          })
          .map((event) => {
            return (
              <li
                key={event?.id}
                className="liked-events__event"
                onClick={() => {
                  handleListItem(event?.id as number);
                }}
              >
                <h3>{event?.title}</h3>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
