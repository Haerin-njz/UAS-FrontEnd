'use client';

import React, { useState, FormEvent, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function BeliTiketPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
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

  // minimal film/poster info so orders saved to DB include film details
  const [film, setFilm] = useState('One Piece Film: Red');
  const [poster, setPoster] = useState('/img/Gambar-Onepiece.jpg');

  // checkout quantity
  const [checkoutQuantity, setCheckoutQuantity] = useState<number>(1);
  const [checkoutSeats, setCheckoutSeats] = useState<string[]>([]);

  // Prefill name/email from localStorage (same as profile page)
  useEffect(() => {
	try {
		if (typeof window !== 'undefined') {
			// Read user from localStorage
			const raw = localStorage.getItem('user');
			if (raw) {
				const user = JSON.parse(raw);
				if (user?.full_name && !name) setName(user.full_name);
				if (user?.email && !email) setEmail(user.email);
			}
		}
	} catch {
		// ignore
	}

	// read checkout info from localStorage (key "lastOrder")
	try {
		if (typeof window !== 'undefined') {
			const raw = localStorage.getItem('lastOrder');
			if (raw) {
				const parsed = JSON.parse(raw);
				if (parsed?.quantity) setCheckoutQuantity(Number(parsed.quantity));
				if (parsed?.seats && Array.isArray(parsed.seats)) setCheckoutSeats(parsed.seats);
				if (parsed?.film) setFilm(parsed.film);
				if (parsed?.poster) setPoster(parsed.poster);
			} else {
				// fallback to URL param ?qty=
				const params = new URLSearchParams(window.location.search);
				const qty = params.get('qty');
				if (qty) setCheckoutQuantity(Math.max(1, Number(qty)));
			}
		}
	} catch {}
}, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);

    // require logged-in user info (we derive from cookies)
    if (!name || !email) {
      setIsError(true);
      setMessage('Silakan login terlebih dahulu untuk melanjutkan pembayaran.');
      setIsLoading(false);
      return;
    }

    try {
      const purchaseData: any = {
        quantity: checkoutQuantity,
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

      // Persist to local SQLite via our API
      try {
        await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            film,
            poster,
            date: new Date().toISOString(),
            name,
            email,
            quantity: checkoutQuantity,
            paymentMethod,
            payment: paymentMethod === 'card'
              ? { provider: 'card', amount: 0, status: 'completed', details: { last4: cardNumber.slice(-4) } }
              : { provider: bankName, amount: 0, status: 'pending' }
          })
        });
      } catch (apiErr) {
        // don't block UI on API failure — log for diagnostics
        // You can show a warning to user if desired
        // console.warn('Failed to save order to DB:', apiErr);
      }

      // reset fields
      setName('');
      setEmail('');
      // reset checkout quantity (keep default 1)
      setCheckoutQuantity(1);
      setPaymentMethod('card');
      setCardNumber('');
      setCardName('');
      setExpiry('');
      setCvv('');
      setBankName('BCA');

      // redirect to homepage immediately after successful purchase
      router.push('/');

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

              {/* --- ACCOUNT & ORDER SUMMARY (read-only) --- */}
              <div className="input-group">
                <label>Akun:</label>
                <div style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', background: '#fff' }}>
                  { name ? (
                    <span>
                      <Link href="/profile" className="text-gray-900 font-medium">{name}</Link>
                      <small style={{ color: '#6b7280' }}> ({email})</small>
                      <div style={{ marginTop: 6 }}>
                        <Link href="/profile" className="text-amber-600">Lihat Profil</Link>
                      </div>
                    </span>
                  ) : (
                    <span>
                      Belum login —{" "}
                      <Link href="/login" className="text-amber-600">Login</Link>
                      <span style={{ margin: '0 8px' }}>|</span>
                      <Link href="/signup" className="text-amber-600">Sign Up</Link>
                    </span>
                  )}
                </div>
              </div>

              <div className="input-group">
                <label>Ringkasan Pesanan (Jumlah):</label>
                <div style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', background: '#fff' }}>
                  <div>{checkoutQuantity} tiket</div>
                  {checkoutSeats.length > 0 && (
                    <small style={{ color: '#6b7280', display: 'block', marginTop: 4 }}>
                      Kursi: {checkoutSeats.join(', ')}
                    </small>
                  )}
                </div>
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
