"use client";

import Image from "next/image";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { useRef } from "react";

const films = [
  { slug: 'one-piece-red', img: "/img/Gambar-Onepiece.jpg", alt: "One Piece" },
  { slug: 'frieren', img: "/img/Gambar-Frieren.jpg", alt: "Frieren" },
  { slug: 'wednesday', img: "/img/Gambar-Wednesday.jpg", alt: "Wednesday" },
  { slug: 'stranger-things-5', img: "/img/Gambar-StrangerThings5.jpg", alt: "Stranger Things 5" },
  { slug: 'star-wars', img: "/img/Gambar-Starwars.jpg", alt: "Star Wars" },
  { slug: 'avengers', img: "/img/Gambar-Avengers.jpg", alt: "Avengers" },
  { slug: 'spiderman', img: "/img/Gambar-Spiderman.jpg", alt: "Spiderman" },
  { slug: 'forrest-gump', img: "/img/Gambar-Forrestgump.jpg", alt: "Forrest Gump" },
  { slug: 'good-will-hunting', img: "/img/Gambar-Goodwillhunting.jpg", alt: "Good Will Hunting" },
  { slug: 'saving-private-ryan', img: "/img/Gambar-Savingpvtryan.jpg", alt: "Saving Private Ryan" },
];

export default function FilmSection() {
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
            <h2>Now playing</h2>
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
            {films.map((film, index) => (
              <div key={index} className="list-film flex-shrink-0" style={{ minWidth: "200px" }}>
                <Link href={`/film/${film.slug}`}>
                  <Image
                    src={film.img}
                    alt={film.alt}
                    width={200}
                    height={300}
                    style={{ width: "100%", height: "auto", objectFit: "cover" }}
                  />
                </Link>
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