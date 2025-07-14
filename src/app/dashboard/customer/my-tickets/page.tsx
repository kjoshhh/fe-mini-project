"use client";

import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";

type Ticket = {
    id: number;
    eventName: string;
    quantity: number;
    totalPrice: number;
    status: "PENDING" | "ACCEPTED" | "REJECTED" | "EXPIRED";
    expiredAt: string; // tambahkan dari backend
    paymentProof?: string;
};

export default function MyTicketPage() {
    const [isTickets, setIsTickets] = useState<Ticket[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const res = await axios.get("http://localhost:3030/transactions/my-tickets", {
                    headers: {
                        Authorization: `Bearer ${document.cookie
                            .split("; ")
                            .find((c) => c.startsWith("token="))
                            ?.split("=")[1]}`,
                    },
                });
                setIsTickets(res.data);
            } catch (err) {
                console.error("Gagal mengambil tiket", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTickets();
    }, []);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, ticketId: number) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("paymentProof", file);

        try {
            await axios.patch(`http://localhost:3030/transactions/upload-proof/${ticketId}`, formData, {
                headers: {
                    Authorization: `Bearer ${document.cookie
                        .split("; ")
                        .find((c) => c.startsWith("token="))
                        ?.split("=")[1]}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Bukti pembayaran berhasil diupload!");
            // Refresh tickets
            const updated = isTickets.map((t) =>
                t.id === ticketId ? { ...t, paymentProof: URL.createObjectURL(file) } : t
            );
            setIsTickets(updated);
        } catch (err) {
            alert("Gagal upload bukti pembayaran.");
        }
    };

    const calculateCountdown = (expiredAt: string) => {
        const now = new Date().getTime();
        const expireTime = new Date(expiredAt).getTime();
        const distance = expireTime - now;

        if (distance <= 0) return "Expired";

        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        return `${minutes}m ${seconds}s`;
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">🎟️ Tiket Saya</h1>

            {isLoading ? (
                <p>Memuat data tiket...</p>
            ) : isTickets.length === 0 ? (
                <p className="text-gray-500">Belum ada tiket yang dibeli.</p>
            ) : (
                <ul className="space-y-4">
                    {isTickets.map((ticket) => {
                        const isExpired =
                            new Date(ticket.expiredAt).getTime() < new Date().getTime();

                        return (
                            <li
                                key={ticket.id}
                                className="border p-4 rounded-lg shadow-sm bg-white space-y-2"
                            >
                                <h2 className="text-lg font-semibold text-gray-800">
                                    {ticket.eventName}
                                </h2>
                                <p>Jumlah tiket: {ticket.quantity}</p>
                                <p>Total bayar: Rp{" "}
                                    {ticket.totalPrice.toLocaleString("id-ID")}</p>

                                {ticket.status === "PENDING" && !isExpired && (
                                    <p className="text-sm text-yellow-600">
                                        ⏳ Sisa waktu bayar: {calculateCountdown(ticket.expiredAt)}
                                    </p>
                                )}

                                {ticket.status === "PENDING" && isExpired && (
                                    <p className="text-sm text-red-600">❌ Status: EXPIRED</p>
                                )}

                                <p className={`text-sm font-semibold ${ticket.status === "PENDING" ? "text-yellow-500"
                                    : ticket.status === "ACCEPTED" ? "text-green-600"
                                        : ticket.status === "REJECTED" ? "text-red-500"
                                            : "text-gray-400"
                                    }`}>
                                    Status: {isExpired ? "EXPIRED" : ticket.status}
                                </p>

                                {/* Bukti Transfer */}
                                {ticket.status === "PENDING" && !ticket.paymentProof && !isExpired && (
                                    <div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleUpload(e, ticket.id)}
                                        />
                                    </div>
                                )}

                                {ticket.paymentProof && (
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-700">📸 Bukti Transfer:</p>
                                        <Image
                                            src={ticket.paymentProof}
                                            alt="bukti"
                                            width={200}
                                            height={120}
                                            className="rounded-md border"
                                        />
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
