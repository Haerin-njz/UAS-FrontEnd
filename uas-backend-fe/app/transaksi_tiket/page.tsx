'use client'; 

import React, { useState, FormEvent } from "react";
import Link from "next/link";
import Navbar from "../components/navbar"; // <-- 1. IMPORT NAVBAR
import Footer from "../components/footer"; // <-- 2. IMPORT FOOTER

export default function BeliTiketPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const purchaseData = {
        ticketId: 'FILM-001',
        quantity: quantity,
        name: name,
        email: email,
      };
      console.log('MENGIRIM DATA PEMBELIAN:', purchaseData);

      await new Promise(resolve => setTimeout(resolve, 2000));

      const fakeOrderId = `ORD-${Date.now()}`;
      setIsError(false);
      setMessage(`Pembelian Sukses! ID Order Anda: ${fakeOrderId}`);
      
      setName('');
      setEmail('');
      setQuantity(1);

    } catch (error: any) {
      setIsError(true);
      setMessage('Maaf, terjadi kesalahan. Coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar /> {/* <-- 3. GANTI HEADER DENGAN KOMPONEN INI */}
      
      <main>
        <div className="container">
          
          <div className="purchase-form-container">
            <h1>Form Pembelian Tiket</h1>
            <p>Silakan isi data diri Anda untuk melanjutkan pemesanan.</p>

            <form onSubmit={handleSubmit} className="purchase-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Nama Lengkap:</label>
                <input
                  type="text"
                  id="name"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="quantity" className="form-label">Jumlah Tiket:</label>
                <input
                  type="number"
                  id="quantity"
                  className="form-input"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  min="1"
                  max="10"
                  required
                  disabled={isLoading}
                />
              </div>

              <button type="submit" className="form-button" disabled={isLoading}>
                {isLoading ? 'Sedang Memproses...' : 'Bayar Sekarang'}
              </button>
            </form>

            {message && (
              <div className={isError ? 'message-error' : 'message-success'}>
                {message}
              </div>
            )}

          </div>
        </div>
      </main>

      <Footer /> {/* <-- 4. GANTI FOOTER DENGAN KOMPONEN INI */}
    </>
  );
}