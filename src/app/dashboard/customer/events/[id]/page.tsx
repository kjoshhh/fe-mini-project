"use client";

import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";

type EventDetail = {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    location: string;
    salesStart: string;
    tickets: {
        name: string;
        price: number;
        quota: number;
        sold: number;
    }[];
};

export default function EventDetailPage() {
    const { id } = useParams();
    const [event, setEvent] = useState<EventDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await axios.get(`http://localhost:3030/public/${id}`);
                setEvent(res.data.data); // ✅ gunakan public endpoint
            } catch (err) {
                console.error("Gagal fetch event", err);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) fetchEvent();
    }, [id]);

    if (isLoading) return <p className="p-6 text-center text-gray-500">⏳ Memuat detail event...</p>;
    if (!event) return <p className="p-6 text-center text-red-500">🚫 Event tidak ditemukan.</p>;

    const ticket = event.tickets[0]; // asumsi 1 jenis tiket utama
    const available = ticket?.quota - ticket?.sold;

    return (
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">{event.title}</h1>
            <Image
                src={event.thumbnail}
                alt="Event Banner"
                width={800}
                height={400}
                className="rounded-lg shadow"
            />
            <div className="space-y-2">
                <p className="text-gray-700 text-lg">{event.description}</p>
                <p className="text-sm text-gray-600">📍 Lokasi: {event.location}</p>
                <p className="text-sm text-gray-600">
                    🗓️ Tanggal: {new Date(event.salesStart).toLocaleDateString("id-ID")}
                </p>
                <p className="text-sm text-gray-600">
                    🎟️ Kuota Tersisa: {available} dari {ticket?.quota}
                </p>
                <p className="text-lg font-semibold text-green-600">
                    💵 Harga: Rp {ticket?.price.toLocaleString("id-ID")}
                </p>
            </div>
        </div>
    );
}
