"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/libs/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function Wirapenjahat() {
  const [activeTab, setActiveTab] = useState("wira");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const [wira, setWira] = useState<any[]>([]);
  const [jahat, setJahat] = useState<any[]>([]);

  useEffect(() => {
    const unsubWira = onSnapshot(collection(db, "AiWira"), (snap) => {
      setWira(snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })));
    });

    const unsubJahat = onSnapshot(collection(db, "AiJahat"), (snap) => {
      setJahat(snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })));
    });

    return () => {
      unsubWira();
      unsubJahat();
    };
  }, []);


const currentFeatures = activeTab === "jahat" ? jahat : wira;

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
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* LEFT Content */}
          <div className="flex flex-col items-center w-full max-w-xl mx-auto space-y-3">
            {/* TOGGLE BUTTON */}
            <div className="w-full">
              <div className="relative bg-gray-200 rounded-full p-1 flex w-full">
                {/* SLIDING BACKGROUND */}
                <div
                  className={`absolute top-1 bottom-1 w-1/2 rounded-full transition-all duration-300 ${
                    activeTab === "wira"
                      ? "left-1 bg-green-600"
                      : "left-1/2 bg-red-600"
                  }`}
                />

                {/* Button AI WIRA */}
                <button
                  onClick={() => {
                    setActiveTab("wira");
                    setActiveIndex(null);
                  }}
                  className={`w-1/2 py-2 text-sm font-bold z-10 transition-colors ${
                    activeTab === "wira" ? "text-white" : "text-gray-700"
                  }`}
                >
                  🤖 AI Wira
                </button>

                {/* Button AI JAHAT */}
                <button
                  onClick={() => {
                    setActiveTab("jahat");
                    setActiveIndex(null);
                  }}
                  className={`w-1/2 py-2 text-sm font-bold z-10 transition-colors ${
                    activeTab === "jahat" ? "text-white" : "text-gray-700"
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
          <div className="space-y-4 mt-12 md:mt-10">
            <div
              className={`text-white rounded-2xl p-6 shadow-lg ${
                activeTab === "jahat"
                  ? "bg-linear-to-b from-red-700 to-red-900"
                  : "bg-linear-to-b from-green-600 to-green-800"
              }`}
            >
              {/* TITLE SECTION */}
              <div className="mb-4">
                {activeTab === "wira" ? (
                  <>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      🦸‍♂️ AI Wira — Membantu Kamu!
                    </h3>
                    <p className="text-sm text-green-100">
                      Bila guna dengan betul, AI adalah kawan terbaik kamu
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      😈 AI Jahat — Bahaya!
                    </h3>
                    <p className="text-sm text-red-100">
                      Orang jahat boleh salah guna AI untuk menipu kamu
                    </p>
                  </>
                )}
              </div>
              <div className="space-y-3">
                {currentFeatures.map((item, index) => (
                  <div
                    key={index}
                    className={`rounded-lg p-4 cursor-pointer transition-all ${
                      activeTab === "jahat"
                        ? "bg-red-600/40"
                        : "bg-green-600/40"
                    }`}
                    onClick={() =>
                      setActiveIndex(activeIndex === index ? null : index)
                    }
                  >
                    <div className="flex justify-between items-center">
                      <p className="font-medium">{item.topic}</p>
                      <span className="text-sm">
                        {activeIndex === index ? "▲" : "▼"}
                      </span>
                    </div>

                    {/* DROPDOWN */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        activeIndex === index ? "max-h-40 mt-2" : "max-h-0"
                      }`}
                    >
                      <p
                        className={`text-sm ${
                          activeTab === "jahat"
                            ? "text-red-100"
                            : "text-green-100"
                        }`}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* NOTE BOX */}
            <div className="border border-dashed border-orange-300 bg-orange-50 rounded-xl p-4 text-sm text-gray-700">
              💡 <span className="font-semibold">Ingat ni:</span>{" "}
              {activeTab === "jahat"
                ? "AI ni memang hebat, tapi kalau silap guna, boleh jadi bahaya."
                : "Gunakan AI dengan bijak untuk manfaatkan kehidupan harian!"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
