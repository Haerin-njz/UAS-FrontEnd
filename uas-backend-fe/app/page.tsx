import Image from "next/image"; 
import React from "react";

export default function Home() {
  return (
    <>
      {/* */}
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
            <a href="profile.html">
              <img
                src="/img/icons/user.png"
                alt="Akun Saya"
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                }}
              />
            </a>
          </div>
        </div>
      </header>
      {/* */}
      <main>
        <div className="container search-wrapper">
          <button className="custom-btn">
            <img src="/img/icons/search.png" alt="Search" className="icon" />
            <span>Cari Film</span>
          </button>

          <button className="custom-btn">
            <img src="/img/icons/location.png" alt="Lokasi" className="icon" />
            <span>Cari Bioskop</span>
          </button>
        </div>

        <section className="movie-gallery">
          <div className="container">
            <div className="gallery-header">
              <h2>Now playing</h2>
              <a href="#">Semua film</a>
            </div>
            <div className="carousel" id="movie-carousel">
              <button className="arrow prev-arrow">&#10094;</button>
              <div className="movie-list">
                <div className="list-film">
                  <a href="/index/detail-film.html">
                    <img src="/img/Gambar-Onepiece.jpg" alt="Film 1" />
                  </a>
                </div>
                <div className="list-film">
                  <a href="/index/detail-film2.html">
                    <img src="/img/Gambar-Frieren.jpg" alt="Film 2" />
                  </a>
                </div>
                <div className="list-film">
                  <img src="/img/Gambar-Wednesday.jpg" alt="Film 3" />
                </div>
                <div className="list-film">
                  <img src="/img/Gambar-StrangerThings.jpg" alt="Film 4" />
                </div>
                <div className="list-film">
                  <img src="/img/Gambar-Starwars.jpg" alt="Film 5" />
                </div>
                <div className="list-film">
                  <img src="/img/Gambar-Avengers.jpg" alt="Film 6" />
                </div>
                <div className="list-film">
                  <img src="/img/Gambar-Spiderman.jpg" alt="Film 7" />
                </div>
                <div className="list-film">
                  <img src="/img/Gambar-Forrestgump.jpg" alt="Film 8" />
                </div>
                <div className="list-film">
                  <img src="/img/Gambar-Goodwillhunting.jpg" alt="Film 9" />
                </div>
                <div className="list-film">
                  <img src="/img/Gambar-Savingpvtryan.jpg" alt="Film 10" />
                </div>
              </div>
              <button className="arrow next-arrow">&#10095;</button>
            </div>
          </div>
        </section>

        <section className="movie-gallery">
          <div className="container">
            <div className="gallery-header">
              <h2>Coming soon...</h2>
              <a href="#">Semua film</a>
            </div>
            <div className="carousel" id="movie-carousel-coming-soon">
              {/* Pastikan ID ini unik jika JS Anda menargetkannya secara terpisah */}
              <div className="movie-list">
                <div className="list-film">
                  <img src="/img/Gambar-OFA.jpg" alt="Film 1" />
                </div>
                <div className="list-film">
                  <img src="/img/Gambar-OFA.jpg" alt="Film 2" />
                </div>
                <div className="list-film">
                  <img src="/img/Gambar-OFA.jpg" alt="Film 3" />
                </div>
                <div className="list-film">
                  <img src="/img/Gambar-OFA.jpg" alt="Film 4" />
                </div>
                <div className="list-film">
                  <img src="/img/Gambar-OFA.jpg" alt="Film 5" />
                </div>
                <div className="list-film">
                  <img src="/img/Gambar-OFA.jpg" alt="Film 6" />
                </div>
                <div className="list-film">
                  <img src="/img/Gambar-OFA.jpg" alt="Film 7" />
                </div>
                <div className="list-film">
                  <img src="/img/Gambar-OFA.jpg" alt="Film 8" />
                </div>
                <div className="list-film">
                  <img src="/img/Gambar-OFA.jpg" alt="Film 9" />
                </div>
                <div className="list-film">
                  <img src="/img/Gambar-OFA.jpg" alt="Film 10" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* */}
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