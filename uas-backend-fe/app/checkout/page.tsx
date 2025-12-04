"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// =====================
// TYPE DEFINITIONS
// =====================
type SeatData = { seat: string; time: number };

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL params
  const jamParam = searchParams?.get("jam") || "12:00";
  const filmParam = searchParams?.get("film") || "ONE PIECE FILM RED";

  // =====================
  // STATE
  // =====================
  const [bookings, setBookings] = useState<Record<string, SeatData[]>>({
    "12:00": [],
    "14:00": [],
    "16:00": [],
    "18:00": [],
    "20:00": [],
  });

  const [selected, setSelected] = useState<string[]>([]);

  // =====================
  // LOAD BOOKINGS + CLEAN EXPIRED SEATS
  // =====================
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const lastDate = localStorage.getItem("lastBookingDate");

    // reset harian
    if (lastDate !== today) {
      localStorage.removeItem("bookings");
      localStorage.setItem("lastBookingDate", today);
    }

    const stored = localStorage.getItem("bookings");
    if (!stored) return;

    const parsed: Record<string, SeatData[]> = JSON.parse(stored);
    const now = Date.now();
    const limit = 2 * 60 * 60 * 1000; // 2 jam

    // Hapus kursi yang sudah > 2 jam
    for (const jam in parsed) {
      parsed[jam] = parsed[jam].filter((item) => now - item.time < limit);
    }

    setBookings(parsed);
    localStorage.setItem("bookings", JSON.stringify(parsed));
  }, []);

  // =====================
  // SELECT SEAT
  // =====================
  function toggleSeat(seatId: string) {
    setSelected((prev) => {
      if (prev.includes(seatId)) return prev.filter((s) => s !== seatId);
      return [...prev, seatId];
    });
  }

  // =====================
  // CHECKOUT LOGIC
  // =====================
  function handleCheckout() {
    if (selected.length === 0) {
      alert("Belum pilih kursi!");
      return;
    }

    const updated = { ...bookings };
    const now = Date.now();
    const current = updated[jamParam] || [];

    // simpan kursi + waktu ambil tiket
    selected.forEach((s) => {
      current.push({ seat: s, time: now });
    });

    updated[jamParam] = current;

    localStorage.setItem("bookings", JSON.stringify(updated));

    const today = new Date().toISOString().split("T")[0];
    const orderSummary = {
      film: filmParam,
      jam: jamParam,
      seats: selected,
      hargaPerTiket: 65000,
      biayaLayanan: 2500,
      promo: 40000,
      tanggal: today,
    };
    localStorage.setItem("lastOrder", JSON.stringify(orderSummary));

    router.push("/ringkasan-pesanan");
  }

  function handleBack() {
    router.push("/jadwal");
  }

  // =====================
  // RENDER SEATS
  // =====================
  const rows = 5;
  const cols = 8;

  // cek apakah kursi sudah dibooking
  const isBooked = (seatId: string) => {
    return (bookings[jamParam] || []).some((x) => x.seat === seatId);
  };

  return (
    <main>
      <link rel="stylesheet" href="/style/checkout.css" />

      <header>
        <span>Pemesanan Kursi Bioskop</span>
      </header>

      <div className="container">
        <div className="screen">LAYAR</div>

        <div id="seat-container">
          {Array.from({ length: rows }).map((_, r) => (
            <div className="row" key={r}>
              {Array.from({ length: cols }).map((__, c) => {
                const seatId = String.fromCharCode(65 + r) + (c + 1);
                const booked = isBooked(seatId);
                const sel = selected.includes(seatId);

                return (
                  <div
                    key={seatId}
                    className={
                      "seat" + (booked ? " booked" : sel ? " selected" : "")
                    }
                    onClick={() => {
                      if (booked) return;
                      toggleSeat(seatId);
                    }}
                    data-seat={seatId}
                  >
                    {seatId}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="info">
          <h3>Kursi Dipilih:</h3>
          <p id="selected-seats">
            {selected.length ? selected.join(", ") : "-"}
          </p>
        </div>

        <div className="cta-fixed">
          <div className="container">
            <button id="backBtn" className="back" onClick={handleBack}>
              Ubah Jadwal
            </button>
            <button id="checkoutBtn" className="checkout" onClick={handleCheckout}>
              Pesan Tiket
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
