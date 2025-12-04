import React from "react";
import Link from "next/link";

const fakeOrders = [
    {
        id: "ORD-1A2B3C",
        film: "One Piece Film: Red",
        poster: "/img/Gambar-Onepiece.jpg",
        quantity: 2,
        date: "15 November 2025",
        status: "Selesai",
    },
    {
        id: "ORD-4D5E6F",
        film: "Frieren: Beyond Journey's End",
        poster: "/img/Gambar-Frieren.jpg",
        quantity: 1,
        date: "10 November 2025",
        status: "Selesai",
    },
    {
        id: "ORD-7G8H9I",
        film: "Stranger Things: The Movie",
        poster: "/img/Gambar-StrangerThings.jpg",
        quantity: 3,
        date: "05 November 2025",
        status: "Dibatalkan",
    },
    {
        id: "ORD-J1K2L3",
        film: "Avengers: Secret Wars",
        poster: "/img/Gambar-Avengers.jpg",
        quantity: 2,
        date: "01 November 2025",
        status: "Selesai",
    },
];

export default function RiwayatPesananPage() {
    return (
        <>
            {/* load history page stylesheet from public/style/history.css */}
            <link rel="stylesheet" href="/style/history.css" />

            {/* Header */}
            <header className="border-b" style={{ background: "#f6efe0", borderColor: "#efe2cc" }}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="text-2xl font-bold text-gray-800">UTS Front END</div>
                    <div id="user-icon" style={{ display: "none" }} />
                </div>
            </header>

            {/* Main */}
            <main className="min-h-[70vh]" style={{ background: "#f6efe0" }}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-8">
                        Riwayat Pesanan Anda
                    </h1>

                    {fakeOrders.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-sm p-8 text-center text-gray-800">
                            Anda belum memiliki riwayat pesanan.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 history-list">
                            {fakeOrders.map((order) => (
                                <article key={order.id} className="history-item">
                                    
                                    {/* Poster (UPDATED) */}
                                    <div className="poster overflow-hidden rounded-xl">
                                        <img
                                            src={order.poster}
                                            alt={order.film}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="details">
                                        <h3 className="title">{order.film}</h3>
                                        <div className="meta">
                                            <p className="truncate"><strong>Order ID:</strong> {order.id}</p>
                                            <p><strong>Jumlah:</strong> {order.quantity} tiket</p>
                                            <p><strong>Tanggal:</strong> {order.date}</p>
                                        </div>
                                    </div>

                                    {/* Status + action */}
                                    <div className="item-right">
                                        <span className={`status status-${order.status.toLowerCase()}`}>
                                            {order.status}
                                        </span>
                                        <Link href="#" className="action-link">Lihat Detail</Link>
                                    </div>
                                </article>
                            ))}
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
