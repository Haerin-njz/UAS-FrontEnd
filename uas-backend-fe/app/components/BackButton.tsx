"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  function handleBack() {
    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back();
    } else {
      router.push("/");
    }
  }

  return (
    <button type="button" aria-label="Kembali" className="back-arrow" onClick={handleBack}>
      &#8592;
    </button>
  );
}
