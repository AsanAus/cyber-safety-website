"use client";

import { useState } from "react";
import { useEffect } from "react";
import { db } from "@/app/libs/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";
import { query, orderBy } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import AIWIRAJAHATADMIN from "@/app/components/Admin/AIWIRAJAHATADMIN";
import AddSection from "@/app/components/Admin/AddSection";
import AddSectionPart2 from "@/app/components/Admin/AddSectionPart2";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const [tips, setTips] = useState<any[]>([]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  useEffect(() => {
    const q = query(collection(db, "tips"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTips(data);
    });

    return () => unsubscribe();
  }, []);

  const handleAdd = async () => {
    if (!title || !desc) return;

    await addDoc(collection(db, "tips"), {
      title,
      desc,
      createdAt: serverTimestamp(),
    });

    setTitle("");
    setDesc("");
  };

  const handleEdit = (tip: any) => {
    setEditingId(tip.id);
    setEditTitle(tip.title);
    setEditDesc(tip.desc);
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    const ref = doc(db, "tips", editingId);

    await updateDoc(ref, {
      title: editTitle,
      desc: editDesc,
    });

    // reset
    setEditingId(null);
    setEditTitle("");
    setEditDesc("");
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this tip?",
    );
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "tips", id));
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-slate-100 py-10 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* HEADER */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Admin Dashboard
            </h1>
            <p className="text-gray-500 mt-1">Content Management</p>
          </div>

          {/* SECTION TITLE */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-700">
              Zon Pelajar
            </h2>
            <div className="h-px bg-gray-300 flex-1 ml-4"></div>
          </div>

          {/* FORM CARD */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Add New Tip
            </h3>

            <input
              placeholder="Title"
              className="border border-gray-300 focus:ring-2 focus:ring-emerald-400 focus:outline-none p-3 mb-3 w-full rounded-lg text-gray-800"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="Description"
              className="border border-gray-300 focus:ring-2 focus:ring-emerald-400 focus:outline-none p-3 mb-4 w-full rounded-lg text-gray-800"
              rows={4}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />

            <button
              onClick={handleAdd}
              className="bg-emerald-500 hover:bg-emerald-600 transition text-white px-5 py-2 rounded-lg font-medium shadow-sm"
            >
              + Add Tip
            </button>
          </div>

          {/* LIST SECTION */}
          <div className="space-y-4">
            {tips.map((tip) => (
              <div
                key={tip.id}
                className="bg-white border border-gray-200 p-5 rounded-xl hover:shadow-md transition"
              >
                {editingId === tip.id ? (
                  <>
                    <input
                      className="border border-gray-300 focus:ring-2 focus:ring-emerald-400 focus:outline-none p-2 mb-2 w-full rounded-lg text-gray-800"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />

                    <textarea
                      className="border border-gray-300 focus:ring-2 focus:ring-emerald-400 focus:outline-none p-2 mb-3 w-full rounded-lg text-gray-800"
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                    />

                    <div className="flex gap-2">
                      <button
                        onClick={handleUpdate}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-1.5 rounded-lg"
                      >
                        Save
                      </button>

                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-1.5 rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="font-semibold text-lg text-gray-800">
                      {tip.title}
                    </h3>

                    <p className="text-gray-500 mt-1">{tip.desc}</p>

                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => handleEdit(tip)}
                        className="text-sm text-blue-500 hover:text-blue-600 font-medium"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(tip.id)}
                        className="text-sm text-red-500 hover:text-red-600 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <AddSection />

      <AddSectionPart2 />

      <AIWIRAJAHATADMIN />
    </>
  );
}
