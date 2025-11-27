"use client";
import { Row, Col, Card, Button } from "react-bootstrap";

const comingSoonMovies = [
  { img: "/img/Gambar-OFA.jpg", alt: "Film 1" },
  { img: "/img/Gambar-OFA.jpg", alt: "Film 2" },
  { img: "/img/Gambar-OFA.jpg", alt: "Film 3" },
  { img: "/img/Gambar-OFA.jpg", alt: "Film 4" },
  // ...dan seterusnya
];

export default function ComingSoon() {
  return (
    <section className="movie-gallery">
      <Row>
        <Col>
          <h2 className="mb-0">Coming Soon...</h2>
        </Col>
        <Col className="text-end">
          <a href="#">Semua film</a>
        </Col>
      </Row>
      <hr />
      <Row className="g-4">
        {comingSoonMovies.map((movie, index) => (
          <Col md={3} sm={6} xs={12} key={index}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Img
                variant="top"
                src={movie.img}
                alt={movie.alt}
                style={{ height: '400px', objectFit: 'cover' }}
              />
              <Card.Body className="text-center">
                <Button variant="secondary" disabled>
                  Segera Hadir
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
}