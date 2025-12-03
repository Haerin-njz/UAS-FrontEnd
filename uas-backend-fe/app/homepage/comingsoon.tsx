"use client";

import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";
import { useRef } from "react";

const comingSoonMovies = [
  { img: "/img/Gambar-OFA.jpg", alt: "Film 1" },
  { img: "/img/Gambar-OFA.jpg", alt: "Film 2" },
  { img: "/img/Gambar-OFA.jpg", alt: "Film 3" },
  { img: "/img/Gambar-OFA.jpg", alt: "Film 4" },
  { img: "/img/Gambar-OFA.jpg", alt: "Film 5" },
  { img: "/img/Gambar-OFA.jpg", alt: "Film 6" },
  { img: "/img/Gambar-OFA.jpg", alt: "Film 7" },
  { img: "/img/Gambar-OFA.jpg", alt: "Film 8" },
  { img: "/img/Gambar-OFA.jpg", alt: "Film 9" },
  { img: "/img/Gambar-OFA.jpg", alt: "Film 10" },
];

export default function ComingSoon() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="movie-gallery">
      <Container>
        <Row className="gallery-header mb-4">
          <Col xs="auto">
            <h2>Coming soon...</h2>
          </Col>
          <Col className="d-flex align-items-center">
            {/* <Link href="#">Semua film</Link> */}
          </Col>
        </Row>

        <div className="carousel position-relative" id="movie-carousel">
          <button
            className="arrow prev-arrow position-absolute start-0 top-50 translate-middle-y"
            onClick={() => scroll("left")}
            style={{ zIndex: 10 }}
          >
            &#10094;
          </button>

          <div
            ref={scrollRef}
            className="movie-list d-flex gap-3 overflow-auto py-2"
            style={{ scrollBehavior: "smooth" }}
          >
            {comingSoonMovies.map((movie, index) => (
              <div key={index} className="list-film flex-shrink-0" style={{ minWidth: "200px" }}>
                <div style={{ position: "relative" }}>
                  <Image
                    src={movie.img}
                    alt={movie.alt}
                    width={200}
                    height={300}
                    style={{ width: "100%", height: "auto", objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ color: "white", fontSize: "18px", fontWeight: "bold" }}>
                      Segera Hadir
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="arrow next-arrow position-absolute end-0 top-50 translate-middle-y"
            onClick={() => scroll("right")}
            style={{ zIndex: 10 }}
          >
            &#10095;
          </button>
        </div>
      </Container>

      <style jsx>{`
        .movie-list::-webkit-scrollbar {
          display: none;
        }
        .movie-list {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}