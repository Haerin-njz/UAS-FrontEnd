"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

interface TransaksiForm {
  nama: string;
  event: string;
  jumlah: number;
}

interface Props {
  onSubmit?: (data: TransaksiForm) => void;
}

export default function TransaksiPembelian({ onSubmit }: Props) {
  const [form, setForm] = useState<TransaksiForm>({
    nama: "",
    event: "",
    jumlah: 1,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
  };

  return (
    <form
      className="border p-4 rounded-lg shadow-md w-full max-w-md"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold mb-4">Transaksi Pembelian Tiket</h2>

      <label className="block mb-2">Nama Pembeli</label>
      <input
        type="text"
        name="nama"
        className="border p-2 w-full rounded"
        onChange={handleChange}
        required
      />

      <label className="block mt-3 mb-2">Nama Event</label>
      <input
        type="text"
        name="event"
        className="border p-2 w-full rounded"
        onChange={handleChange}
        required
      />

      <label className="block mt-3 mb-2">Jumlah Tiket</label>
      <input
        type="number"
        name="jumlah"
        min={1}
        className="border p-2 w-full rounded"
        onChange={handleChange}
      />

      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
      >
        Beli Tiket
      </button>
    </form>
  );
}
