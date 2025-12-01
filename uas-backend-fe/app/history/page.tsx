import React from "react";
import Link from "next/link";

const fakeOrders = [
  {
    id: "ORD-1A2B3C",
    film: "One Piece Film: Red",
    quantity: 2,
    date: "15 November 2025",
    status: "Selesai",
  },
  {
    id: "ORD-4D5E6F",
    film: "Frieren: Beyond Journey's End",
    quantity: 1,
    date: "10 November 2025",
    status: "Selesai",
  },
  {
    id: "ORD-7G8H9I",
    film: "Stranger Things: The Movie",
    quantity: 3,
    date: "05 November 2025",
    status: "Dibatalkan",
  },
  {
    id: "ORD-J1K2L3",
    film: "Avengers: Secret Wars",
    quantity: 2,
    date: "01 November 2025",
    status: "Selesai",
  },
];

export default function RiwayatPesananPage() {
  return (
    <>
      <header>
        <div className="container">
          <div className="logo">UTS Front END</div>
          <div className="login-signup">
            <a href="/index/login.html" className="login-btn">
              Log In
            </a>
            <a href="/index/sign-up.html" className="signup-btn">
              Sign Up
            </a>
          </div>
          <div
            className="user-account"
            id="user-icon"
            style={{ display: "none" }}
          >
            <Link href="/history">
              <img
                src="/img/icons/user.png"
                alt="Akun Saya"
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              />
            </Link>
          </div>
        </div>
      </header>

      <main>
        <div className="container">
          <div className="history-container">
            <h1>Riwayat Pesanan Anda</h1>
            
            <div className="history-list">
              {fakeOrders.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#666' }}>
                  Anda belum memiliki riwayat pesanan.
                </p>
              ) : (
                fakeOrders.map((order) => (
                  <div key={order.id} className="history-item">
                    <div className="history-item-header">
                      <h3>{order.film}</h3>
                      <span
                        className={`status status-${order.status
                          .toLowerCase()}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="history-item-body">
                      <p>
                        <strong>Order ID:</strong> {order.id}
                      </p>
                      <p>
                        <strong>Jumlah:</strong> {order.quantity} tiket
                      </p>
                      <p>
                        <strong>Tanggal:</strong> {order.date}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className="container">
          <div className="media-social">
            <a href="#">
              <img src="/img/icons/facebook.png" />
              Facebook
            </a>
            <a href="#">
              <img src="/img/icons/instagram.png" />
              Instagram
            </a>
            <a href="#">
              <img src="/img/icons/twitter.png" />
              Twitter
            </a>
            <a href="#">
              <img src="/img/icons/youtube.png" />
              YouTube
            </a>
          </div>
          <hr />
          <p className="copyright">&copy;Copyrights Kelompok 4</p>
        </div>
      </footer>
    </>
  );
}