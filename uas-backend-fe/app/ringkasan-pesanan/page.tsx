"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function RingkasanPesananPage() {
  return (
    <>
      {/* Memanggil CSS yang baru saja Anda buat */}
      <link rel="stylesheet" href="/style/ringkasan-pesanan.css" />
      
      {/* Font Google (Opsional: lebih baik jika dipindah ke layout.tsx) */}
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
          {/* Tombol Back ke Jadwal Film */}
          <Link href="/jadwal" className="back-button">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <span className="header-title">Order</span>
          
          {/* Link ke Profile User */}
          <Link href="/profile" style={{ color: 'white', textDecoration: 'none' }}>
             <span className="material-symbols-outlined">account_circle</span>
          </Link>
        </header>

        <main className="order-summary-card">
          <h1>Ringkasan Order</h1>

          <section className="order-item">
            {/* Pastikan gambar ini ada di folder public/img/ */}
            <Image
              src="/img/Gambar-Onepiece.jpg"
              alt="Poster Film One Piece"
              className="movie-poster"
              width={80}
              height={120}
              priority
            />
            <div className="item-details">
              <h2>One Piece</h2>
            </div>
          </section>

          <hr className="separator" />

          <section className="promo-details">
            <h3>Promo Voucher Digunakan</h3>
            <div className="promo-row">
              <span className="voucher-code">FF8230S</span>
              <span className="voucher-amount">- Rp.40.000,00</span>
              <button className="remove-promo">&times;</button>
            </div>
          </section>

          <hr className="separator" />

          <section className="payment-details">
            <h3>Total Pembayaran</h3>
            <div className="payment-row">
              <span>Harga tiket</span>
              <span>Rp.65.000,00</span>
            </div>
            <div className="payment-row">
              <span>Biaya Layanan</span>
              <span>Rp.2.500,00</span>
            </div>
            <div className="payment-row">
              <span>Promo</span>
              <span className="voucher-amount">- Rp.40.000,00</span>
            </div>

            <div className="payment-row total">
              <strong>Total Akhir</strong>
              <strong>Rp.27.500,00</strong>
            </div>
          </section>

          <hr className="separator-dashed" />

          <div className="action-button-container">
            <Link href="/transaksi_tiket">
              <button className="btn-continue">Lanjutkan Pembayaran</button>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}