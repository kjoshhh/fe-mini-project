"use client";

import { HeroBanner } from "../components/HeroBanner";
import { EventSection } from "../components/EventSection";
import { PromoBanner } from "../components/PromoBanner";
import { Footer } from "../components/Footer";
import { getAllEvents } from "@/lib/api";
import { useEffect, useState } from "react";
import { EventSearch } from "../components/EventSearch"
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

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

export default function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log("🔥 fetchEvents jalan!");
        console.log("👉 API_URL di browser:", process.env.NEXT_PUBLIC_API_URL);

        const data = await getAllEvents();

        console.log("👉 Data events:", data);

        const mapped = data.map((event:any) => {
          const sortedTickets = event.tickets?.sort((a: any, b:any) => a.price - b.price);
          const cheapest = sortedTickets?.[0];

          return {
            id: event.id,
            title: event.title,
            image: event.thumbnail,
            date: new Date(event.salesStart).toLocaleDateString("id-ID", {day: "numeric", month: "long", year: "numeric"}),
            time: new Date(event.salesStart).toLocaleTimeString("id-ID", {hour: "2-digit", minute: "2-digit"}),
            location: event.location,
            price: cheapest ? `Rp${cheapest.price.toLocaleString("id-ID")}` : "Gratis",
            category: event.category,
            isFeatured: event.isFeatured ?? false,
            rating: event.rating ?? undefined,
          };
        });

        setEvents(mapped);
      } catch (error) {
        console.error("Gagal ambil event:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* <Navigation /> */}
      <main>
        <HeroBanner />
        <Navbar/>

        <EventSearch
          onSearch={(filters) => {
            const query = new URLSearchParams({
              keyword: filters.keyword ?? "",
              category: filters.category ?? "",
              location: filters.location ?? "",
            }).toString();

            router.push(`/event-list?${query}`);
          }}
        />

        <EventSection 
          title="Event Unggulan"
          subtitle="Event terpopuler dan paling dinanti bulan ini"
          events={events}
        />
        <EventSection 
          title="Event Terpopuler"
          subtitle="Pilihan terbaik berdasarkan rating dan ulasan pengguna"
          events={events}
        />
        <EventSection 
          title="Event Mendatang"
          subtitle="Jangan sampai terlewat! Book tiket sekarang"
          events={events}
        />
      </main>
      
      <Footer />
    </div>
  );
};