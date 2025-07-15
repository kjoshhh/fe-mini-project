"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

interface Stat {
    date: string;
    count: number;
    totalAmount: number;
}

export default function EventStatisticsPage() {
    const { id } = useParams();
    const [stats, setStats] = useState<Stat[]>([]);
    const [loading, setLoading] = useState(true);
    const [interval, setInterval] = useState<"day" | "month" | "year">("day");

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3030/events/${id}/statistics?interval=${interval}`,
                    { withCredentials: true }
                );
                setStats(res.data.data || []);
            } catch (err) {
                console.error("Gagal mengambil statistik:", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchStats();
    }, [id, interval]);

    if (loading) return <div className="p-6">📊 Memuat statistik...</div>;

    return (
        <div className="p-6 space-y-8">
            <h1 className="text-2xl font-bold text-gray-800">📈 Statistik Event</h1>

            {/* Grafik Line dengan Dropdown Interval */}
            <div className="bg-white p-4 rounded-lg shadow border">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-700">Grafik Jumlah Tiket Terjual</h2>
                    <select
                        value={interval}
                        onChange={(e) => setInterval(e.target.value as "day" | "month" | "year")}
                        className="border rounded px-2 py-1 text-sm text-gray-700"
                    >
                        <option value="day">Harian</option>
                        <option value="month">Bulanan</option>
                        <option value="year">Tahunan</option>
                    </select>
                </div>

                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={stats}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Tabel Detail Statistik */}
            <div className="overflow-x-auto">
                <table className="min-w-full border text-sm">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="border px-4 py-2">Tanggal</th>
                            <th className="border px-4 py-2">Jumlah Tiket</th>
                            <th className="border px-4 py-2">Total Omzet</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.map((stat, i) => (
                            <tr key={i} className="text-gray-700">
                                <td className="border px-4 py-2">{stat.date}</td>
                                <td className="border px-4 py-2 text-center">{stat.count}</td>
                                <td className="border px-4 py-2 text-right">
                                    Rp {Number(stat.totalAmount).toLocaleString("id-ID")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
