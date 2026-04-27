"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/libs/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";

export default function AddSection() {
  const [sections, setSections] = useState<any[]>([]);
  const [newSection, setNewSection] = useState("");

  const [topicInputs, setTopicInputs] = useState<any>({});

  // 🔥 FETCH SECTIONS + TOPICS
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "sections"), async (snap) => {
      const temp: any[] = [];

      for (let s of snap.docs) {
        const sectionData: any = { id: s.id, ...s.data() };

        const topicSnap = await getDocs(
          collection(db, "sections", s.id, "topics")
        );

        sectionData.topics = topicSnap.docs.map((t) => ({
          id: t.id,
          ...t.data(),
        }));

        temp.push(sectionData);
      }

      setSections(temp);
    });

    return () => unsubscribe();
  }, []);

  // ➕ ADD SECTION
  const addSection = async () => {
    if (!newSection.trim()) return;

    await addDoc(collection(db, "sections"), {
      title: newSection,
      createdAt: serverTimestamp(),
    });

    setNewSection("");
  };

  // ❌ DELETE SECTION
  const deleteSection = async (id: string) => {
    await deleteDoc(doc(db, "sections", id));
  };

  // ➕ ADD TOPIC
  const addTopic = async (sectionId: string) => {
    const input = topicInputs[sectionId];
    if (!input?.topic || !input?.desc) return;

    await addDoc(collection(db, "sections", sectionId, "topics"), {
      topic: input.topic,
      desc: input.desc,
    });

    setTopicInputs((prev: any) => ({
      ...prev,
      [sectionId]: { topic: "", desc: ""},
    }));
  };

  // ❌ DELETE TOPIC
  const deleteTopic = async (sectionId: string, topicId: string) => {
    await deleteDoc(doc(db, "sections", sectionId, "topics", topicId));
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      {/* ➕ ADD SECTION */}
      <div className="mb-6 flex gap-3">
        <input
          value={newSection}
          onChange={(e) => setNewSection(e.target.value)}
          placeholder="New Section Title"
          className="px-4 py-2 rounded text-white w-80"
        />
        <button
          onClick={addSection}
          className="bg-green-600 px-4 py-2 rounded"
        >
          Add Section
        </button>
      </div>

      {/* 🔁 SECTIONS */}
      {sections.map((section) => (
        <div key={section.id} className="mb-10 border p-4 rounded-lg">
          
          {/* SECTION TITLE */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <button
              onClick={() => deleteSection(section.id)}
              className="text-red-400"
            >
              Delete
            </button>
          </div>

          {/* ➕ ADD TOPIC */}
          <div className="flex gap-2 mb-4">
            <input
              placeholder="Topic title"
              value={topicInputs[section.id]?.topic|| ""}
              onChange={(e) =>
                setTopicInputs({
                  ...topicInputs,
                  [section.id]: {
                    ...topicInputs[section.id],
                    topic: e.target.value,
                  },
                })
              }
              className="px-2 py-1 rounded text-white"
            />

            <input
              placeholder="Description"
              value={topicInputs[section.id]?.desc || ""}
              onChange={(e) =>
                setTopicInputs({
                  ...topicInputs,
                  [section.id]: {
                    ...topicInputs[section.id],
                    desc: e.target.value,
                  },
                })
              }
              className="px-2 py-1 rounded text-white"
            />


            <button
              onClick={() => addTopic(section.id)}
              className="bg-blue-500 px-3 rounded"
            >
              +
            </button>
          </div>

          {/* 📦 TOPICS */}
          <div className="grid grid-cols-2 gap-3">
            {section.topics?.map((topic: any) => (
              <div
                key={topic.id}
                className="bg-green-800 p-3 rounded flex justify-between"
              >
                <div>
                  <h3 className="font-semibold">{topic.topic}</h3>
                  <p className="text-sm">{topic.desc}</p>
                  <span className="text-xs opacity-70">
                    {topic.level}
                  </span>
                </div>

                <button
                  onClick={() =>
                    deleteTopic(section.id, topic.id)
                  }
                  className="text-red-300"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}