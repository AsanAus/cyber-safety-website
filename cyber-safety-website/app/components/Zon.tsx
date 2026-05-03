"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/libs/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import Section from "./Section";
import SectionPart2 from "./SectionPart2";

export default function Zon() {
  const [tips, setTips] = useState<any[]>([]);

  const firstTip = tips[0];
  const remainingTips = tips?.slice(1) || [];

  useEffect(() => {
    // ✅ OLDEST FIRST (top = first tip)
    const q = query(collection(db, "tips"), orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: any[] = [];

      snapshot.docs.forEach((doc, index) => {
        data.push({
          id: doc.id,
          no: String(index + 1).padStart(2, "0"),
          ...doc.data(),
        });
      });

      setTips(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section
      id="zonpelajar"
      className="bg-[#f5f1eb] text-[#0b3d2e] px-8 py-20 pb-5"
    >
      <div className="max-w-6xl mx-auto">
        {/* ================= HEADER ================= */}
        <div className="text-center mb-12">
          <div className="inline-block bg-green-800 text-white px-4 py-1 rounded-full text-sm mb-4">
            ZON PELAJAR
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Belajar Sambil Seronok! 🎮
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Jom kita tengok macam mana nak jadi hebat di internet! Tiada kuliah
            membosankan — hanya tutorial pendek, permainan, dan cabaran seru!
          </p>
        </div>

        {/* ================= TOP CONTENT ================= */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
          {/* IMAGE */}
          <div className="rounded-2xl overflow-hidden shadow-md">
            <img
              src="/zone-pelajar.png"
              alt="Zon Pelajar"
              className="w-full h-full object-cover"
            />
          </div>

          {/* CONTENT */}
          <div className="space-y-4">
            {firstTip && (
              <div className="bg-white rounded-xl p-4 border shadow-sm">
                <p className="font-semibold text-sm mb-1">{firstTip.title}</p>
                <p className="text-sm text-gray-600">{firstTip.desc}</p>
              </div>
            )}

            {/* TIPS */}
            <div className="grid grid-cols-2 gap-4">
              {remainingTips.map((tip, i) => (
                <div
                  key={tip.id} // ✅ IMPORTANT FIX
                  className="bg-white p-4 rounded-xl border shadow-sm"
                >
                  <p className="text-xs text-orange-500 font-semibold">
                    0{i+1} 
                  </p>
                  <h4 className="font-semibold text-sm">{tip.title}</h4>
                  <p className="text-xs text-gray-500">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Section />

      <SectionPart2 />
    </section>
  );
}
