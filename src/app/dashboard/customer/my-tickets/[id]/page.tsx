"use client";

import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";

type TransactionDetail = {
    id: number;
    status: string;
    remainingTime: number;
    ticketQuantity: number;
    totalPrice: number;
    event: {
        id: number;
        title: string;
        thumbnail: string;
    };
    paymentProofUrl?: string;
    voucherCode?: string | null;
    couponCode?: string | null;
    pointUsed?: number;
    discountFromVoucher?: number;
    discountFromCoupon?: number;
};

export default function TicketDetailPage() {
    const { id } = useParams();
    const [ticket, setTicket] = useState<TransactionDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [file, setFile] = useState<File | null>(null);
    const [countdown, setCountdown] = useState<string>("");

    // Ambil detail transaksi
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:3030/transactions/${id}`, {
                    headers: {
                        Authorization: `Bearer ${document.cookie
                            .split("; ")
                            .find((c) => c.startsWith("token="))
                            ?.split("=")[1]}`,
                    },
                });
                setTicket(res.data.data);
            } catch (err) {
                console.error("Gagal fetch detail tiket", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // Realtime countdown
    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (ticket?.status === "WAITING_PAYMENT" && ticket.remainingTime > 0) {
            timer = setInterval(() => {
                setTicket((prev) => {
                    if (!prev) return prev;
                    const timeLeft = prev.remainingTime - 1000;
                    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                    setCountdown(`${minutes}m ${seconds}s`);

                    if (timeLeft <= 0) clearInterval(timer);

                    return { ...prev, remainingTime: timeLeft };
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [ticket]);

    // Upload bukti pembayaran
    const handleUpload = async () => {
        if (!file || !ticket) return;

        try {
            await axios.patch(
                `http://localhost:3030/transactions/${ticket.id}/upload-payment-proof`,
                {
                    paymentProofUrl: URL.createObjectURL(file),
                },
                {
                    headers: {
                        Authorization: `Bearer ${document.cookie
                            .split("; ")
                            .find((c) => c.startsWith("token="))
                            ?.split("=")[1]}`,
                    },
                }
            );

            alert("Berhasil upload bukti!");
            setTicket({ ...ticket, paymentProofUrl: URL.createObjectURL(file) });
        } catch (err) {
            alert("Gagal upload bukti.");
        }
    };

    // Batalkan transaksi
    const handleCancel = async () => {
        if (!ticket) return;
        const confirmCancel = window.confirm("Yakin ingin membatalkan transaksi ini?");
        if (!confirmCancel) return;

        try {
            await axios.patch(
                `http://localhost:3030/transactions/${ticket.id}/cancel`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${document.cookie
                            .split("; ")
                            .find((c) => c.startsWith("token="))
                            ?.split("=")[1]}`,
                    },
                }
            );
            alert("Transaksi berhasil dibatalkan!");
            setTicket({ ...ticket, status: "CANCELED" });
        } catch (err) {
            alert("Gagal membatalkan transaksi.");
        }
    };

    if (isLoading) return <p>Memuat detail tiket...</p>;
    if (!ticket) return <p>Data tiket tidak ditemukan.</p>;

    const isExpired = ticket.status === "EXPIRED" || (ticket.remainingTime ?? 0) <= 0;

    const totalSetelahDiskon =
        ticket.totalPrice -
        (ticket.discountFromVoucher || 0) -
        (ticket.discountFromCoupon || 0) -
        (ticket.pointUsed || 0);

    return (
        <div className="max-w-3xl mx-auto py-6 px-4 space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Detail Tiket</h1>

            <div className="border rounded-lg p-4 shadow space-y-3 bg-white">
                <h2 className="text-xl font-semibold">{ticket.event.title}</h2>
                <Image
                    src={ticket.event.thumbnail}
                    alt="event"
                    width={400}
                    height={200}
                    className="rounded-lg"
                />
                <p>Jumlah tiket: {ticket.ticketQuantity}</p>
                <p>Total bayar: Rp {ticket.totalPrice.toLocaleString("id-ID")}</p>

                {/* Informasi diskon */}
                {(ticket.voucherCode || ticket.couponCode || ticket.pointUsed) && (
                    <div className="space-y-1 text-sm text-gray-700">
                        {ticket.voucherCode && (
                            <p>
                                🎁 Voucher: <span className="font-medium">{ticket.voucherCode}</span>{" "}
                                (-Rp {ticket.discountFromVoucher?.toLocaleString("id-ID")})
                            </p>
                        )}
                        {ticket.couponCode && (
                            <p>
                                🎫 Kupon: <span className="font-medium">{ticket.couponCode}</span>{" "}
                                (-Rp {ticket.discountFromCoupon?.toLocaleString("id-ID")})
                            </p>
                        )}
                        {ticket.pointUsed && ticket.pointUsed > 0 && (
                            <p>
                                ⭐ Poin digunakan: {ticket.pointUsed} (-Rp{" "}
                                {ticket.pointUsed.toLocaleString("id-ID")})
                            </p>
                        )}
                        <p className="text-sm font-semibold text-green-700">
                            💰 Total setelah diskon: Rp {totalSetelahDiskon.toLocaleString("id-ID")}
                        </p>
                    </div>
                )}

                <p
                    className={`font-semibold ${ticket.status === "WAITING_PAYMENT"
                            ? "text-yellow-600"
                            : ticket.status === "DONE"
                                ? "text-green-600"
                                : ticket.status === "REJECTED"
                                    ? "text-red-500"
                                    : "text-gray-500"
                        }`}
                >
                    Status: {ticket.status}
                </p>

                {/* Countdown */}
                {ticket.status === "WAITING_PAYMENT" && !isExpired && (
                    <p className="text-sm text-yellow-600">⏳ Sisa waktu bayar: {countdown}</p>
                )}

                {/* Upload bukti pembayaran */}
                {ticket.status === "WAITING_PAYMENT" && !ticket.paymentProofUrl && !isExpired && (
                    <div className="mt-2">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                        />
                        <button
                            onClick={handleUpload}
                            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Upload Bukti Pembayaran
                        </button>
                    </div>
                )}

                {/* Bukti pembayaran */}
                {ticket.paymentProofUrl && (
                    <div>
                        <p className="text-sm text-gray-700">📸 Bukti Pembayaran:</p>
                        <Image
                            src={ticket.paymentProofUrl}
                            alt="bukti"
                            width={250}
                            height={150}
                            className="rounded-md border"
                        />
                    </div>
                )}

                {/* Tombol Batalkan */}
                {ticket.status === "WAITING_CONFIRMATION" && (
                    <button
                        onClick={handleCancel}
                        className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        ❌ Batalkan Transaksi
                    </button>
                )}
            </div>
        </div>
    );
}
