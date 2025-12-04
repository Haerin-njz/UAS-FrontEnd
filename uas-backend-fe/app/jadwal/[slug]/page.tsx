"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { getFilmBySlug } from "@/lib/films";

export default function FilmSchedulePage() {
  const router = useRouter();
  const params = useParams();
  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

  if (!slug) {
    return (
      <main>
        <div className="page-container" style={{ textAlign: "center", marginTop: 60 }}>
          <p>Memuat...</p>
        </div>
      </main>
    );
  }

  const film = getFilmBySlug(slug);
  const jamList = ["12:00", "14:00", "16:00", "18:00", "20:00"];

  if (!film) {
    return (
      <main>
        <div className="page-container" style={{ textAlign: "center", marginTop: "60px" }}>
          <h2>Film tidak ditemukan</h2>
          <button onClick={() => router.back()} style={{ marginTop: "20px", padding: "10px 20px" }}>
            Kembali
          </button>
        </div>
      </main>
    );
  }

  function pesan(jam: string) {
    if (!film) return;
    const url = `/checkout?film=${encodeURIComponent(film.title)}&jam=${encodeURIComponent(jam)}`;
    router.push(url);
  }

  return (
    <main>
      <link rel="stylesheet" href="/style/jadwal.css" />

      <div className="page-container">
        <style>{`
          .back-button {
            display: inline-block;
            margin: 25px 40px 0 40px;
            padding: 10px 20px;
            background-color: #f2ecd6e7;
            color: #000;
            font-weight: bold;
            border-radius: 8px;
            text-decoration: none;
            transition: all 0.2s ease;
            border: none;
            cursor: pointer;
          }

          .back-button:hover {
            background-color: #f2ecd6e7;
            transform: scale(1.05);
          }
        `}</style>

        <header>
          <span>Jadwal Film Hari Ini</span>
        </header>

        <button className="back-button" onClick={() => router.push(`/film/${slug}`)}>
          ← Kembali
        </button>

        <section className="film-card">
          <div className="poster-wrap">
            <img src={film.poster} alt={`Poster ${film.title}`} />
          </div>

          <div className="film-info">
            <h2>{film.title}</h2>
            <div className="meta">
              <div><strong>Genre:</strong> {film.genre}</div>
              <div><strong>Durasi:</strong> {film.duration}</div>
            </div>

            <p className="description">{film.summary}</p>

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

      </div>

      <footer>
        <p>Copyrights Kelompok 4</p>
      </footer>
    </main>
  );
}
