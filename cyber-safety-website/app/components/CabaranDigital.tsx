"use client";

import { useState, useEffect } from "react";
import MiniGame from "./MiniGame";
import Leaderboard from "./Leaderboard";
import { db } from "@/app/libs/firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  doc,
} from "firebase/firestore";

export default function CabaranDigital() {
  const [name, setName] = useState("");
  const [kelas, setKelas] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [quizVisible, setQuizVisible] = useState(false);
  const [quizDone, setQuizDone] = useState(false);
  const [activeTab, setActiveTab] = useState<"quiz" | "leaderboard">("quiz");
  const [activeSet, setActiveSet] = useState<string>("Set A");

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "Question Set", "Active Set"), (snap) => {
      // console.log("Active Set doc exists:", snap.exists());
      // console.log("Active Set data:", snap.data()); 
      if (snap.exists()) {
        const data = snap.data();
        setActiveSet(data.activeSet ?? data["Set"] ?? "Set A");
      }
    });
    return () => unsub();
  }, []);

  const handleStart = () => {
    if (!name.trim() || !kelas.trim()) {
      setShowErrorPopup(true);
      return;
    }
    setQuizVisible(true);
  };

  const handleQuizComplete = () => {
    setQuizDone(true);
    setActiveTab("leaderboard");
  };

  return (
    <section className="bg-[#f5f1eb] text-[#0b3d2e] px-4 md:px-8 py-16 min-h-screen">
      {/* Entry form */}
      {!quizVisible && activeTab === "quiz" && (
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-sm mb-4 font-semibold">
            CABARAN DIGITAL
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Uji Ilmu Siber Kamu! 🎯
          </h2>
          <p className="text-gray-600 mb-10">
            5 situasi sebenar yang mungkin kamu hadapi. Pilih jawapan yang betul
            dan dapatkan{" "}
            <span className="font-semibold">Lesen Wira Digital</span> kamu!
          </p>

          <div className="bg-white rounded-2xl shadow-md p-10 max-w-xl mx-auto">
            <div className="text-4xl mb-4">🎮</div>
            <h3 className="text-xl font-semibold mb-2">Masukkan Nama Kamu</h3>
            <p className="text-sm text-gray-500 mb-6">
              Nama kamu akan tertera pada Lesen Wira Digital selepas tamat
              cabaran!
            </p>

            <input
              type="text"
              placeholder="Nama kamu..."
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setShowErrorPopup(false);
              }}
              className={`w-full border border-gray-300 rounded-full px-5 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-700 ${!name && showErrorPopup ? "border-red-500 border-2" : ""}`}
            />
            <input
              type="text"
              placeholder="Kelas kamu..."
              value={kelas}
              onChange={(e) => {
                setKelas(e.target.value);
                setShowErrorPopup(false);
              }}
              className={`w-full border border-gray-300 rounded-full px-5 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-green-700 ${!kelas && showErrorPopup ? "border-red-500 border-2" : ""}`}
            />

            {showErrorPopup && (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded-xl mb-4 text-sm">
                Sila isi nama dan kelas sebelum memulakan cabaran.
              </div>
            )}

            <button
              onClick={handleStart}
              className="bg-green-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-800 transition"
            >
              Mula Cabaran! 🚀
            </button>

            {/* Teaser to view leaderboard before playing */}
            <button
              onClick={() => setActiveTab("leaderboard")}
              className="block mx-auto mt-4 text-sm text-gray-400 hover:text-orange-500 transition underline underline-offset-2"
            >
              Lihat papan mata semasa →
            </button>
          </div>
        </div>
      )}
      {/* Quiz tab */}
      {quizVisible && activeTab === "quiz" && (
        <MiniGame name={name} kelas={kelas} questionSet={activeSet} />
      )}
      {/* Leaderboard tab */}
      {activeTab === "leaderboard" && (
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-semibold tracking-wider mb-3">
              PAPAN MATA
            </div>
            <h2 className="text-3xl font-bold text-[#0b3d2e]">
              Wira Digital 🏆
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Top 10 peserta terbaik — skor tertinggi, masa terpantas.
            </p>
          </div>

          <Leaderboard
            highlightName={quizDone ? name : undefined}
            activeSet={activeSet}
          />

          {/* Back to quiz CTA */}
          {!quizVisible && (
            <div className="text-center mt-8">
              <button
                onClick={() => setActiveTab("quiz")}
                className="bg-green-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-800 transition"
              >
                Mula Cabaran! 🚀
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
