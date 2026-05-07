"use client";

import { useState } from "react";

export default function SurveyC() {
  const [selectedSurvey, setSelectedSurvey] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#f5f1eb] text-[#0b3d2e] p-8">

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-center mb-6">
        Sekolah Kebangsaan (2) Sultan Alam Shah
      </h1>

      <p className="text-center mb-10 max-w-xl mx-auto">
        Sila pilih kategori anda untuk menjawab tinjauan. Semua jawapan adalah
        <span className="font-semibold"> anonim</span> dan hanya mengambil masa beberapa minit sahaja.
      </p>

      {/* BUTTONS */}
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-10 relative z-10">

        <button
          onClick={() => setSelectedSurvey("Pelajar")}
          className="relative z-10 bg-green-700 text-white px-6 py-3 rounded-xl hover:bg-green-800"
        >
          Pelajar
        </button>

        <button
          onClick={() => setSelectedSurvey("Ibu Bapa")}
          className="bg-green-700 text-white px-6 py-3 rounded-xl hover:bg-green-800"
        >
          Ibu Bapa
        </button>

      </div>

      {/* SURVEY DISPLAY */}
      {selectedSurvey && (
  <div className="w-full max-w-4xl mx-auto mt-10 relative z-0">

        {selectedSurvey === "Pelajar" && (
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSd0r7Kg86ovJY4SEJEsOgzhr7YrqxN_YG9fCYsRnpf5JHyyAA/viewform?embedded=true"
            width="100%"
            height="700"
            className="rounded-xl shadow-lg"
          >
            Loading…
          </iframe>
        )}

        {selectedSurvey === "Ibu Bapa" && (
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSe9_GuwV0a8pKvHX5x7IJU8TzLg8_P4evwPt7z5eG6-r6z3ew/viewform?embedded=true"
            width="100%"
            height="700"
            className="rounded-xl shadow-lg"
          >
            Loading…
          </iframe>
        )}

  

      </div>)}

    </main>
  );
}