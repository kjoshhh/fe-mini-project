"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Attendee {
    userId: number;
    username: string;
    email: string;
    ticketQuantity: number;
    totalPrice: number;
    status: string;
}

export default function AttendeesPage() {
    const { id } = useParams();
    const [attendees, setAttendees] = useState<Attendee[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAttendees = async () => {
            try {
                const res = await axios.get(`http://localhost:3030/events/${id}/attendees`, {
                    withCredentials: true,
                });
                setAttendees(res.data.data || []);
            } catch (error) {
                console.error("Gagal mengambil data peserta:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchAttendees();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="p-6 text-center text-gray-500 animate-pulse text-lg">
                ⏳ Memuat daftar peserta...
            </div>
        );
    }

    if (attendees.length === 0) {
        return (
            <div className="p-6 text-center text-gray-500 text-lg">
                🚫 Belum ada peserta yang membeli tiket untuk event ini.
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">👥 Daftar Peserta Event</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                    <thead className="bg-gray-100 text-sm text-left text-gray-600">
                        <tr>
                            <th className="px-4 py-2 border">No</th>
                            <th className="px-4 py-2 border">Nama</th>
                            <th className="px-4 py-2 border">Email</th>
                            <th className="px-4 py-2 border">Jumlah Tiket</th>
                            <th className="px-4 py-2 border">Total Bayar</th>
                            <th className="px-4 py-2 border">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendees.map((attendee, index) => (
                            <tr key={attendee.userId} className="text-sm text-gray-700">
                                <td className="px-4 py-2 border text-center">{index + 1}</td>
                                <td className="px-4 py-2 border">{attendee.username}</td>
                                <td className="px-4 py-2 border">{attendee.email}</td>
                                <td className="px-4 py-2 border text-center">{attendee.ticketQuantity}</td>
                                <td className="px-4 py-2 border text-center">Rp {Number(attendee.totalPrice).toLocaleString()}</td>
                                <td className="px-4 py-2 border text-center">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${attendee.status === "DONE"
                                            ? "bg-green-100 text-green-600"
                                            : attendee.status === "PENDING"
                                                ? "bg-yellow-100 text-yellow-600"
                                                : "bg-gray-100 text-gray-500"
                                            }`}
                                    >
                                        {attendee.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
