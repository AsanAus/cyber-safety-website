"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/libs/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { title } from "process";

export default function AIWIRAJAHATADMIN() {
  const [tips, setTips] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"wira" | "jahat">("wira");

  const [topic, setTopic] = useState("");
  const [desc, setDesc] = useState("");

  const [editingItem, setEditingItem] = useState<any>(null);

  const collectionName = activeTab === "wira" ? "AiWira" : "AiJahat";

  // 🔥 READ (based on tab)
  useEffect(() => {
    const q = query(
      collection(db, activeTab === "wira" ? "AiWira" : "AiJahat"),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTips(data);
    });

    return () => unsubscribe();
  }, [activeTab]); // ⭐ re-run when tab changes

  // ➕ CREATE
  const handleAdd = async () => {
    if (!topic || !desc) return;

    await addDoc(collection(db, collectionName), {
      topic,
      desc: desc,
      createdAt: serverTimestamp(),
    });

    setTopic("");
    setDesc("");
  };

  // ❌ DELETE
  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, collectionName, id));
  };

  // ✏️ UPDATE
  const handleUpdate = async () => {
    if (!editingItem) return;

    await updateDoc(doc(db, collectionName, editingItem.id), {
      topic: editingItem.topic,
      desc: editingItem.desc,
    });

    setEditingItem(null);
  };

  return (
    <div className="bg-slate-100 min-h-screen">
   <section className="max-w-5xl mx-auto py-10 px-4 space-y-8">
  {/* SECTION TITLE */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-700">AI: Wira atau Penjahat?</h2>
          <div className="h-px bg-gray-300 flex-1 ml-4"></div>
        </div>

  {/* FORM CARD */}
  <div className="bg-white border border-gray-800 rounded-xl p-6 shadow-md space-y-6">

    {/* 🔥 TABS */}
    <div className="flex gap-2 bg-gray-800 p-1 rounded-lg w-fit">
      <button
        onClick={() => setActiveTab("wira")}
        className={`px-4 py-2 rounded-md text-sm font-medium transition ${
          activeTab === "wira"
            ? "bg-blue-500 text-white shadow"
            : "text-gray-400 hover:text-white"
        }`}
      >
        AI Wira
      </button>

      <button
        onClick={() => setActiveTab("jahat")}
        className={`px-4 py-2 rounded-md text-sm font-medium transition ${
          activeTab === "jahat"
            ? "bg-red-500 text-white shadow"
            : "text-gray-400 hover:text-white"
        }`}
      >
        AI Jahat
      </button>
    </div>

    {/* ➕ ADD FORM */}
    <div className="space-y-3">
      <input
        className="w-full bg-white border border-gray-700 rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <textarea
        className="w-full bg-white border border-gray-700 rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <button
        onClick={handleAdd}
        className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-medium transition shadow-sm"
      >
        + Add {activeTab}
      </button>
    </div>
  </div>

  {/* 📋 LIST */}
  <div className="space-y-4">
    {tips.map((item) => (
      <div
        key={item.id}
        className="bg-white border border-gray-800 rounded-xl p-5 hover:shadow-lg transition"
      >
        {editingItem?.id === item.id ? (
          <>
            <input
              className="w-full bg-white border border-gray-700 rounded-lg px-3 py-2 mb-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editingItem.topic}
              onChange={(e) =>
                setEditingItem({
                  ...editingItem,
                  topic: e.target.value,
                })
              }
            />

            <textarea
              className="w-full bg-white border border-gray-700 rounded-lg px-3 py-2 mb-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editingItem.desc}
              onChange={(e) =>
                setEditingItem({
                  ...editingItem,
                  desc: e.target.value,
                })
              }
            />

            <div className="flex gap-2">
              <button
                onClick={handleUpdate}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg"
              >
                Save
              </button>

              <button
                onClick={() => setEditingItem(null)}
                className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-4 py-1.5 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="font-semibold text-lg text-gray-800">
              {item.topic}
            </h3>

            <p className="text-gray-400 mt-1">
              {item.desc}
            </p>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setEditingItem(item)}
                className="text-sm text-yellow-400 hover:text-yellow-300 font-medium"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="text-sm text-red-400 hover:text-red-300 font-medium"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    ))}
  </div>
</section>
</div>
  );
}
