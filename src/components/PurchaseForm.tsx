"use client"

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import axios from "axios";

interface PurchaseFromProps {
    eventId: number;
    ticketId: number;
    basePrice: number;
    userPoints: number;
    coupons: {
        id: number;
        code: string;
        discount: number;
        expiresAt: string;
        isUsed: boolean;
    }[];
};


export default function PurchaseFrom({
    eventId,
    ticketId,
    basePrice,
    userPoints,
    coupons,
}: PurchaseFromProps) {
    const [quantity, setQuantity] = useState(1);
    const [voucherCode, setVoucherCode] = useState("");
    const [selectedCouponId, setSelectedCouponId] = useState<number | null>(null);
    const [pointsUsed, setPointsUsed] = useState(0);
    const [totalPrice, setTotalPrice] = useState(basePrice);
    const [loading, setLoading] = useState(false);

    const handleCalculatePrice = async () => {
        try {
            let price = basePrice * quantity;

            if (selectedCouponId) {
                const coupon = coupons.find(c => c.id === selectedCouponId);
                if (coupon && !coupon.isUsed && new Date(coupon.expiresAt) > new Date()) {
                    price -= coupon.discount;
                }
            }

            if (voucherCode) {
                const { data } = await axios.get(`/api/voucher/validate?code=${voucherCode}`);
                const voucher = data.data;

                if (voucher.eventId === eventId) {
                    if (voucher.discountAmount) price -= voucher.discountAmount;
                    if (voucher.discountPercent) {
                        const percentDiscount = price * (voucher.discountPercent / 100);

                        price -= voucher.maxDiscount
                            ? Math.min(percentDiscount, voucher.maxDiscount)
                            : percentDiscount;
                    }
                }
            }

            if (pointsUsed > 0) {
                price -= pointsUsed;
            }
            setTotalPrice(price < 0 ? 0 : price);
        } catch (error) {
            toast.error("Error calculating price. Check your voucher.");
        }
    }

    useEffect(() => {
        handleCalculatePrice();
    }, [quantity, voucherCode, selectedCouponId, pointsUsed]);

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const payload = {
                eventId,
                ticketId,
                ticketQuantity: quantity,
                voucherCode: voucherCode || undefined,
                usedCouponsId: selectedCouponId || undefined,
                userPoints: pointsUsed || undefined,
            };

            const { data } = await axios.post("/api/transaction/create", payload);

            toast.success("Transaction created!");
            console.log("transaction:", data);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to create transaction");
        } finally {
            setLoading(false);
        }

        return (
            <div className="space-y-4 border p-4 rounded-xl shadow-sm max-w-md w-full">
                <h2 className="text-xl font-semibold">Beli Tiket</h2>

                {/* input jumlah tiket */}
                <div>
                    <label>Jumlah Tiket</label>
                    <Input
                        type="number"
                        min={1}
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                </div>

                {/* input kode voucher */}
                <div>
                    <label>Voucher Code</label>
                    <Input
                        type="text"
                        value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value)}
                    />
                </div>

                {/* dropdown kupon */}
                <div>
                    <label>Pilih Kupon</label>
                    <select
                        className="w-full border rounded p-2"
                        value={selectedCouponId ?? ""}
                        onChange={(e) => {
                            const value = e.target.value;
                            setSelectedCouponId(value === "" ? null : Number(value));
                        }}
                    >
                        <option value="">Tidak Pakai</option>
                        {coupons
                            .filter((c) => !c.isUsed && new Date(c.expiresAt) > new Date())
                            .map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.code} - Diskon Rp{c.discount}
                                </option>
                            ))}
                    </select>
                </div>

                {/* input poin */}
                <div>
                    <label>Gunakan Poin (max {userPoints})</label>
                    <Input
                        type="number"
                        min={0}
                        max={userPoints}
                        value={pointsUsed}
                        onChange={(e) => setPointsUsed(Number(e.target.value))}
                    />
                </div>

                {/* tampilkan total harga */}
                <div className="text-right font-bold text-lg">
                    Total Harga: Rp{totalPrice.toLocaleString()}
                </div>

                {/* tombol beli */}
                <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-primary text-white"
                >
                    {loading ? "Memproses..." : "Beli Tiket"}
                </Button>
            </div>
        );
    }
}