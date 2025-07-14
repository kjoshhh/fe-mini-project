import React from "react";
import { EventCard } from "./EventCard";

interface Event {
  id: string;
  title: string;
  image: string;
  date: string;
  time: string;
  location: string;
  price: string;
  category: string;
}

interface EventGridProps {
  events: Event[];
  keyword: string;
}

export function EventGrid({ events, keyword }: EventGridProps) {
  return (
    <div className="flex-1 p-6">
      <h2 className="text-xl font-semibold mb-4">
        {keyword ? `Hasil pencarian untuk "${keyword}"` : "Semua Event"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </div>
  );
}
