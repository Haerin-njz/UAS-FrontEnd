"use client";
import { Row, Col, Card, Button } from "react-bootstrap";

// Data-nya kita taruh di sini saja biar rapi
const nowPlayingMovies = [
  { href: "/index/detail-film.html", img: "/img/Gambar-Onepiece.jpg", alt: "Film 1" },
  { href: "/index/detail-film2.html", img: "/img/Gambar-Frieren.jpg", alt: "Film 2" },
  { href: "#", img: "/img/Gambar-Wednesday.jpg", alt: "Film 3" },
  { href: "#", img: "/img/Gambar-StrangerThings.jpg", alt: "Film 4" },
  { href: "#", img: "/img/Gambar-Starwars.jpg", alt: "Film 5" },
  { href: "#", img: "/img/Gambar-Avengers.jpg", alt: "Film 6" },
];

export default function NowPlaying() {
  return (
    <section className="movie-gallery mb-5">
      <Row>
        <Col>
          <h2 className="mb-0">Now Playing</h2>
        </Col>
        <Col className="text-end">
          <a href="#">Semua film</a>
        </Col>
      </Row>
      <hr />
      <Row className="g-4">
        {nowPlayingMovies.map((movie, index) => (
          <Col md={3} sm={6} xs={12} key={index}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Img
                variant="top"
                src={movie.img}
                alt={movie.alt}
                style={{ height: '400px', objectFit: 'cover' }}
              />
              <Card.Body className="text-center">
                <Button href={movie.href} variant="primary">
                  Lihat Detail
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
}