"use client";
import { Row, Col, Button } from "react-bootstrap";

export default function SearchButtons() {
  return (
    <Row className="g-3 mb-5 justify-content-center">
      <Col md={5}>
        <Button variant="outline-primary" size="lg" className="w-100 py-3">
          <i className="bi bi-search me-2"></i>
          Cari Film
        </Button>
      </Col>
      <Col md={5}>
        <Button variant="outline-secondary" size="lg" className="w-100 py-3">
          <i className="bi bi-geo-alt me-2"></i>
          Cari Bioskop
        </Button>
      </Col>
    </Row>
  );
}