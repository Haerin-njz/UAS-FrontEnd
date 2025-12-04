"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { films } from "@/lib/films";

export default function JadwalPage() {
  const router = useRouter();

  function viewFilmSchedule(slug: string) {
    router.push(`/jadwal/${slug}`);
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

          .film-card-preview {
            cursor: pointer;
            background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
            border-radius: 14px;
            padding: 16px;
            box-shadow: 0 8px 30px rgba(2,6,23,0.6);
            border: 1px solid rgba(255,255,255,0.03);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }

          .film-card-preview:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 40px rgba(242,182,122,0.2);
          }

          .film-card-preview img {
            width: 100%;
            border-radius: 10px;
            margin-bottom: 12px;
          }

          .preview-info h3 {
            color: #fff;
            margin-bottom: 8px;
            font-size: 18px;
          }

          .preview-info p {
            color: #cbd8e6;
            font-size: 14px;
          }
        `}</style>

        <header>
          <span>Jadwal Film Hari Ini</span>
        </header>

        <button className="back-button" onClick={() => router.back()}>
           Kembali
        </button>

        <div className="films-grid">
          {films.map((film) => (
            <div key={film.slug} className="film-card-preview" onClick={() => viewFilmSchedule(film.slug)}>
              <img src={film.poster} alt={`Poster ${film.title}`} />
              <div className="preview-info">
                <h3>{film.title}</h3>
                <p>{film.genre}</p>
              </div>
            </div>
          ))}
        </div>

        <footer>
          <p>Copyrights Kelompok 4</p>
        </footer>
      </div>
    </main>
  );
}
