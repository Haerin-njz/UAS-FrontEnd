'use client';

import React, { useState, FormEvent } from "react";
import Link from "next/link";

export default function BeliTiketPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  // payment states
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [bankName, setBankName] = useState('BCA');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const purchaseData: any = {
        quantity,
        name,
        email,
        paymentMethod,
      };

      if (paymentMethod === "card") {
        purchaseData.card = { cardNumber, cardName, expiry, cvv };
      } else {
        purchaseData.bank = { bankName };
      }

      await new Promise((resolve) => setTimeout(resolve, 1500));

      const fakeOrderId = `ORD-${Date.now()}`;
      setIsError(false);
      setMessage(`Pembelian Sukses! ID Order Anda: ${fakeOrderId}`);

      setName('');
      setEmail('');
      setQuantity(1);
      setPaymentMethod('card');
      setCardNumber('');
      setCardName('');
      setExpiry('');
      setCvv('');
      setBankName('BCA');

    } catch (err) {
      setIsError(true);
      setMessage("Maaf, terjadi kesalahan. Coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <link rel="stylesheet" href="/style/history.css" />

      {/* MAIN */}
      <main
        style={{
          background: "#f6efe0",
          minHeight: "70vh",
          paddingTop: "40px",
          paddingBottom: "40px",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* CARD CONTAINER */}
          <div
            style={{
              maxWidth: 600,
              margin: "0 auto",
              background: "#ffffff",
              padding: "32px",
              borderRadius: "16px",
              boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
            }}
          >
            <h1
              style={{
                marginBottom: 10,
                color: "#111827",
                fontWeight: 800,
                fontSize: "1.8rem",
                textAlign: "center",
              }}
            >
              Form Pembelian Tiket
            </h1>

            <p
              style={{
                marginBottom: 20,
                color: "#374151",
                textAlign: "center",
              }}
            >
              Silakan isi data diri Anda untuk melanjutkan pemesanan.
            </p>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="login-form"
              style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16 }}
            >

              {/* --- INPUT GROUP WRAPPER --- */}
              <div className="input-group">
                <label htmlFor="name">Nama Lengkap:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="input-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="input-group">
                <label htmlFor="quantity">Jumlah Tiket:</label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  min={1}
                  max={10}
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Payment Method */}
              <div className="input-group">
                <label>Metode Pembayaran:</label>

                <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                    />
                    Kartu Kredit/Debit
                  </label>

                  <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <input
                      type="radio"
                      name="payment"
                      value="bank"
                      checked={paymentMethod === "bank"}
                      onChange={() => setPaymentMethod("bank")}
                    />
                    Transfer Bank
                  </label>
                </div>
              </div>

              {/* Card Payment Fields */}
              {paymentMethod === "card" && (
                <>
                  <div className="input-group">
                    <label>Nomor Kartu:</label>
                    <input
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      maxLength={19}
                    />
                  </div>

                  <div className="input-group">
                    <label>Nama di Kartu:</label>
                    <input value={cardName} onChange={(e) => setCardName(e.target.value)} />
                  </div>

                  <div style={{ display: "flex", gap: 12 }}>
                    <div className="input-group" style={{ flex: 1 }}>
                      <label>Expiry (MM/YY):</label>
                      <input value={expiry} onChange={(e) => setExpiry(e.target.value)} />
                    </div>

                    <div className="input-group" style={{ width: 120 }}>
                      <label>CVV:</label>
                      <input value={cvv} onChange={(e) => setCvv(e.target.value)} maxLength={4} />
                    </div>
                  </div>
                </>
              )}

              {/* Bank Payment Fields */}
              {paymentMethod === "bank" && (
                <div className="input-group">
                  <label>Pilih Bank:</label>
                  <select value={bankName} onChange={(e) => setBankName(e.target.value)}>
                    <option value="BCA">BCA</option>
                    <option value="BRI">BRI</option>
                    <option value="BNI">BNI</option>
                    <option value="Mandiri">Mandiri</option>
                  </select>

                  <small style={{ color: "#6b7280" }}>
                    Transfer ke rekening yang akan tampil setelah konfirmasi.
                  </small>
                </div>
              )}

              {/* BUTTONS */}
              <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
                <button type="submit" disabled={isLoading} style={{ flex: 1 }}>
                  {isLoading ? "Sedang Memproses..." : "Bayar Sekarang"}
                </button>

                <Link
                  href="/"
                  style={{
                    alignSelf: "center",
                    color: "#374151",
                    fontWeight: 600,
                  }}
                >
                  Batal
                </Link>
              </div>
            </form>

            {message && (
              <div
                style={{
                  marginTop: 18,
                  color: isError ? "#b91c1c" : "#065f46",
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                {message}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
