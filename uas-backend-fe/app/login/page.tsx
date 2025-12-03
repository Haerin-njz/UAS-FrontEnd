"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    // Clear errors when user starts typing
    if (errors.length > 0) setErrors([]);
  }

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/style/sign-up.css";
    document.head.appendChild(link);
    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: string[] = [];

    if (!form.email.trim()) nextErrors.push("Email is required");
    if (!form.password) nextErrors.push("Password is required");

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.email && !emailRegex.test(form.email)) {
      nextErrors.push("Invalid email format");
    }

    setErrors(nextErrors);

    if (nextErrors.length === 0) {
      setIsLoading(true);
      try {
        const response = await fetch("/api/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Save token and user info
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          // Notify other components (navbar) that auth changed
          try { window.dispatchEvent(new Event('auth-changed')); } catch {}

          // Redirect to dashboard or home
          router.push("/");
        } else {
          setErrors([data.error || "Login failed"]);
        }
      } catch (error) {
        setErrors(["Network error: " + (error instanceof Error ? error.message : "Unknown error")]);
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <div className="container">
      <header className="top-bar">
        <Link href="/" className="back-arrow">
          &#x2190;
        </Link>
        <h1>Login</h1>
      </header>

      <main className="signup-content">
        <div className="avatar">
          <Image className="avatar-icon" src="/img/icons/user.png" alt="Avatar" width={70} height={70} />
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Log In</h2>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          {errors.length > 0 && (
            <div className="error-container">
              <ul>
                {errors.map((err, i) => (
                  <li key={i} style={{ color: "#c00" }}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log In"}
          </button>

          <p className="login-link">
            Belum punya akun? <Link href="/signup">Sign Up</Link>
          </p>
        </form>
      </main>
    </div>
  );
}