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
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          {/* HEADER */}
          <h1 className="text-3xl font-bold mb-8 text-gray-800">
            Admin Dashboard
          </h1>

          {/* FORM CARD */}
          <div className="bg-white shadow-md rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Add New Tip
            </h2>

            <input
              placeholder="Title"
              className="border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none p-3 mb-3 w-full rounded-lg text-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="Description"
              className="border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none p-3 mb-4 w-full rounded-lg text-black"
              rows={4}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />

            <button
              onClick={handleAdd}
              className="bg-green-600 hover:bg-green-700 transition text-white px-5 py-2 rounded-lg font-medium"
            >
              + Add Tip
            </button>
          </div>

          {/* LIST SECTION */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Manage Tips
            </h2>

            <div className="space-y-4">
              {tips.map((tip) => (
                <div
                  key={tip.id}
                  className="bg-white shadow-sm border border-gray-200 p-5 rounded-xl"
                >
                  {editingId === tip.id ? (
                    <>
                      <input
                        className="border p-2 mb-2 w-full rounded text-black"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                      />

                      <textarea
                        className="border p-2 mb-3 w-full rounded text-black"
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                      />

                      <div className="flex gap-2">
                        <button
                          onClick={handleUpdate}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded"
                        >
                          Save
                        </button>

                        <button
                          onClick={() => setEditingId(null)}
                          className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1.5 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="font-semibold text-lg text-green-600">
                        {tip.title}
                      </h3>

                      <p className="text-gray-600 mt-1">{tip.desc}</p>

                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => handleEdit(tip)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1.5 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(tip.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded"
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
      </div>

      <AddSection />

      <AIWIRAJAHATADMIN />
    </>
  );
}
