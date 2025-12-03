'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '../../public/style/profile.css';

export default function ProfilePage() {
  const router = useRouter();

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
          <div className="profile-picture"></div>
          <div className="profile-info">
            <h2 className="profile-name">User 01</h2>
            <p className="profile-email">user@gmail.com</p>
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
            <Link href="/login">
              <span>Log Out</span>
              <span className="arrow">&gt;</span>
            </Link>
          </li>
        </ul>
      </main>
    </>
  );
}
