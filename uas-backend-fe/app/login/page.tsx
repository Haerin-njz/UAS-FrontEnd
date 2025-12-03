"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    // Tambahkan logika autentikasi di sini
    router.push("/"); // Redirect ke home setelah login
  };

  return (
    <>
      {/* Load CSS eksternal */}
      <link rel="stylesheet" href="/style/login.css" />
      <link 
        rel="stylesheet" 
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" 
      />

      <div className="container">
        <header className="top-bar">
          {/* Tombol Back ke Home */}
          <Link href="/" className="back-arrow">
            &#x2190;
          </Link>
          <h1>Login</h1>
        </header>

        <main className="login-content">
          <div className="avatar">
            <span className="material-symbols-outlined">
              <Image
                src="/img/icons/user.png" // Pastikan gambar ini ada di public/img/icons/
                alt="Avatar"
                width={150}
                height={150}
                className="avatar-icon"
                priority
              />
            </span>
          </div>

          <form id="login-form" className="login-form" onSubmit={handleSubmit} noValidate>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                required
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
                <span
                  className="material-symbols-outlined"
                  id="togglePassword"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </div>
            </div>
            <button type="submit">Login</button>
          </form>

          <p className="signup-link">
            Belum punya akun? <Link href="/signup">Sign up</Link>
          </p>
        </main>
      </div>
    </>
  );
}