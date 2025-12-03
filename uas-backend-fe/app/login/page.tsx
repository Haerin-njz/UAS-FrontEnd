"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  email: string;
  full_name: string;
  phone_number?: string;
}

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
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Log In</h2>

        <div className="login-form-group">
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

        <div className="login-form-group">
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
          <div style={{ color: "#c00", marginBottom: "15px" }}>
            <ul style={{ margin: 0, paddingLeft: "20px" }}>
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        <button type="submit" className="login-btn" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log In"}
        </button>

        <p className="login-link">
          Belum punya akun? <Link href="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}