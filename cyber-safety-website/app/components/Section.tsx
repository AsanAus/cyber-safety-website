"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/libs/firebase";
import {
  collection,
  onSnapshot,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

export default function Section() {
  const [sections, setSections] = useState<any[]>([]);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "sections"), orderBy("createdAt", "asc")),
      (snap) => {
        const temp: any[] = [];

        snap.docs.forEach((s) => {
          const sectionData: any = {
            id: s.id,
            ...s.data(),
            topics: [],
          };

          // 🔥 REALTIME topics listener
          onSnapshot(
            collection(db, "sections", s.id, "topics"),
            (topicSnap) => {
              sectionData.topics = topicSnap.docs.map((t) => ({
                id: t.id,
                ...t.data(),
              }));

              // Update state after topics load
              setSections((prev) => {
                const others = prev.filter((sec) => sec.id !== s.id);
                return [...others, sectionData];
              });
            },
          );

          temp.push(sectionData);
        });

        setSections(temp);
      },
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
      {sections.map((section) => (
        <div key={section.id}>
          {/* 🔥 Section Title */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              {section.title}
            </h2>
          </div>

          {/* 🔥 Topics */}
          <div className="grid md:grid-cols-2 gap-5">
            {section.topics?.map((topic: any) => {
              const isOpen = activeTopic === topic.id;

              return (
                <div
                  key={topic.id}
                  onClick={() => setActiveTopic(isOpen ? null : topic.id)}
                  className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 
              ${
                isOpen
                  ? "bg-linear-to-br from-green-600 to-green-800 text-white shadow-xl scale-[1.02]"
                  : "bg-white hover:shadow-lg hover:-translate-y-1"
              }`}
                >
                  {/* 🔥 Title */}
                  <div className="flex justify-between items-center">
                    <h4
                      className={`font-medium text-lg ${
                        isOpen ? "text-white" : "text-gray-400"
                      }`}
                    >
                      {topic.topic}
                    </h4>

                    <span className="text-sm">{isOpen ? "▲" : "▼"}</span>
                  </div>

                  {/* 🔥 Expand Content */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-40 mt-3" : "max-h-0"
                    }`}
                  >
                    <p
                      className={`text-sm ${
                        isOpen ? "text-white/90" : "text-gray-600"
                      }`}
                    >
                      {topic.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
