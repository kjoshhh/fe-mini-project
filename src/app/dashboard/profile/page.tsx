"use client";

import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import {
    Eye,
    EyeOff,
    UploadCloud,
    Copy,
    CheckCircle,
} from "lucide-react";

export default function ProfilePage() {
    const { user, refreshUser } = useAuth();

    const [showForm, setShowForm] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [previewImg, setPreviewImg] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const formatNumber = new Intl.NumberFormat("id-ID");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = Cookies.get("token");
            await axios.patch(
                "http://localhost:3030/auth/update",
                { oldpassword: oldPassword, newPassword },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            toast.success("Password berhasil diubah");
            setOldPassword("");
            setNewPassword("");
            setShowForm(false);
        } catch (err: any) {
            toast.error(err?.response?.data?.error ?? "Terjadi kesalahan.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const token = Cookies.get("token");
        const formData = new FormData();
        formData.append("img", file);

        try {
            setUploading(true);

            const res = await axios.patch("http://localhost:3030/auth/profile-img", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            const newToken = res.data?.data?.token;
            if (newToken) {
                Cookies.set("token", newToken, { path: "/" });
                await refreshUser();
            }

            toast.success("Foto profil berhasil diubah");
            setPreviewImg(URL.createObjectURL(file));
        } catch (err: any) {
            toast.error(err?.response?.data?.error ?? "Upload gagal");
        } finally {
            setUploading(false);
        }
    };

    const handleCopy = () => {
        if (!user?.referralCode) return;
        navigator.clipboard.writeText(user.referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    useEffect(() => {
        refreshUser();
    }, []);

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">👤 Halaman Profil</h1>
                <p className="text-gray-500 text-sm">Lihat dan kelola informasi akun kamu</p>
            </div>

            {/* Profil */}
            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <div className="relative">
                    <img
                        src={
                            previewImg ??
                            user?.profileImg ??
                            "https://ui-avatars.com/api/?name=" + user?.username
                        }
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border"
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="absolute bottom-0 right-0 bg-white border rounded-full p-1 shadow hover:bg-gray-100"
                        title={uploading ? "Mengupload..." : "Ganti Foto"}
                    >
                        {uploading ? (
                            <div className="animate-spin w-4 h-4 border-t-2 border-blue-500 rounded-full" />
                        ) : (
                            <UploadCloud size={16} />
                        )}
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleUpload}
                    />
                </div>

                <div className="space-y-2 text-gray-700">
                    <p className="text-lg font-semibold text-gray-800">{user?.username}</p>
                    <p>Email: {user?.email}</p>
                    <p>
                        Role:{" "}
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {user?.role}
                        </span>
                    </p>
                    <p className="flex items-center gap-2">
                        Referral Code:{" "}
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            {user?.referralCode}
                        </span>
                        <button onClick={handleCopy} className="text-sm text-gray-500 hover:text-green-600">
                            {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                        </button>
                    </p>
                </div>
            </div>

            {/* Kupon */}
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">🎟️ Kupon Kamu</h2>
                {user?.coupons?.length ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {user.coupons.map((coupon) => {
                            const expired = new Date(coupon.expiresAt) < new Date();
                            return (
                                <div
                                    key={coupon.id}
                                    className={`border p-4 rounded-md ${expired ? "bg-red-50 border-red-200" : "bg-gray-50"
                                        }`}
                                >
                                    <div className="font-bold text-gray-800">{coupon.code}</div>
                                    <div className="text-sm">
                                        {coupon.discount}% OFF <br />
                                        <span className={expired ? "text-red-500" : "text-gray-600"}>
                                            {expired ? "Expired" : "Berlaku sampai"}:{" "}
                                            {new Date(coupon.expiresAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-gray-500">Belum ada kupon tersedia.</p>
                )}
            </div>

            {/* Poin */}
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">💎 Poin Kamu</h2>
                <p className="text-green-700 font-bold mb-4">
                    Total:{" "}
                    {formatNumber.format(
                        user?.userPoints?.reduce?.((acc, p) => acc + p.amount, 0) || 0
                    )}{" "}
                    poin
                </p>

                {user?.userPoints?.length ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {user.userPoints.map((point, i) => {
                            const expired = new Date(point.expiredAt) < new Date();
                            return (
                                <div
                                    key={i}
                                    className={`border rounded-md p-4 shadow-sm ${expired ? "bg-red-50 border-red-200" : "bg-white"
                                        }`}
                                >
                                    <div className="text-lg font-bold text-gray-800">
                                        {formatNumber.format(point.amount)} Poin
                                    </div>
                                    <div className={`text-sm ${expired ? "text-red-500" : "text-gray-600"}`}>
                                        {expired ? "Expired pada" : "Berlaku sampai"}{" "}
                                        {new Date(point.expiredAt).toLocaleDateString()}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-gray-500">Belum ada poin tersedia.</p>
                )}
            </div>

            {/* Ganti Password */}
            <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">🔒 Ganti Password</h2>
                    <button
                        className="cursor-pointer text-sm text-blue-600 hover:underline"
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? "Tutup" : "Ubah"}
                    </button>
                </div>

                {showForm && (
                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                        {/* Password Lama */}
                        <div>
                            <label className="block text-sm mb-1">Password Lama</label>
                            <div className="relative">
                                <input
                                    type={showOld ? "text" : "password"}
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    className="w-full border px-3 py-2 rounded shadow-sm"
                                    required
                                />
                                <span
                                    onClick={() => setShowOld(!showOld)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                                >
                                    {showOld ? <Eye size={16} /> : <EyeOff size={16} />}
                                </span>
                            </div>
                        </div>

                        {/* Password Baru */}
                        <div>
                            <label className="block text-sm mb-1">Password Baru</label>
                            <div className="relative">
                                <input
                                    type={showNew ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full border px-3 py-2 rounded shadow-sm"
                                    required
                                    minLength={6}
                                />
                                <span
                                    onClick={() => setShowNew(!showNew)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                                >
                                    {showNew ? <Eye size={16} /> : <EyeOff size={16} />}
                                </span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                            disabled={loading}
                        >
                            {loading ? "Menyimpan..." : "Simpan Password Baru"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
