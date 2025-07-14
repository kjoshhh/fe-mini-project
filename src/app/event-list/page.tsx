"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { EventGrid } from "@/components/EventGrid";
import { getAllEvents } from "@/lib/api";
import Navbar from "@/components/Navbar";

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

export default function EventListPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [keyword, setKeyword] = useState("");

  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchAndFilterEvents = async () => {
      try {
        const data = await getAllEvents();

        const mapped = data.map((event: any) => {
          const sortedTickets = event.tickets?.sort(
            (a: any, b: any) => a.price - b.price
          );
          const cheapest = sortedTickets?.[0];

          return {
            id: event.id,
            title: event.title,
            image: event.thumbnail,
            date: new Date(event.salesStart).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
            time: new Date(event.salesStart).toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            location: event.location,
            price: cheapest
              ? `Rp${cheapest.price.toLocaleString("id-ID")}`
              : "Gratis",
            category: event.category,
          };
        });

        setEvents(mapped);

        // 🔍 Baca query
        const keywordQuery = searchParams.get("keyword") || "";
        const categoryQuery = searchParams.get("category") || "";
        const locationQuery = searchParams.get("location") || "";

        setKeyword(keywordQuery);

        const filtered = mapped.filter((event: Event) => {
          const matchKeyword = keywordQuery
            ? event.title.toLowerCase().includes(keywordQuery.toLowerCase())
            : true;

          const matchCategory = categoryQuery
            ? event.category === categoryQuery
            : true;

          const matchLocation = locationQuery
            ? event.location === locationQuery
            : true;

          return matchKeyword && matchCategory && matchLocation;
        });

        setFilteredEvents(filtered);
      } catch (error) {
        console.error("Gagal ambil event:", error);
      }
    };

    fetchAndFilterEvents();
  }, [searchParams]); // <== supaya re-run kalau URL berubah

  return (
    <div className="min-h-screen bg-gray-50">
    <Navbar variant="solid-light" />
      <div className="flex">
        <Sidebar/>
        <EventGrid events={filteredEvents} keyword={keyword} />
      </div>
    </div>
  );
}
