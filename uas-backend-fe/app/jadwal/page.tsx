"use client";

import { useRouter } from "next/navigation";
import "./jadwal.css";

export default function JadwalPage() {
  const router = useRouter();

  const pesan = (film: string, jam: string) => {
    router.push(`/checkout?film=${encodeURIComponent(film)}&jam=${jam}`);
  };

  return (
    <div>
      <header>
        <span>Jadwal Film Hari Ini</span>
      </header>

      <a href="/detail-film" className="back-button">← Kembali</a>

      <section className="film-card">
        <img src="/img/Gambar-Onepiece.jpg" alt="Poster One Piece Film Red" />

        <div className="film-info">
          <h2>ONE PIECE FILM RED</h2>
          <p><strong>Genre:</strong> Adventure, Fantasy</p>
          <p><strong>Durasi:</strong> 115 Menit</p>

          <div className="schedule">
            <h3>Pilih Jadwal Tayang:</h3>
            <div className="day">
              {["12:00", "14:00", "16:00", "18:00", "20:00"].map(time => (
                <button key={time} onClick={() => pesan("ONE PIECE FILM RED", time)}>
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>Copyrights Kelompok 4</p>
      </footer>
    </div>
  );
}
