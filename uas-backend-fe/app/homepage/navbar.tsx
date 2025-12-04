"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [user, setUser] = useState<Record<string, unknown> | null>(() => {
    try {
      if (typeof window === 'undefined') return null;
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const onAuthChanged = () => {
      try {
        const raw = localStorage.getItem('user');
        setUser(raw ? JSON.parse(raw) : null);
      } catch {
        setUser(null);
      }
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key === 'user' || e.key === 'token') onAuthChanged();
    };

    window.addEventListener('auth-changed', onAuthChanged);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('auth-changed', onAuthChanged);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return (
    <header>
      <div className="container">
        <div className="logo">UAS Front END</div>
        {!user ? (
          <div className="login-signup">
            <Link href="/login">Log In</Link>
            <Link href="/signup">Sign Up</Link>
          </div>
        ) : (
          <div className="user-account" id="user-icon">
            <Link href="/profile">
              <Image
                src="/img/icons/user.png"
                alt="Akun Saya"
                width={32}
                height={32}
              />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}