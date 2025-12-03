import React from "react";
import Link from "next/link";
import BackButton from "../../components/BackButton";
import { getFilmBySlug } from "../../../lib/films";

type Props = { params: { slug: string } };

export default function FilmDetailPage({ params }: Props) {
  const film = getFilmBySlug(params.slug);
  if (!film) {
    return (
      <div className="container" style={{ paddingTop: 40 }}>
        <h2>Film tidak ditemukan</h2>
        <p>
          Kembali ke <Link href="/film">daftar film</Link>
        </p>
      </div>
    );
  }

  
  return (
    <main>
      <header className="top-bar-detail">
        <div className="top-left">
          <BackButton />
        </div>
        <div className="top-center">Detail Film</div>
        <div className="top-right">
          <Link href="/profile" className="profile-icon">&#128100;</Link>
        </div>
      </header>

      <section className="film-info-section container">
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
      </section>

      <section className="ringkasan-section container">
        <h2>Ringkasan</h2>
        <div className="ringkasan-konten">
          <p>{film.summary}</p>
        </div>
      </section>

      <div className="cta-fixed">
        <Link href="/jadwal" className="btn-pesan">Lihat Jadwal & Pesan Tiket</Link>
      </div>
    </main>
  );
}
