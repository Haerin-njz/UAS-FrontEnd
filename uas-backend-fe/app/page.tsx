"use client";
import React from "react";

import Navbar from "./components/navbar";
import SearchButtons from "./components/searchbutton";
import NowPlaying from "./components/filmsection";
import ComingSoon from "./components/comingsoon";
import Footer from "./components/footer";
import { Container } from "react-bootstrap";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      
      <main>
        <Container className="my-5">
          {/* Tinggal panggil nama komponennya saja */}
          <SearchButtons />
          <NowPlaying />
          <ComingSoon />
        </Container>
      </main>
      
      <Footer />
    </div>
  );
}