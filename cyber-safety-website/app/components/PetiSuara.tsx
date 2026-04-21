"use client";

import { useState } from "react";

export default function PetiSuara() {
  const [question, setQuestion] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      title: "Macam mana kalau orang ugut saya di game?",
      content: "Jangan balas. Simpan bukti dan laporkan kepada platform atau orang dewasa yang dipercayai.",
    },
    {
      title: "Kawan share gambar saya tanpa izin",
      content: "Minta mereka padam. Jika tidak, report kepada platform dan maklumkan kepada guru/ibu bapa.",
    },
    {
      title: "Ada orang stalk akaun saya",
      content: "Set account private, block pengguna tersebut dan jangan kongsi maklumat peribadi.",
    },
    {
      title: "Terlanjur hantar gambar peribadi",
      content: "Jangan panik. Stop komunikasi, simpan bukti dan laporkan segera kepada pihak berkuasa.",
    },
    {
      title: "Macam mana nak tahu orang tu scam?",
      content: "Periksa URL, elak klik link rawak, dan jangan kongsi OTP atau password.",
    },
  ];

  const handleSubmit = () => {
    if (!question.trim()) {
      alert("Sila isi soalan dulu!");
      return;
    }

    // 👉 nanti boleh connect Firebase
    console.log("Soalan dihantar:", question);
    alert("Soalan dihantar secara anonim! ✅");
    setQuestion("");
  };

  return (
    <section className="bg-[#0b3d2e] text-white px-8 py-20">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-block bg-yellow-600/20 text-yellow-400 px-4 py-1 rounded-full text-sm mb-4">
            PETI SUARA RAHSIA
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ada Soalan Peribadi? 🔒
          </h2>

          <p className="text-gray-300 max-w-2xl mx-auto">
            Tanya soalan secara anonim. Semua soalan adalah 
            <span className="text-yellow-400 font-semibold"> 100% tanpa nama</span>.
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* LEFT - FORM */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

            <h3 className="font-semibold mb-2">Hantar Soalan Kamu</h3>
            <p className="text-sm text-gray-400 mb-4">
              Tanpa nama • Selamat • Sulit
            </p>

            <textarea
              placeholder="Contoh: Macam mana kalau orang ugut saya di game?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full h-32 bg-transparent border border-white/20 rounded-xl p-4 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />

            {/* SUGGESTIONS */}
            <div className="flex flex-wrap gap-2 mb-4 text-xs">
              {[
                "Orang ugut saya",
                "Kawan buli saya",
                "Scam online",
                "Privacy issue",
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => setQuestion(item)}
                  className="bg-green-800 px-3 py-1 rounded-full"
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-yellow-500 text-black py-3 rounded-full font-semibold hover:bg-yellow-400 transition"
            >
              ✉ Hantar Soalan (Tanpa Nama)
            </button>

            {/* EMERGENCY */}
            <div className="mt-6 bg-red-900/40 border border-red-500 rounded-xl p-4 text-sm">
              <p className="font-semibold mb-2">🚨 Dalam Kecemasan?</p>
              <p>Talian Kasih: 15999</p>
              <p>Befrienders KL: 03-7627 2929</p>
              <p>Polis: 999</p>
            </div>

          </div>

          {/* RIGHT - FAQ */}
          <div>
            <h3 className="font-semibold mb-4">
              💬 Soalan Lazim dari Pelajar Lain
            </h3>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="border border-white/20 rounded-xl p-4 cursor-pointer"
                  onClick={() =>
                    setOpenIndex(openIndex === i ? null : i)
                  }
                >
                  <div className="flex justify-between items-center">
                    <p>{faq.title}</p>
                    <span>{openIndex === i ? "−" : "+"}</span>
                  </div>

                  {openIndex === i && (
                    <p className="text-sm text-gray-300 mt-3">
                      {faq.content}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}