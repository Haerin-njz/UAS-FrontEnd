"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CheckoutPage() {
	const router = useRouter();
	const searchParams = useSearchParams();

	// URL params
	const jamParam = searchParams?.get("jam") || "12:00";
	const filmParam = searchParams?.get("film") || "ONE PIECE FILM RED";

	const [bookings, setBookings] = useState<Record<string, string[]>>({
		"12:00": [],
		"14:00": [],
		"16:00": [],
		"18:00": [],
		"20:00": [],
	});

	const [selected, setSelected] = useState<string[]>([]);

	// daily reset and load bookings from localStorage
	useEffect(() => {
		const today = new Date().toISOString().split("T")[0];
		const lastDate = localStorage.getItem("lastBookingDate");

		if (lastDate !== today) {
			localStorage.removeItem("bookings");
			localStorage.setItem("lastBookingDate", today);
		}

		const stored = localStorage.getItem("bookings");
		if (stored) {
			try {
				const parsed = JSON.parse(stored);
				setBookings((prev) => ({ ...prev, ...parsed }));
			} catch (e) {
				setBookings((prev) => ({ ...prev }));
			}
		}
	}, []);

	// helper: toggle seat
	function toggleSeat(seatId: string) {
		setSelected((prev) => {
			if (prev.includes(seatId)) return prev.filter((s) => s !== seatId);
			return [...prev, seatId];
		});
	}

	// checkout handler
	function handleCheckout() {
		if (selected.length === 0) {
			alert("Belum pilih kursi!");
			return;
		}

		const updated = { ...bookings };
		const current = new Set(updated[jamParam] || []);
		selected.forEach((s) => current.add(s));
		updated[jamParam] = Array.from(current);

		localStorage.setItem("bookings", JSON.stringify(updated));

		const today = new Date().toISOString().split("T")[0];
		const orderSummary = {
			film: filmParam,
			jam: jamParam,
			seats: selected,
			hargaPerTiket: 65000,
			biayaLayanan: 2500,
			promo: 40000,
			tanggal: today,
		};
		localStorage.setItem("lastOrder", JSON.stringify(orderSummary));

		// navigate to summary page (ensure this route exists)
		router.push("/ringkasan-pesanan");
	}

	function handleBack() {
		router.push("/jadwal");
	}

	// rendering seats
	const rows = 5;
	const cols = 8;

	const isBooked = (seatId: string) => {
		return (bookings[jamParam] || []).includes(seatId);
	};

	return (
		<main>
			<link rel="stylesheet" href="/style/checkout.css" />

			<header>
				<span>Pemesanan Kursi Bioskop</span>
			</header>

			<div className="container">
				<div className="screen">LAYAR</div>

				<div id="seat-container">
					{Array.from({ length: rows }).map((_, r) => (
						<div className="row" key={r}>
							{Array.from({ length: cols }).map((__, c) => {
								const seatId = String.fromCharCode(65 + r) + (c + 1);
								const booked = isBooked(seatId);
								const sel = selected.includes(seatId);

								return (
									<div
										key={seatId}
										className={"seat" + (booked ? " booked" : sel ? " selected" : "")}
										onClick={() => {
											if (booked) return;
											toggleSeat(seatId);
										}}
										data-seat={seatId}
									>
										{seatId}
									</div>
								);
							})}
						</div>
					))}
				</div>

				<div className="info">
					<h3>Kursi Dipilih:</h3>
					<p id="selected-seats">{selected.length ? selected.join(", ") : "-"}</p>
				</div>

				<div className="buttons">
					<button id="checkoutBtn" className="checkout" onClick={handleCheckout}>
						Checkout
					</button>
					<button id="backBtn" className="back" onClick={handleBack}>
						Kembali ke Jadwal
					</button>
				</div>
			</div>

			<footer>
				<p>Copyright Kelompok 4</p>
			</footer>
		</main>
	);
}

