"use client";

import { useState } from "react";

export default function CabaranDigital() {
  const [name, setName] = useState("");

  const handleStart = () => {
    if (!name.trim()) {
      alert("Sila masukkan nama dulu!");
      return;
    }

    // 👉 nanti kita sambung dengan quiz page / Firebase
    console.log("Start quiz for:", name);
  };

  return (
    <section className="bg-[#f5f1eb] text-[#0b3d2e] px-8 py-20">
      <div className="max-w-4xl mx-auto text-center">

        {/* BADGE */}
        <div className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-sm mb-4 font-semibold">
          CABARAN DIGITAL
        </div>

        {/* TITLE */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Uji Ilmu Siber Kamu! 🎯
        </h2>

        {/* DESCRIPTION */}
        <p className="text-gray-600 mb-10">
          5 situasi sebenar yang mungkin kamu hadapi. Pilih jawapan yang betul dan
          dapatkan <span className="font-semibold">Lesen Wira Digital</span> kamu!
        </p>

        {/* CARD */}
        <div className="bg-white rounded-2xl shadow-md p-10 max-w-xl mx-auto">

          {/* ICON */}
          <div className="text-4xl mb-4">🎮</div>

          {/* TITLE */}
          <h3 className="text-xl font-semibold mb-2">
            Masukkan Nama Kamu
          </h3>

          <p className="text-sm text-gray-500 mb-6">
            Nama kamu akan tertera pada Lesen Wira Digital selepas tamat cabaran!
          </p>

          {/* INPUT */}
          <input
            type="text"
            placeholder="Nama kamu..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-full px-5 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-green-700"
          />

          {/* BUTTON */}
          <button
            onClick={handleStart}
            className="bg-green-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-800 transition"
          >
            Mula Cabaran! 🚀
          </button>

        </div>

      </div>
    </section>
  );
}