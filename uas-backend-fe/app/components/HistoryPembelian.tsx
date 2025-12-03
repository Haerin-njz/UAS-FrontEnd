import React from "react";

interface HistoryItem {
  kode: string;
  event: string;
  tanggal: string;
  harga: number;
}

interface Props {
  items: HistoryItem[];
}

export default function HistoryPembelian({ items }: Props) {
  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-bold mb-4">Riwayat Pembelian</h2>

      <div className="space-y-3">
        {items && items.length > 0 ? (
          items.map((item: HistoryItem, i: number) => (
            <div key={i} className="border p-3 rounded-lg shadow-sm">
              <p>
                <strong>Kode Tiket:</strong> {item.kode}
              </p>
              <p>
                <strong>Acara:</strong> {item.event}
              </p>
              <p>
                <strong>Tanggal:</strong> {item.tanggal}
              </p>
              <p>
                <strong>Harga:</strong> Rp{item.harga}
              </p>
            </div>
          ))
        ) : (
          <p>Tidak ada riwayat pembelian.</p>
        )}
      </div>
    </div>
  );
}
