"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function JadwalPage() {
  const router = useRouter();
  const film = "ONE PIECE FILM RED";
  const jamList = ["12:00", "14:00", "16:00", "18:00", "20:00"];

  function pesan(jam: string) {
    const url = `/checkout?film=${encodeURIComponent(film)}&jam=${encodeURIComponent(jam)}`;
    router.push(url);
  }

  return (
    <main>
      <link rel="stylesheet" href="/style/jadwal.css" />

      <style>{`
        .back-button {
          display: inline-block;
          margin: 25px 40px 0 40px;
          padding: 10px 20px;
          background-color: #E6B980;
          color: #000;
          font-weight: bold;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s ease;
          border: none;
          cursor: pointer;
        }

        .back-button:hover {
          background-color: #dba96b;
          transform: scale(1.05);
        }
      `}</style>

      <header>
        <span>Jadwal Film Hari Ini</span>
      </header>

      <button className="back-button" onClick={() => router.back()}>
        ← Kembali
      </button>

      <section className="film-card">
        <img src="/img/Gambar-Onepiece.jpg" alt="Poster One Piece Film Red" />

        <div className="film-info">
          <h2>{film}</h2>
          <p>
            <strong>Genre:</strong> Adventure, Fantasy
          </p>
          <p>
            <strong>Durasi:</strong> 115 Menit
          </p>

          <div className="schedule">
            <h3>Pilih Jadwal Tayang:</h3>
            <div className="day">
              {jamList.map((j) => (
                <button key={j} onClick={() => pesan(j)}>
                  {j}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>Copyrights Kelompok 4</p>
      </footer>
    </main>
  );
}
