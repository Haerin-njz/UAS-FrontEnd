"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "./checkout.css";

export default function CheckoutPage() {
  const router = useRouter();
  const params = useSearchParams();
  const jam = params.get("jam") || "12:00";
  const film = params.get("film") || "ONE PIECE FILM RED";
  const today = new Date().toISOString().split("T")[0];

  const [bookings, setBookings] = useState<any>({
    "12:00": [],
    "14:00": [],
    "16:00": [],
    "18:00": [],
    "20:00": []
  });

  const [selected, setSelected] = useState<string[]>([]);

  // Reset harian
  useEffect(() => {
    const lastDate = localStorage.getItem("lastBookingDate");
    if (lastDate !== today) {
      localStorage.removeItem("bookings");
      localStorage.setItem("lastBookingDate", today);
    }

    const saved = JSON.parse(localStorage.getItem("bookings") || "null");
    if (saved) setBookings(saved);
  }, []);

  const isBooked = (seatId: string) => bookings[jam]?.includes(seatId);

  const toggleSeat = (seatId: string) => {
    if (isBooked(seatId)) return;

    setSelected(prev =>
      prev.includes(seatId)
        ? prev.filter(s => s !== seatId)
        : [...prev, seatId]
    );
  };

  const checkout = () => {
    if (selected.length === 0) {
      alert("Belum pilih kursi!");
      return;
    }

    const updated = {
      ...bookings,
      [jam]: [...bookings[jam], ...selected]
    };

    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));

    const orderSummary = {
      film,
      jam,
      seats: selected,
      hargaPerTiket: 65000,
      biayaLayanan: 2500,
      promo: 40000,
      tanggal: today
    };

    localStorage.setItem("lastOrder", JSON.stringify(orderSummary));
    router.push("/ringkasan-pesanan");
  };

  return (
    <div>
      <header>
        <span>Pemesanan Kursi Bioskop</span>
      </header>

      <main>
        <div className="container">
          <div className="screen">LAYAR</div>

          <div id="seat-container">
            {[0,1,2,3,4].map(row => (
              <div className="row" key={row}>
                {Array.from({ length: 8 }, (_, i) => {
                  const seatId = String.fromCharCode(65 + row) + (i + 1);
                  const booked = isBooked(seatId);
                  const active = selected.includes(seatId);

                  return (
                    <div
                      key={seatId}
                      className={`seat ${booked ? "booked" : ""} ${active ? "selected" : ""}`}
                      onClick={() => toggleSeat(seatId)}
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
            <p>{selected.length ? selected.join(", ") : "-"}</p>
          </div>

          <div className="buttons">
            <button className="checkout" onClick={checkout}>Checkout</button>
            <button className="back" onClick={() => router.push("/jadwal")}>
              Kembali ke Jadwal
            </button>
          </div>
        </div>
      </main>

      <footer>
        <p>Copyright Kelompok 4</p>
      </footer>
    </div>
  );
}
