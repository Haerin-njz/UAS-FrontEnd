"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/style/sign-up.css";
    document.head.appendChild(link);
    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
    };
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: string[] = [];
    if (!form.username.trim()) nextErrors.push("Username is required");
    if (!form.password) nextErrors.push("Password is required");
    if (form.password !== form.confirmPassword)
      nextErrors.push("Passwords do not match");
    if (!form.phone.trim()) nextErrors.push("Phone is required");
    if (!form.email.trim()) nextErrors.push("Email is required");

    setErrors(nextErrors);
    if (nextErrors.length === 0) {
      // TODO: call signup API here. For now, redirect to login on success.
      router.push("/login");
    }
  }

  return (
    <div className="container">
      <header className="top-bar">
        <Link href="/login" className="back-arrow">&#x2190;</Link>
        <h1>Sign up</h1>
      </header>

      <main className="signup-content">
        <div className="avatar">
          <img src="/img/icons/user.png" alt="Avatar" className="avatar-icon" />
        </div>

        <form id="signup-form" className="signup-form" noValidate onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="confirm-password">Konfirmasi Password</label>
            <div className="password-wrapper">
              <input
                type="password"
                id="confirm-password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="phone">No Telepon</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div id="error-messages" className="error-container">
            {errors.length > 0 && (
              <ul>
                {errors.map((err, i) => (
                  <li key={i} style={{ color: "#c00" }}>
                    {err}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button type="submit">Sign Up</button>
        </form>

        <p className="login-link">
          Sudah punya akun? <Link href="/login">Login</Link>
        </p>
      </main>
    </div>
  );
}
