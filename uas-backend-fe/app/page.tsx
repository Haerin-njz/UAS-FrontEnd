"use client";
import React, { useEffect } from "react";

import Navbar from "./homepage/navbar";
import SearchButtons from "./homepage/searchbutton";
import NowPlaying from "./homepage/filmsection";
import ComingSoon from "./homepage/comingsoon";
import Footer from "./homepage/footer";
import { Container } from "react-bootstrap";

export default function Home() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/style/homepage.css";
    document.head.appendChild(link);
    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
    };
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      
      <main>
        <Container className="my-5">
          <SearchButtons />
          <NowPlaying />
          <ComingSoon />
        </Container>
      </main>
      
      <Footer />
    </div>
  );
}