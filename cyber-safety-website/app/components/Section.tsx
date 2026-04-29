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

  useEffect(() => {
  const unsubscribe = onSnapshot(query(collection(db, "sections"), orderBy("createdAt", "asc")), async (snap) => {
    
    const temp = await Promise.all(
      snap.docs.map(async (s) => {
        const sectionData: any = {
          id: s.id,
          ...s.data(),
        };

        const topicSnap = await getDocs(
          collection(db, "sections", s.id, "topics")
        );

        const topics = topicSnap.docs.map((t) => ({
          id: t.id,
          ...t.data(),
        }));

        return {
          ...sectionData,
          topics,
        };
      })
    );

    setSections(temp);
  });

  return () => unsubscribe();
}, []);

  return (
    <div className="max-w-6xl mx-auto">
      {sections.map((section) => (
        <div key={section.id} className="pb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{section.title}</h2>

          <div className="space-y-3">
            {section.topics?.map((topic: any, index: number) => (
              <div key={index} className="bg-white p-4 rounded-xl border shadow-sm">
                <h4 className="font-semibold">{topic.topic}</h4>
                <p className="text-s text-gray-600 pt-1">{topic.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
