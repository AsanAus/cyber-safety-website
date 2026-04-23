"use client";
import { useState } from "react";

export default function Wirapenjahat() {
  const [mode, setMode] = useState("wira"); // "wira" or "jahat"

  return (
    <section className="bg-[#f5f1eb] text-[#0b3d2e] px-8 py-20 pb-50">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            🤖 AI: Wira atau Penjahat?
          </h2>
          <p className="text-gray-600">
            AI ni memang hebat, tapi kalau silap guna, boleh jadi bahaya. Jom
            tahu perbezaannya!
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* LEFT Content */}
          <div className="flex flex-col items-center w-full max-w-xl mx-auto space-y-3">
            {/* TOGGLE BUTTON */}
            <div className="w-full">
              <div className="bg-gray-200 rounded-full p-1 flex w-full">
                <button
                  onClick={() => setMode("wira")}
                  className={`flex-1 py-2 rounded-full text-sm font-semibold transition ${
                    mode === "wira" ? "bg-white shadow" : "text-gray-500"
                  }`}
                >
                  🧑 AI Wira
                </button>

                <button
                  onClick={() => setMode("jahat")}
                  className={`flex-1 py-2 rounded-full text-sm font-semibold transition ${
                    mode === "jahat" ? "bg-red-500 text-white" : "text-gray-500"
                  }`}
                >
                  😈 AI Jahat
                </button>
              </div>
            </div>

            {/* IMAGE */}
            <img
              src="/ai-wira-jahat.png"
              alt="AI Wira vs Jahat"
              className="w-full rounded-xl shadow-md object-cover"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="space-y-4">
            <div
              className={`text-white rounded-2xl p-6 shadow-lg ${
                mode === "jahat"
                  ? "bg-linear-to-b from-red-700 to-red-900"
                  : "bg-linear-to-b from-green-600 to-green-800"
              }`}
            >
              <h3 className="font-semibold text-lg mb-2">
                {mode === "jahat"
                  ? "😈 AI Jahat — Bahaya!"
                  : "🧑 AI Wira — Hebat!"}
              </h3>

              <p
                className={`text-sm mb-4 ${
                  mode === "jahat" ? "text-red-200" : "text-green-200"
                }`}
              >
                {mode === "jahat"
                  ? "Orang jahat boleh salah guna AI untuk menipu kamu"
                  : "AI boleh bantu kehidupan jadi lebih mudah dan selamat"}
              </p>

              <ul className="space-y-3 text-sm">
                {mode === "jahat" ? (
                  <>
                    <li className="flex justify-between items-center bg-white/10 px-4 py-2 rounded-lg">
                      Deepfake — video palsu muka orang <span>⚠️</span>
                    </li>
                    <li className="flex justify-between items-center bg-white/10 px-4 py-2 rounded-lg">
                      Fitnah Digital — sebarkan pembohongan <span>⚠️</span>
                    </li>
                    <li className="flex justify-between items-center bg-white/10 px-4 py-2 rounded-lg">
                      Curi data peribadi kamu <span>⚠️</span>
                    </li>
                    <li className="flex justify-between items-center bg-white/10 px-4 py-2 rounded-lg">
                      Tipu orang dengan suara palsu <span>⚠️</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex justify-between items-center bg-white/10 px-4 py-2 rounded-lg">
                      Bantu belajar dengan cepat 📚
                    </li>
                    <li className="flex justify-between items-center bg-white/10 px-4 py-2 rounded-lg">
                      Jana idea kreatif 💡
                    </li>
                    <li className="flex justify-between items-center bg-white/10 px-4 py-2 rounded-lg">
                      Automasi kerja harian ⚙️
                    </li>
                    <li className="flex justify-between items-center bg-white/10 px-4 py-2 rounded-lg">
                      Tingkatkan produktiviti 🚀
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* NOTE BOX */}
            <div className="border border-dashed border-orange-300 bg-orange-50 rounded-xl p-4 text-sm text-gray-700">
              💡 <span className="font-semibold">Ingat ni:</span>{" "}
              {mode === "jahat"
                ? "AI ni memang hebat, tapi kalau silap guna, boleh jadi bahaya."
                : "Gunakan AI dengan bijak untuk manfaatkan kehidupan harian!"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
