"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import '../../public/style/profile.css';

export default function ProfilePage() {
  const router = useRouter();

  const [user] = useState<Record<string, any> | null>(() => {
    try {
      if (typeof window === 'undefined') return null;
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  function handleLogout() {
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } catch {
      // ignore
    }
    try { window.dispatchEvent(new Event('auth-changed')); } catch {}
    router.push('/');
  }

  const displayName = user?.full_name || user?.name || 'Pengguna';
  const displayEmail = user?.email || '—';

  return (
    <>
      <header className="header">
        <button
          className="back-btn"
          onClick={() => router.back()}
          aria-label="Kembali"
        >
          ←
        </button>
        <h1>Akun Saya</h1>
      </header>

      <main className="container">
        <section className="profile-summary">
          <div className="profile-picture">
            {/* If you have an avatar URL in user.avatar you can render it here */}
            <span className="initials">{(displayName || 'P').slice(0, 1)}</span>
          </div>
          <div className="profile-info">
            <h2 className="profile-name">{displayName}</h2>
            <p className="profile-email">{displayEmail}</p>
          </div>
        </section>

        <ul className="menu-list">
          <li className="menu-item">
            <Link href="/history">
              <span>History</span>
              <span className="arrow">&gt;</span>
            </Link>
          </li>
          <li className="menu-item">
            <Link href="/transaksi_tiket">
              <span>Detail Pembayaran</span>
              <span className="arrow">&gt;</span>
            </Link>
          </li>
          <li className="menu-item logout">
            <button onClick={handleLogout} className="logout-btn">
              <span>Log Out</span>
              <span className="arrow">&gt;</span>
            </button>
          </li>
        </ul>
      </main>
    </>
  );
}
