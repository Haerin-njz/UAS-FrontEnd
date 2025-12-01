import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header>
      <div className="container">
        <div className="logo">UTS Front END</div>
        <div className="login-signup">
          <Link href="/login">Log In</Link>
          <a href="/index/sign-up.html" className="signup-btn">Sign Up</a>
        </div>
        <div
          className="user-account"
          id="user-icon"
          style={{ display: "none" }}
        >
          <a href="profile.html">
            <Image
              src="/img/icons/user.png"
              alt="Akun Saya"
              width={32}
              height={32}
            />
          </a>
        </div>
      </div>
    </header>
  );
}