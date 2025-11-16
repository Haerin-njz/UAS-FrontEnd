import React from "react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="login-container">                   
      <form className="login-form"> 
        <h2>Log In</h2>
        <div className="login-form-group"> 
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="login-form-group"> 
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit" className="login-btn"> 
          Log In
        </button>
        <p className="login-link"> 
          Belum punya akun? <Link href="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}