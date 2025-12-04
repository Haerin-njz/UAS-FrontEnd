'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { films } from "@/lib/films";

export default function RiwayatPesananPage() {
    const router = useRouter();
    const [orders, setOrders] = useState<any[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [filmFilter, setFilmFilter] = useState<string>(''); // film search filter

    // helper to fetch all orders
    async function fetchOrders() {
        setLoading(true);
        try {
            const resp = await fetch('/api/orders');
            const json = await resp.json();
            const rows = Array.isArray(json.data) ? json.data : (json.data || []);
            setOrders(rows);
        } catch {
            setOrders([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // Load all orders on mount
        fetchOrders();
    }, []);

    // Filter orders by film name if filmFilter is set
    const filteredOrders = orders?.filter((order) => {
        if (!filmFilter) return true;
        return (order.film || '').toLowerCase().includes(filmFilter.toLowerCase());
    }) || [];

    return (
        <>
            {/* load history page stylesheet from public/style/history.css */}
            <link rel="stylesheet" href="/style/history.css" />

            {/* Header */}
            <header className="border-b" style={{ background: "#f6efe0", borderColor: "#efe2cc" }}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <button 
                        onClick={() => router.push('/profile')}
                        className="px-3 py-2 text-sm rounded-md hover:bg-gray-200 transition"
                        title="Kembali ke Profile"
                    >
                        ← Kembali
                    </button>
                    <div className="text-2xl font-bold text-gray-800">UAS Front END</div>
                    <div id="user-icon" style={{ display: "none" }} />
                </div>
            </header>

            {/* Main */}
            <main className="min-h-[70vh]" style={{ background: "#f6efe0" }}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-8">
                        Riwayat Pesanan Anda
                    </h1>

                    {/* Film Search Filter */}
                    <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:gap-4">
                        <input
                            type="text"
                            placeholder="Cari nama film..."
                            value={filmFilter}
                            onChange={(e) => setFilmFilter(e.target.value)}
                            className="px-3 py-2 rounded-md border flex-1"
                        />
                        {filmFilter && (
                            <button 
                                type="button" 
                                onClick={() => setFilmFilter('')}
                                className="px-3 py-2 rounded-md border text-sm text-gray-600 hover:text-gray-900"
                            >
                                Hapus pencarian
                            </button>
                        )}
                    </div>

                    {loading ? (
                        <div className="bg-white rounded-2xl shadow-sm p-8 text-center text-gray-800">Memuat riwayat...</div>
                    ) : !orders || orders.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-sm p-8 text-center text-gray-800">
                            Anda belum memiliki riwayat pesanan.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 history-list">
                            {filteredOrders.length === 0 ? (
                                <div className="col-span-full bg-white rounded-2xl shadow-sm p-8 text-center text-gray-800">
                                    {filmFilter ? "Tidak ada film yang cocok dengan pencarian Anda." : "Tidak ada riwayat pesanan."}
                                </div>
                            ) : (
                                filteredOrders.map((order: any) => {
                                    // Find the correct poster based on film name
                                    const filmData = films.find((f) => f.title.toLowerCase() === (order.film || '').toLowerCase());
                                    const posterUrl = filmData?.poster || order.poster;
                                    
                                    return (
                                    <article key={order.order_id} className="history-item">
                                        <div className="poster overflow-hidden rounded-xl">
                                            {posterUrl ? (
                                                <img src={posterUrl} alt={order.film || order.order_id} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="poster-fallback">{(order.film || '').split(' ').map((w:string)=>w[0]).slice(0,2).join('')}</div>
                                            )}
                                        </div>

                                        <div className="details">
                                            <h3 className="title">{order.film || 'Tiket'}</h3>
                                            <div className="meta">
                                                <p className="truncate"><strong>Order ID:</strong> {order.order_id}</p>
                                                <p><strong>Jumlah:</strong> {order.quantity} tiket</p>
                                                <p><strong>Tanggal:</strong> {order.date || order.created_at}</p>
                                            </div>
                                        </div>

                                        <div className="item-right">
                                            <span className={`status status-${(order.status||'unknown').toLowerCase()}`}>
                                                {order.status}
                                            </span>
                                            <Link href="#" className="action-link">Lihat Detail</Link>
                                        </div>
                                    </article>
                                    );
                                })
                            )}
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t" style={{ background: "#f6efe0", borderColor: "#efe2cc" }}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                            <a className="flex items-center gap-2 hover:text-amber-600" href="#">
                                <img src="/img/icons/facebook.png" className="w-5 h-5" /> Facebook
                            </a>
                            <a className="flex items-center gap-2 hover:text-amber-600" href="#">
                                <img src="/img/icons/instagram.png" className="w-5 h-5" /> Instagram
                            </a>
                            <a className="flex items-center gap-2 hover:text-amber-600" href="#">
                                <img src="/img/icons/twitter.png" className="w-5 h-5" /> Twitter
                            </a>
                            <a className="flex items-center gap-2 hover:text-amber-600" href="#">
                                <img src="/img/icons/youtube.png" className="w-5 h-5" /> YouTube
                            </a>
                        </div>

                        <p className="text-sm text-gray-500">&copy;Copyrights Kelompok 4</p>
                    </div>
                </div>
            </footer>
        </>
    );
}
