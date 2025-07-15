"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

interface EventCard {
    id: number;
    title: string;
    thumbnail: string;
    createdAt: string;
    totalQuota: number;
    availableSeat: number;
}

interface DecodedToken {
    exp: number;
    [key: string]: any;
}

export default function MyEventsPage() {
    const { logout } = useAuth();
    const router = useRouter();

    const [events, setEvents] = useState<EventCard[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMyEvents = async () => {
            try {
                const token = Cookies.get("token");
                if (!token) {
                    setError("You must be logged in");
                    return;
                }

                // cek apakah token expired
                const decoded = jwtDecode<DecodedToken>(token);
                const now = Date.now() / 1000;
                if (decoded.exp < now) {
                    toast.error("Sesi kamu telah habis. Silakan login ulang.");
                    logout(); // atau router.push("/login")
                    return;
                }

                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event/my`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    const errText = await res.text();
                    throw new Error(errText);
                }

                const data = await res.json();
                setEvents(data.data);
            } catch (err) {
                console.error("Fetch error:", err);
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchMyEvents();
    }, []);

    if (loading) return <p className="text-center py-10">Loading...</p>;
    if (error) return <p className="text-center py-10 text-red-500">❌ {error}</p>;

    return (
        <div className="max-w-5xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-6">🎫 My Events</h1>
            {events.length === 0 ? (
                <p>You haven't created any events yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <div key={event.id} className="bg-white rounded shadow p-4">
                            <img
                                src={event.thumbnail}
                                alt={event.title}
                                className="w-full h-40 object-cover rounded mb-4"
                            />
                            <h2 className="text-xl font-semibold">{event.title}</h2>
                            <p className="text-sm text-gray-500">
                                Created: {new Date(event.createdAt).toLocaleDateString()}
                            </p>
                            <p className="text-sm">Quota: {event.totalQuota}</p>
                            <p className="text-sm">Available Seat: {event.availableSeat}</p>
                            <button
                                onClick={() => router.push(`/events/${event.id}`)}
                                className="mt-2 text-blue-600 hover:underline text-sm"
                            >
                                View Detail →
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
