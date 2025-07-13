"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Event = {
    id: number;
    title: string;
    thumbnail: string;
    date?: string;
    location?: string;
    tickets?: {
        quota: number;
        sold: number;
    }[];
};

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get("http://localhost:3030/public"); 
                setEvents(res.data.data || []);
            } catch (err) {
                console.error("Gagal fetch event", err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return (
            <div className="p-6 text-center text-gray-500 animate-pulse text-lg">
                ⏳ Memuat daftar event...
            </div>
        );
    }

    if (events.length === 0) {
        return (
            <div className="p-6 text-center text-gray-500 text-lg">
                🚫 Belum ada event tersedia.
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                🎉 Daftar Event Tersedia
            </h1>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {events.map((event) => {
                    const totalQuota = event.tickets?.reduce((sum, t) => sum + t.quota, 0) ?? 0;
                    const totalSold = event.tickets?.reduce((sum, t) => sum + t.sold, 0) ?? 0;
                    const availableSeat = totalQuota - totalSold;

                    return (
                        <div
                            key={event.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100 overflow-hidden"
                        >
                            <Image
                                src={event.thumbnail || "/placeholder.png"}
                                alt={event.title}
                                width={400}
                                height={250}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4 space-y-2">
                                <h2 className="text-lg font-semibold text-gray-800">{event.title}</h2>
                                {event.date && (
                                    <p className="text-sm text-gray-500">📅 {event.date}</p>
                                )}
                                {event.location && (
                                    <p className="text-sm text-gray-500">📍 {event.location}</p>
                                )}
                                {event.tickets && (
                                    <p className="text-sm text-green-600 font-medium">
                                        🎟️ Tersedia: {availableSeat} dari {totalQuota} tiket
                                    </p>
                                )}
                                <Link
                                    href={`/dashboard/customer/events/${event.id}`}
                                    className="inline-block mt-2 text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition"
                                >
                                    🔎 Lihat Detail
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
