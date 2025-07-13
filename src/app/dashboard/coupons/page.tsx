"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { BadgePercent } from "lucide-react";

type Coupon = {
    id: number;
    code: string;
    discount: number;
    expiresAt: string;
};

export default function MyCouponsPage() {
    const { token } = useAuth();
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const res = await axios.get("http://localhost:3030/vouchers/my-coupon", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCoupons(res.data.data);
            } catch (err: any) {
                toast.error(err?.response?.data?.message || "Gagal mengambil kupon");
            } finally {
                setLoading(false);
            }
        };

        fetchCoupons();
    }, [token]);

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">🎟️ My Vouchers</h1>

            {loading ? (
                <p>Memuat data kupon...</p>
            ) : coupons.length === 0 ? (
                <p className="text-gray-500">Belum ada Vouchers yang tersedia.</p>
            ) : (
                <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {coupons.map((coupon) => (
                        <li
                            key={coupon.id}
                            className="border-l-4 border-green-500 bg-white p-4 rounded-lg shadow-sm"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <BadgePercent className="text-green-600" />
                                <span className="font-semibold text-gray-800 text-lg">
                                    {coupon.code}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600">
                                Diskon: Rp {coupon.discount.toLocaleString("id-ID")}
                            </p>
                            <p className="text-sm text-gray-600">
                                Berlaku sampai:{" "}
                                {new Date(coupon.expiresAt).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
