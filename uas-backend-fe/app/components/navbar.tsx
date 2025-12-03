"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
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

  if (pathname === "/login") {
    return null;
  }

  return (
    <header>
      <div className="container">
        <div className="logo">UTS Front END</div>

        {!user ? (
          <div className="login-signup">
            <Link href="/login" className="login-btn">
              Log In
            </Link>

            <Link href="/signup" className="signup-btn">
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="user-account" id="user-icon">
            <Link href="/profile">
              <img
                src="/img/icons/user.png"
                alt="Akun Saya"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  cursor: 'pointer'
                }}
              />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}