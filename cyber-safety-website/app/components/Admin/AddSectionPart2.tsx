"use client";

import { useState, useEffect } from "react";
import { db } from "@/app/libs/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

type Section = {
  id: string;
  title: string;
  descriptions: string[];
};

export default function AddSectionPart2() {
  const [title, setTitle] = useState("");
  const [descInput, setDescInput] = useState("");
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔥 FETCH DATA (LIKE PART 1)
  const fetchSections = async () => {
    const snapshot = await getDocs(collection(db, "sections_part2"));

    const data: Section[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Section[];

    setSections(data);
  };

  useEffect(() => {
    fetchSections();
  }, []);

  // ➕ Add description
  const handleAddDescription = () => {
    if (!descInput.trim()) return;

    setDescriptions([...descriptions, descInput.trim()]);
    setDescInput("");
  };

  // ❌ Remove description (input list)
  const handleRemoveDesc = (index: number) => {
    setDescriptions(descriptions.filter((_, i) => i !== index));
  };

  // ❌ Delete whole section
  const handleDeleteSection = async (id: string) => {
    await deleteDoc(doc(db, "sections_part2", id));
    fetchSections();
  };

  // 💾 Save
  const handleSubmit = async () => {
    if (!title.trim() || descriptions.length === 0) {
      alert("Please fill title and at least one description");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "sections_part2"), {
        title: title.trim(),
        descriptions,
        createdAt: serverTimestamp(),
      });

      setTitle("");
      setDescriptions([]);
      setDescInput("");

      fetchSections(); // 🔥 refresh list
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="max-w-5xl mx-auto py-10 px-4 space-y-8">

        {/* SECTION TITLE */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-700">Add Section Part 2</h2>
          <div className="h-px bg-gray-300 flex-1 ml-4"></div>
        </div>

        {/* ================= FORM ================= */}
        <div className="bg-white rounded-xl p-6 shadow border">

          {/* TITLE */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Section title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
          </div>

          {/* DESCRIPTION INPUT */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Description"
              value={descInput}
              onChange={(e) => setDescInput(e.target.value)}
              className="flex-1 p-3 border rounded-lg"
            />
            <button
              onClick={handleAddDescription}
              className="px-4 bg-green-600 text-white rounded-lg"
            >
              +
            </button>
          </div>

          {/* TEMP DESCRIPTIONS */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {descriptions.map((desc, i) => (
              <div
                key={i}
                className="relative bg-gray-50 border rounded-lg p-4"
              >
                <button
                  onClick={() => handleRemoveDesc(i)}
                  className="absolute top-2 right-2 text-red-400"
                >
                  ✕
                </button>
                <p className="text-sm text-gray-700">{desc}</p>
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-6 py-2 rounded-lg"
          >
            {loading ? "Saving..." : "Save Section"}
          </button>
        </div>

        {/* ================= DISPLAY (LIKE PART 1) ================= */}
        {sections.map((section) => (
          <div
            key={section.id}
            className="bg-gray-50 border rounded-xl p-6 shadow-sm"
          >
            {/* 🔥 HEADER */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{section.title}</h2>

              <button
                onClick={() => handleDeleteSection(section.id)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </div>

            {/* 🔥 DESCRIPTIONS GRID */}
            <div className="grid md:grid-cols-2 gap-4">
              {section.descriptions.map((desc, index) => (
                <div
                  key={index}
                  className="relative bg-white border rounded-lg p-4"
                >
                  {/* GREEN LEFT BORDER */}
                  <div className="absolute left-0 top-0 h-full w-1 bg-green-500 rounded-l-lg" />

                  <p className="text-sm text-gray-700 pl-2">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
