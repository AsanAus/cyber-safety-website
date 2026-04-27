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
    <section className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Admin AI Wira & Jahat</h1>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8 shadow-lg">
        {/* 🔥 TABS */}
        <div className="flex gap-2 mb-6 bg-gray-900 p-2 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab("wira")}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === "wira"
                ? "bg-blue-500 text-white shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
          >
            AI Wira
          </button>

          <button
            onClick={() => setActiveTab("jahat")}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === "jahat"
                ? "bg-red-500 text-white shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
          >
            AI Jahat
          </button>
        </div>

        {/* ➕ ADD */}
        <div className="mb-6 space-y-2">
          <input
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <textarea
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button
            onClick={handleAdd}
            className="bg-green-500 text-white px-4 py-2"
          >
            Add {activeTab}
          </button>
        </div>
      </div>

      {/* 📋 LIST */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300">
        {tips.map((item) => (
          <div key={item.id} className="border p-4 rounded">
            {editingItem?.id === item.id ? (
              <>
                <input
                  className="border p-2 w-full mb-2"
                  value={editingItem.topic}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      topic: e.target.value,
                    })
                  }
                />
                <textarea
                  className="border p-2 w-full mb-2"
                  value={editingItem.desc}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      desc: e.target.value,
                    })
                  }
                />
                <button
                  onClick={handleUpdate}
                  className="bg-green-500 text-white px-3 py-1 mr-2"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <h3 className="font-bold">{item.topic}</h3>
                <p>{item.desc}</p>

                <button
                  onClick={() => setEditingItem(item)}
                  className="bg-yellow-500 px-3 py-1 mr-2"
                >
                  Edit
                </button>
              </>
            )}

            <button
              onClick={() => handleDelete(item.id)}
              className="bg-red-500 text-white px-3 py-1"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
