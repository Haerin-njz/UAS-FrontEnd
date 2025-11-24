"use client";

import React from 'react';
import Link from 'next/link'; 
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  if (pathname === "/login") {
    return null;
  }

  return (
    <header>
      <div className="container">
        <div className="logo">UTS Front END</div>
        
        <div className="login-signup">
          <Link href="/login" className="login-btn">
            Log In
          </Link>
          
          <Link href="/register" className="signup-btn">
            Sign Up
          </Link>
        </div>

        <div
          className="user-account"
          id="user-icon"
          style={{ display: "none" }}
        >
          <Link href="/history">
            <img
              src="/img/icons/user.png"
              alt="Akun Saya"
              style={{ 
                width: "32px", 
                height: "32px", 
                borderRadius: "50%",
                cursor: "pointer"
              }}
            />
          </Link>
        </div>
      </div>
    </header>
  );
}