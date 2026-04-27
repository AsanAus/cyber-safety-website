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
  const unsubscribe = onSnapshot(collection(db, "sections"), async (snap) => {
    
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
    <div className="space-y-8 mt-16">
      {sections.map((section) => (
        <div key={section.id}>
          <h2 className="text-xl font-bold mb-4">{section.title}</h2>

          <div className="space-y-3">
            {section.topics?.map((topic: any, index: number) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-semibold text-sm">{topic.topic}</h4>
                <p className="text-xs text-gray-600">{topic.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
