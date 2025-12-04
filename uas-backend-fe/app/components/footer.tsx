"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white px-6 py-6 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Brand */}
        <div className="text-lg font-semibold tracking-wide">
          TickFilm
        </div>

        {/* Navigation */}
        <div className="flex gap-6 text-sm opacity-80">
          <a href="/homepage" className="hover:opacity-100 transition">Home</a>
          <a href="/movies" className="hover:opacity-100 transition">Movies</a>
          <a href="/history" className="hover:opacity-100 transition">History</a>
          <a href="/profile" className="hover:opacity-100 transition">Profile</a>
        </div>

        {/* Copyright */}
        <div className="text-xs opacity-60 text-center sm:text-right">
          © {new Date().getFullYear()} TickFilm. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
