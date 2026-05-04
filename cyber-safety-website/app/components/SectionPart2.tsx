"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/libs/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

export default function SectionPart2() {
  const [sections, setSections] = useState<any[]>([]);
  const [openSection, setOpenSection] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "sections_part2"), orderBy("createdAt", "asc")),
      (snap) => {
        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSections(data);
      },
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
      {sections.map((section) => {
        const isOpen = openSection === section.id;

        return (
          <div key={section.id}>
            {/* 🔥 Section Header (Clickable) */}
            <div
              onClick={() => setOpenSection(isOpen ? null : section.id)}
              className={`relative cursor-pointer rounded-2xl px-6 py-5 
  flex items-center justify-center
  backdrop-blur-md border transition-all duration-300
  ${
    isOpen
      ? "bg-linear-to-r from-green-500/90 to-green-700/90 text-white shadow-lg shadow-green-500/20"
      : "bg-white/70 border-green-200 hover:bg-green-50 hover:shadow-md"
  }`}
            >
              {/* 🎯 Centered Title */}
              <h2 className="text-lg md:text-xl font-semibold tracking-wide text-center">
                {section.title}
              </h2>

              {/* 🔽 Arrow (absolute right) */}
              <span
                className={`absolute right-6 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </div>

            {/* 🔥 Expand Content */}
            <div
              className={`overflow-hidden transition-all duration-500 ${
                isOpen ? "max-h-250 mt-5" : "max-h-0"
              }`}
            >
              <div className="grid md:grid-cols-2 gap-5">
                {section.descriptions?.map((desc: string, index: number) => (
                  <div
                    key={index}
                    className="relative rounded-xl p-5 
                                bg-linear-to-br from-green-600 to-[#0d6408]
                                border border-white/5
                             hover:border-green-400/30
                                transition-all duration-300
                                hover:-translate-y-1 hover:shadow-lg hover:shadow-green-500/10"
                  >
                    {/* 🔢 Number (clean top-right instead) */}
                    <div className="absolute top-3 right-3 text-xs text-orange-400 font-semibold">
                      {index + 1}
                    </div>

                    <p className="text-white text-sm leading-relaxed pr-6">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
