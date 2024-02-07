import { SetStateAction, useState } from "react";
import { HistoricalEvent } from "../types/event";
import events from "../utils/const";

type EventId = number | string;

export default function useMapClient() {
  const [favourites, setFavourites] = useState<(number | string)[]>(() => {
    const savedFavorites = localStorage.getItem("favourites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [activeEvent, setActiveEvent] = useState<HistoricalEvent | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  function handleFavourite(id: EventId) {
    //remove favourites if they are in favourites array
    let updatedFavourites = favourites.filter((favID) => favID !== id);

    // add favourites if not found in the array
    if (!favourites.includes(id)) {
      updatedFavourites = [id, ...favourites];
    }

    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  }

  function handleListItem(id: EventId) {
    const event = events.find((item) => item.id === id);

    if (event) {
      setActiveEvent(event);
    }
  }

  return {
    favourites,
    handleFavourite,
    activeEvent,
    setActiveEvent,
    selectedCategory,
    setSelectedCategory,
    handleListItem,
  };
}
