"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EventDetailPage() {
    const { id } = useParams();
    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEvent() {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();
                setEvent(data.data);
            } catch (err) {
                console.error("Failed to fetch event", err);
            } finally {
                setLoading(false);
            }
        }

        if (id) fetchEvent();
    }, [id]);

    if (loading) return <p className="p-4">Loading...</p>;
    if (!event) return <p className="p-4 text-red-600">Event not found</p>;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
            <img src={event.thumbnail} alt={event.title} className="w-full max-h-96 object-cover rounded mb-4" />
            <p className="text-gray-700 mb-4">{event.description}</p>
            <p><strong>Category:</strong> {event.category}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Sales Start:</strong> {new Date(event.salesStart).toLocaleString()}</p>
            <p><strong>Sales End:</strong> {new Date(event.salesEnd).toLocaleString()}</p>
        </div>
    );
}
