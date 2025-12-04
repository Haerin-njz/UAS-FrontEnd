"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { films, getFilmBySlug } from "@/lib/films";

function formatRp(value: number) {
  return (
    "Rp." + value.toLocaleString("id-ID", { minimumFractionDigits: 0 }) + ",00"
  );
}

export default function RingkasanPesananPage() {
  const params = useSearchParams();
  const filmParam = params?.get("film") || null;

  // Resolve film data: prefer slug param, else use lastOrder from localStorage, else fallback to first film
  let filmData = null;
  if (filmParam) {
    filmData = getFilmBySlug(filmParam) || films.find((f) => f.title.toLowerCase() === filmParam.toLowerCase()) || null;
  }

  if (!filmData && typeof window !== "undefined") {
    try {
      const last = localStorage.getItem("lastOrder");
      if (last) {
        const parsed = JSON.parse(last);
        const title = parsed.film as string | undefined;
        if (title) {
          filmData = films.find((f) => f.title.toLowerCase() === title.toLowerCase()) || null;
        }
      }
    } catch (e) {
      // ignore
    }
  }

  if (!filmData) filmData = films[0];

  // derive pricing from lastOrder when available (harga per tiket, seats count, layanan, promo)
  let hargaPerTiket = 45000;
  let layanan = 2500;
  let promo = 0;
  let seatsCount = 1;

  if (typeof window !== "undefined") {
    try {
      const last = localStorage.getItem("lastOrder");
      if (last) {
        const parsed = JSON.parse(last);
        if (parsed.hargaPerTiket) hargaPerTiket = Number(parsed.hargaPerTiket) || hargaPerTiket;
        if (parsed.biayaLayanan !== undefined) layanan = Number(parsed.biayaLayanan) || layanan;
        if (parsed.promo !== undefined) promo = Number(parsed.promo) || 0;
        if (Array.isArray(parsed.seats)) seatsCount = parsed.seats.length || 1;
      }
    } catch (e) {
      // ignore parse errors
    }
  }

  const subtotal = hargaPerTiket * seatsCount;
  const total = subtotal + layanan - promo;

  return (
    <>
      <link rel="stylesheet" href="/style/ringkasan-pesanan.css" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />

      <div className="order-container">
        <header className="page-header">
          <Link href="/checkout" className="back-button">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <span className="header-title">Order</span>
          <Link href="/profile" style={{ color: "white", textDecoration: "none" }}>
            <span className="material-symbols-outlined">account_circle</span>
          </Link>
        </header>

        <main className="order-summary-card">
          <h1>Ringkasan Order</h1>

          <section className="order-item">
            <Image src={filmData.poster} alt={`Poster Film ${filmData.title}`} className="movie-poster" width={80} height={120} priority />
            <div className="item-details">
              <h2>{filmData.title}</h2>
            </div>
          </section>

          <hr className="separator" />

          <section className="promo-details">
            <h3>Promo Voucher Digunakan</h3>
            <div className="promo-row">
              <span className="voucher-code">{promo > 0 ? "FF8230S" : "-"}</span>
              <span className="voucher-amount">{promo > 0 ? `- ${formatRp(promo)}` : `-`}</span>
              <button className="remove-promo">&times;</button>
            </div>
          </section>

          <hr className="separator" />

          <section className="payment-details">
            <h3>Total Pembayaran</h3>
            <div className="payment-row">
              <span>Harga tiket ({seatsCount} x)</span>
              <span>{formatRp(subtotal)}</span>
            </div>
            <div className="payment-row">
              <span>Biaya Layanan</span>
              <span>{formatRp(layanan)}</span>
            </div>
            <div className="payment-row">
              <span>Promo</span>
              <span className="voucher-amount">{promo > 0 ? `- ${formatRp(promo)}` : `-`}</span>
            </div>

            <div className="payment-row total">
              <strong>Total Akhir</strong>
              <strong>{formatRp(total)}</strong>
            </div>
          </section>

          <hr className="separator-dashed" />

          <div className="action-button-container">
            <Link href={`/transaksi_tiket?film=${encodeURIComponent((filmData as any).slug)}`}>
              <button className="btn-continue">Lanjutkan Pembayaran</button>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}