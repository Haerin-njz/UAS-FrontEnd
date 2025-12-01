"use client";
import { Button } from "react-bootstrap";
import Image from "next/image";

export default function SearchButtons() {
  return (
    // Gunakan d-flex untuk menajajarkan, gap-3 untuk jarak antar tombol
    <div className="d-flex justify-content-center gap-3 mb-5 search-wrapper">
      
      {/* Tombol Cari Film */}
      <Button 
        variant="outline-primary" 
        size="lg" 
        className="d-flex align-items-center px-4 py-3 custom-btn" // px-4 agar tidak terlalu lebar tapi cukup napas
      >
        {/* Menggunakan <img> agar sama persis dengan HTML */}
        <Image
            src="/img/icons/search.png" 
            alt="Search" 
            width={24} 
            height={24} 
            className="me-2" 
        />
        <span>Cari Film</span>
      </Button>

      {/* Tombol Cari Bioskop */}
      <Button 
        variant="outline-secondary" 
        size="lg" 
        className="d-flex align-items-center px-4 py-3 custom-btn"
      >
        <Image
            src="/img/icons/location.png" 
            alt="Lokasi" 
            width={24} 
            height={24} 
            className="me-2" 
        />
        <span>Cari Bioskop</span>
      </Button>
      
    </div>
  );
}