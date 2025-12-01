import React from "react";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Sign Up</h2>
        <div className="login-form-group">
          <label htmlFor="fullname">Full Name</label>
          <input type="text" id="fullname" name="fullname" required />
        </div>
        <div className="login-form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="login-form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div className="login-form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" required />
        </div>
        <button type="submit" className="login-btn">
          Create Account
        </button>
        <p className="login-link">
          Sudah punya akun? <Link href="/login">Log In</Link>
        </p>
      </form>
    </div>
  );
}
