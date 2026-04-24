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
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin AI Wira & Jahat</h1>

      {/* 🔥 TABS */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("wira")}
          className={`px-4 py-2 rounded ${
            activeTab === "wira" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          AI Wira
        </button>

        <button
          onClick={() => setActiveTab("jahat")}
          className={`px-4 py-2 rounded ${
            activeTab === "jahat" ? "bg-red-500 text-white" : "bg-gray-200"
          }`}
        >
          AI Jahat
        </button>
      </div>

      {/* ➕ ADD */}
      <div className="mb-6 space-y-2">
        <input
          className="border p-2 w-full"
          placeholder="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <textarea
          className="border p-2 w-full"
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

      {/* 📋 LIST */}
      <div className="grid md:grid-cols-2 gap-4">
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
