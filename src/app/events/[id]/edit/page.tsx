"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"; // Icon loading

interface Ticket {
    id: number;
    name: string;
    price: number;
    quota: number;
}

interface EventData {
    id: number;
    title: string;
    description: string;
    location: string;
    category: string;
    salesStart?: string;
    salesEnd?: string;
    tickets: Ticket[];
}

export default function EditEventPage() {
    const { id } = useParams();
    const router = useRouter();
    const [eventData, setEventData] = useState<EventData | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false); // ⬅️ Loading saat submit

    const [form, setForm] = useState({
        title: "",
        description: "",
        location: "",
        category: "",
        salesStart: "",
        salesEnd: "",
    });

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const token = Cookies.get("token");
                if (!token) throw new Error("Token tidak ditemukan");

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/event/events/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        cache: "no-store",
                    }
                );

                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(`Gagal mengambil data event: ${text}`);
                }

                const { data } = await res.json();
                setEventData(data);

                setForm({
                    title: data.title,
                    description: data.description,
                    location: data.location,
                    category: data.category,
                    salesStart: data.salesStart?.slice(0, 10) || "",
                    salesEnd: data.salesEnd?.slice(0, 10) || "",
                });
            } catch (err) {
                console.error("❌ Gagal ambil event:", err);
                toast.error("Gagal mengambil data event.");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchEvent();
    }, [id]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const token = Cookies.get("token");
            if (!token) throw new Error("Token tidak ditemukan");

            const payload = {
                ...form,
                salesStart: form.salesStart
                    ? new Date(form.salesStart).toISOString()
                    : null,
                salesEnd: form.salesEnd
                    ? new Date(form.salesEnd).toISOString()
                    : null,
            };

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/event/event/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!res.ok) {
                const text = await res.text();
                throw new Error(`Gagal update event: ${text}`);
            }

            toast.success("🎉 Event berhasil diperbarui!");
            router.push("/"); // ⬅️ Redirect ke home
        } catch (err) {
            console.error("❌ Gagal update event:", err);
            toast.error("Gagal memperbarui event.");
        } finally {
            setIsSubmitting(false); // ⬅️ Reset loading
        }
    };

    if (loading) return <p className="p-6">⏳ Memuat data event...</p>;
    if (!eventData)
        return <p className="p-6 text-red-500">❌ Event tidak ditemukan.</p>;

    return (
        <div className="max-w-2xl mx-auto py-10 px-4 pt-16">
            <h1 className="text-2xl font-bold mb-6">✏️ Edit Event</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Judul</label>
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Deskripsi</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        rows={4}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Lokasi</label>
                    <input
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Kategori</label>
                    <input
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <div className="flex gap-4">
                    <div className="w-1/2">
                        <label className="block mb-1 font-medium">Mulai Penjualan</label>
                        <input
                            type="date"
                            name="salesStart"
                            value={form.salesStart}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>

                    <div className="w-1/2">
                        <label className="block mb-1 font-medium">Akhir Penjualan</label>
                        <input
                            type="date"
                            name="salesEnd"
                            value={form.salesEnd}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
                >
                    {isSubmitting && <Loader2 className="animate-spin h-4 w-4" />}
                    {isSubmitting ? "Menyimpan..." : "💾 Simpan Perubahan"}
                </Button>
            </form>
        </div>
    );
}
