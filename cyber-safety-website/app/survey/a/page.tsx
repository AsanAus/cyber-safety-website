"use client";

import { useState } from "react";

export default function SurveyA() {
  const [selectedSurvey, setSelectedSurvey] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#f5f1eb] text-[#0b3d2e] p-8">

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-center mb-6">
        Bahagian Tinjauan (Survey) A
      </h1>

      <p className="text-center mb-10 max-w-xl mx-auto">
        Sila pilih kategori anda untuk menjawab tinjauan. Semua jawapan adalah
        <span className="font-semibold"> anonim</span> dan hanya mengambil masa beberapa minit sahaja.
      </p>

      {/* BUTTONS */}
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-10 relative z-10">

        <button
          onClick={() => setSelectedSurvey("parent")}
          className="relative z-10 bg-green-700 text-white px-6 py-3 rounded-xl hover:bg-green-800"
        >
          Ibu Bapa
        </button>

        <button
          onClick={() => setSelectedSurvey("student")}
          className="bg-green-700 text-white px-6 py-3 rounded-xl hover:bg-green-800"
        >
          Pelajar
        </button>

        <button
          onClick={() => setSelectedSurvey("teacher")}
          className="bg-green-700 text-white px-6 py-3 rounded-xl hover:bg-green-800"
        >
          Guru
        </button>

      </div>

      {/* SURVEY DISPLAY */}
      {selectedSurvey && (
  <div className="w-full max-w-4xl mx-auto mt-10 relative z-0">

        {selectedSurvey === "parent" && (
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSepe3qDlri4vjhVrHtldxQ4Y4ZFwk4OG--hZzsgNpxBOYlWdg/viewform?embedded=true"
            width="100%"
            height="700"
            className="rounded-xl shadow-lg"
          >
            Loading…
          </iframe>
        )}

        {selectedSurvey === "student" && (
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdlcYhC17fVrVPT5EGrSUm1mKQCy8Su62S0phQxiPbDI_9sew/viewform?embedded=true"
            width="100%"
            height="700"
            className="rounded-xl shadow-lg"
          >
            Loading…
          </iframe>
        )}

        {selectedSurvey === "teacher" && (
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScwXBn_cjmSGLkneqE4DMuhK2xl5Kzzq4Fn420CU3W16ZE4Iw/viewform?embedded=true"
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