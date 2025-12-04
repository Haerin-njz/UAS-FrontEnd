import React from "react";
import Link from "next/link";
import { films } from "../../../lib/films";

type Props = { params: Promise<{ slug: string }> };

export default async function FilmDetailPage({ params }: Props) {
  const { slug } = await params;
  const film = films.find((f) => f.slug === slug);

  if (!film) {
    return (
      <div className="container" style={{ paddingTop: 40 }}>
        <h2>Film tidak ditemukan</h2>
        <p>
          Kembali ke <Link href="/">beranda</Link>
        </p>
      </div>
    );
  }

  return (
    <main>
      <div className="top-bar-detail">
        <div className="top-left">
          <Link href="/">
            ←
          </Link>
        </div>
        <div className="top-center">Detail Film</div>
        <div className="top-right">
          <Link href="/profile">👤</Link>
        </div>
      </div>

      <section className="film-info-section">
        <div className="container">
          <div className="film-info">
            <div className="poster">
              <img src={film.poster} alt={`Poster ${film.title}`} />
            </div>
            <div className="details">
              <h1>{film.title}</h1>
              <div className="detail-item"><strong>Genre:</strong><span>{film.genre}</span></div>
              <div className="detail-item"><strong>Durasi:</strong><span>{film.duration}</span></div>
              <div className="detail-item"><strong>Sutradara:</strong><span>{film.director}</span></div>
              <div className="detail-item"><strong>Usia:</strong><span>{film.age}</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="ringkasan-section">
        <div className="container">
          <h2>Ringkasan</h2>
          <div className="ringkasan-konten">
            <p>{film.summary}</p>
          </div>
        </div>
      </section>

      <div className="cta-section">
        <div className="container">
          <Link href="/jadwal" className="btn-pesan">Lihat Jadwal & Pesan Tiket</Link>
        </div>
      </div>
    </main>
  );
}
