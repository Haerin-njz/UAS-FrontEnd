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
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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
    // Clear errors when user starts typing
    if (errors.length > 0) setErrors([]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: string[] = [];
    
    if (!form.username.trim()) nextErrors.push("Username/Full name is required");
    if (!form.password) nextErrors.push("Password is required");
    if (form.password.length < 6) nextErrors.push("Password must be at least 6 characters");
    if (form.password !== form.confirmPassword)
      nextErrors.push("Passwords do not match");
    if (!form.phone.trim()) nextErrors.push("Phone is required");
    if (!form.email.trim()) nextErrors.push("Email is required");

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.email && !emailRegex.test(form.email)) {
      nextErrors.push("Invalid email format");
    }

    setErrors(nextErrors);
    
    if (nextErrors.length === 0) {
      setIsLoading(true);
      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
            full_name: form.username,
            phone_number: form.phone,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setSuccessMessage("✓ Sign up successful! Redirecting to login...");
          // Save token to localStorage
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          
          // Redirect to login after 1.5 seconds
          setTimeout(() => {
            router.push("/login");
          }, 1500);
        } else {
          setErrors([data.error || "Sign up failed"]);
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
        <Link href="/login" className="back-arrow">&#x2190;</Link>
        <h1>Sign up</h1>
      </header>

      <main className="signup-content">
        <div className="avatar">
          <img src="/img/icons/user.png" alt="Avatar" className="avatar-icon" />
        </div>

        <form id="signup-form" className="signup-form" noValidate onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Full Name</label>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              disabled={isLoading}
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
              disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
              disabled={isLoading}
            />
          </div>

          {successMessage && (
            <div style={{ color: "green", padding: "10px", textAlign: "center" }}>
              {successMessage}
            </div>
          )}

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

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="login-link">
          Sudah punya akun? <Link href="/login">Login</Link>
        </p>
      </main>
    </div>
  );
}
