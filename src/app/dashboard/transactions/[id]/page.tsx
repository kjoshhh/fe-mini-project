"use client"; 

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";
import Countdown from "react-countdown";
import { toast } from "sonner";

const TransactionDetailPage = ({ params }: { params: { id: string } }) => {
    const { token } = useAuth(); 
    const router = useRouter();
    const [loading, setLoading] = useState(true); 
    const [transaction, setTransaction] = useState<any>(null); 

    // Fetch data transaksi berdasarkan ID
    const fetchTransactionDetail = async () => {
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/transaction/${params.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                }
            );

            setTransaction(res.data.data); // Simpan data transaksi
        } catch (error: any) {
            console.error(error);
            toast.error("Failed to load transaction");
            router.push("/dashboard/transactions");
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        if (token) {
            fetchTransactionDetail();
        }
    }, [token]);

    // Komponen untuk countdown
    const renderer = ({ minutes, seconds, completed }: any) => {
        if (completed) {
            return <span className="text-red-500">Expired</span>;
        } else {
            return (
                <span>
                    {minutes}m {seconds}s remaining
                </span>
            );
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-40">
                <Loader2 className="animate-spin w-6 h-6" />
            </div>
        );
    }

    if (!transaction) {
        return <div className="text-center text-gray-500">Transaction not found.</div>;
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Transaction Detail</h1>

            <div className="border rounded-xl p-4 shadow-md bg-white space-y-2">
                <p><strong>Event:</strong> {transaction.event.title}</p>
                <p><strong>Status:</strong> {transaction.status}</p>
                <p><strong>Total Price:</strong> Rp {transaction.totalPrice.toLocaleString()}</p>
                <p><strong>Ticket Quantity:</strong> {transaction.ticketQuantity}</p>

                {/* Jika statusnya masih menunggu pembayaran dan masih ada waktu */}
                {transaction.status === "WAITING_PAYMENT" && transaction.remainingTime > 0 && (
                    <p className="text-orange-500">
                        <strong>Payment Countdown: </strong>
                        <Countdown
                            date={Date.now() + transaction.remainingTime}
                            renderer={renderer}
                        />
                    </p>
                )}

                {/* Tampilkan jika bukti pembayaran sudah diunggah */}
                {transaction.paymentProofUrl && (
                    <div className="mt-4">
                        <strong>Payment Proof:</strong>
                        <img
                            src={transaction.paymentProofUrl}
                            alt="Payment Proof"
                            className="mt-2 max-w-xs rounded"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransactionDetailPage;
