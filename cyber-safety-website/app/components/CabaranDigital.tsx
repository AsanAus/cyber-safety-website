"use client";

import { useState, useEffect } from "react";
import MiniGame from "./MiniGame";
import Leaderboard from "./Leaderboard";
import { db } from "@/app/libs/firebase";
import { onSnapshot, doc } from "firebase/firestore";
import LottieAnim from "./LottieAnim";
import * as animationData from "../../animations/game.json";

export default function CabaranDigital() {
  const [name, setName] = useState("");
  const [kelas, setKelas] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [quizVisible, setQuizVisible] = useState(false);
  const [quizDone, setQuizDone] = useState(false);
  const [activeTab, setActiveTab] = useState<"quiz" | "leaderboard">("quiz");
  const [activeSet, setActiveSet] = useState<string | null>(null);
  const [loadingSet, setLoadingSet] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "Question Set", "Active Set"), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        const val = data.Set ?? data.activeSet ?? "Sample Set";
        setActiveSet(val || null);
      } else {
        setActiveSet(null);
      }
      setLoadingSet(false);
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
    setQuizVisible(false);
  };

  const backToQuiz = () => {
    setActiveTab("quiz");
    setQuizVisible(false);
    setQuizDone(false);
    setName("");
    setKelas("");
    setShowErrorPopup(false);
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // or "auto" if you want instant
    });
  };

  // No active set — show maintenance screen
  const NoActiveSet = () => (
    <div className="max-w-md mx-auto text-center py-20">
      <div className="text-6xl mb-6">🔧</div>
      <h2 className="text-2xl font-bold text-[#0b3d2e] mb-3">
        Kuiz Tidak Tersedia
      </h2>
      <p className="text-gray-500 text-sm leading-relaxed">
        Tiada set soalan aktif buat masa ini. Sila tunggu sebentar atau hubungi
        pentadbir untuk maklumat lanjut.
      </p>
    </div>
  );

  return (
    <section className="bg-[#f5f1eb] text-[#0b3d2e] px-4 md:px-8 py-16 min-h-screen">
      {/* Loading */}
      {loadingSet && (
        <div className="flex flex-col items-center justify-center py-32 gap-4 text-gray-400">
          <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
          <p className="text-sm">Memuatkan...</p>
        </div>
      )}

      {/* No active set */}
      {!loadingSet && !activeSet && <NoActiveSet />}

      {/* Main content */}
      {!loadingSet && activeSet && (
        <>
          {/* Entry form */}
          {!quizVisible && activeTab === "quiz" && (
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-sm mb-4 font-semibold">
                CABARAN DIGITAL
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Uji Ilmu Siber Kamu!
              </h2>
              <p className="text-gray-600 mb-10">
                Situasi sebenar yang mungkin kamu hadapi. Pilih jawapan yang
                betul dan bersaing untuk menjadi{" "}
                <span className="font-semibold">Wira Digital</span>!
              </p>

              <div className="bg-white rounded-2xl shadow-md p-10 max-w-xl mx-auto">
                <div className="w-40 mx-auto">
                  <LottieAnim animationData={animationData} />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Masukkan Nama Kamu
                </h3>
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
                  className="w-full bg-green-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-800 transition mb-3"
                >
                  Mula Cabaran!
                </button>

                {/* Redesigned leaderboard button */}
                <button
                  onClick={() => setActiveTab("leaderboard")}
                  className="w-full flex items-center justify-center gap-2 px-8 py-3 rounded-full border border-orange-300 text-orange-500 hover:bg-orange-50 transition font-semibold text-sm"
                >
                  <span>Lihat Papan Mata</span>
                </button>
              </div>
            </div>
          )}

          {/* Quiz */}
          {quizVisible && activeTab === "quiz" && (
            <MiniGame
              name={name}
              kelas={kelas}
              questionSet={activeSet}
              onComplete={handleQuizComplete}
            />
          )}

          {/* Leaderboard */}
          {activeTab === "leaderboard" && (
            <div className="max-w-2xl mx-auto">
              <Leaderboard
                highlightName={quizDone ? name : undefined}
                activeSet={activeSet}
              />

              <div className="text-center mt-8 flex flex-col gap-3 items-center">
                <button
                  onClick={() => {backToQuiz();}}
                  className="bg-green-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-800 transition"
                >
                  Kembali 
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
