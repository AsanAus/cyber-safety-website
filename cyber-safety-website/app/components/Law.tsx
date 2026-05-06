"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/libs/firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

export default function Law() {
  const [laws, setLaws] = useState<any[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);

  // 🔁 FETCH DATA (REALTIME)
  useEffect(() => {
    const q = query(collection(db, "laws"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snap) => {
      const temp = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLaws(temp);
    });

    return () => unsubscribe();
  }, []);

  // 🔽 TOGGLE DROPDOWN
  const toggleDropdown = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16">
      {/* ===================== */}
      {/* UNDANG-UNDANG */}
      {/* ===================== */}
      <div>
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          ⚖️ Rujukan Undang-undang Malaysia
        </h3>

        <p className="text-gray-300 mb-6 text-sm">
          Buli Siber dan Penyebaran Berita Palsu adalah JENAYAH SEBENAR di
          Malaysia.
        </p>

        <div className="space-y-4">
          {laws.map((law) => (
            <div key={law.id}>
              {/* 🔹 CARD */}
              <div
                onClick={() => toggleDropdown(law.id)}
                className="cursor-pointer bg-green-900/40 border border-green-700 rounded-xl p-4 flex justify-between items-center hover:bg-green-800/50 transition"
              >
                <div>
                  <p className="font-semibold">{law.topic}</p>
                  <p className="text-xs text-yellow-400">
                    {law.smallDesc}
                  </p>
                </div>

                <span
                  className={`transition-transform ${
                    openId === law.id ? "rotate-180" : ""
                  }`}
                >
                  ⌄
                </span>
              </div>

              {/* 🔽 DROPDOWN CONTENT */}
              {openId === law.id && (
                <div className="bg-green-950/60 border border-green-800 rounded-xl p-4 mt-2 text-sm text-gray-200">
                  {law.longDesc}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}