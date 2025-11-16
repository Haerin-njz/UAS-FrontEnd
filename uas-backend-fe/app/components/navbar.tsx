import React from 'react';

export default function Navbar() {
  return (
    <header>
      <div className="container">
        <div className="logo">UTS Front END</div>
        <div className="login-signup">
          <a href="/index/login.html" className="login-btn">Log In</a>
          <a href="/index/sign-up.html" className="signup-btn">Sign Up</a>
        </div>
        <div
          className="user-account"
          id="user-icon"
          style={{ display: "none" }}
        >
          <a href="profile.html">
            <img
              src="/img/icons/user.png"
              alt="Akun Saya"
              style={{ width: "32px", height: "32px", borderRadius: "50%" }}
            />
          </a>
        </div>
      </div>
    </header>
  );
}