"use client";

import { useState } from "react";

const questions = [
  {
    text: "Minum air sejuk selepas makan boleh sebabkan kanser.",
    answer: false,
  },
  {
    text: "Semua berita di internet adalah benar.",
    answer: false,
  },
  {
    text: "Password kuat perlu ada huruf, nombor dan simbol.",
    answer: true,
  },
  {
    text: "Kongsi maklumat peribadi online adalah selamat.",
    answer: false,
  },
  {
    text: "AI boleh digunakan untuk bantu pembelajaran.",
    answer: true,
  },
  {
    text: "Klik link rawak dari email adalah selamat.",
    answer: false,
  },
];

export default function MiniGame() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (choice: boolean) => {
    if (choice === questions[current].answer) {
      setScore(score + 1);
    }

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      alert(`Game tamat! Skor anda: ${score + (choice === questions[current].answer ? 1 : 0)}/${questions.length}`);
    }
  };

  return (
    <section className="bg-[#f5f1eb] text-[#0b3d2e] px-8 py-20">
      <div className="max-w-3xl mx-auto text-center">

        {/* BADGE */}
        <div className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-sm mb-4 font-semibold">
          MINI GAME
        </div>

        {/* TITLE */}
        <h2 className="text-3xl font-bold mb-4">
          FAKTA atau AUTA? 🎲
        </h2>

        <p className="text-gray-600 mb-6">
          Baca setiap tajuk dan tentukan sama ada ia benar atau palsu.
        </p>

        {/* PROGRESS */}
        <div className="flex justify-between items-center mb-6 text-sm">
          <span className="bg-green-700 text-white px-3 py-1 rounded-full">
            {current + 1}
          </span>
          <span>daripada {questions.length} kad</span>
          <span className="font-semibold">
            Skor: {score}/{questions.length}
          </span>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-2xl p-10 shadow-md mb-6">

          <div className="text-4xl mb-4">🥤</div>

          <p className="text-lg font-semibold mb-8">
            "{questions[current].text}"
          </p>

          {/* BUTTONS */}
          <div className="flex gap-4 justify-center">

            {/* FAKTA */}
            <button
              onClick={() => handleAnswer(true)}
              className="bg-green-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-800 transition"
            >
              ✔ FAKTA
            </button>

            {/* AUTA */}
            <button
              onClick={() => handleAnswer(false)}
              className="bg-red-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-600 transition"
            >
              ✖ AUTA
            </button>

          </div>
        </div>

        {/* DOT INDICATOR */}
        <div className="flex justify-center gap-2">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === current ? "bg-orange-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}