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
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";

export default function LawsAdmin() {
  const [laws, setLaws] = useState<any[]>([]);

  const [form, setForm] = useState({
    topic: "",
    smallDesc: "",
    longDesc: "",
  });

  // 🔥 INLINE EDIT STATE
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    topic: "",
    smallDesc: "",
    longDesc: "",
  });

  // 🔁 FETCH (ORDER BY LATEST)
  useEffect(() => {
    const q = query(collection(db, "laws"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snap) => {
      const temp = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLaws(temp);
    });

    return () => unsubscribe();
  }, []);

  // ➕ CREATE ONLY (NO UPDATE HERE ANYMORE)
  const handleSubmit = async () => {
    if (!form.topic.trim()) return;

    await addDoc(collection(db, "laws"), {
      ...form,
      createdAt: serverTimestamp(), // ✅ timestamp
    });

    setForm({ topic: "", smallDesc: "", longDesc: "" });
  };

  // ❌ DELETE
  const deleteLaw = async (id: string) => {
    await deleteDoc(doc(db, "laws", id));
  };

  // ✏️ ENTER EDIT MODE
  const editLaw = (law: any) => {
    setEditingId(law.id);
    setEditForm({
      topic: law.topic,
      smallDesc: law.smallDesc,
      longDesc: law.longDesc,
    });
  };

  // 💾 SAVE EDIT
  const saveEdit = async (id: string) => {
    await updateDoc(doc(db, "laws", id), editForm);
    setEditingId(null);
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="max-w-5xl mx-auto py-10 px-4 space-y-8">
        
        {/* TITLE */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-700">
            ⚖️ Rujukan Undang-undang Malaysia
          </h2>
          <div className="h-px bg-gray-300 flex-1 ml-4"></div>
        </div>

        {/* FORM (ONLY ADD NOW) */}
        <div className="space-y-3">
          <input
            placeholder="Topic"
            value={form.topic}
            onChange={(e) =>
              setForm({ ...form, topic: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg border"
          />

          <input
            placeholder="Small Description"
            value={form.smallDesc}
            onChange={(e) =>
              setForm({ ...form, smallDesc: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg border"
          />

          <textarea
            placeholder="Long Description"
            value={form.longDesc}
            onChange={(e) =>
              setForm({ ...form, longDesc: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg border"
          />

          <button
            onClick={handleSubmit}
            className="bg-emerald-500 text-white px-5 py-2 rounded-lg"
          >
            Add Law
          </button>
        </div>

        {/* LIST */}
        <div className="grid gap-4">
          {laws.map((law) => (
            <div
              key={law.id}
              className="bg-white p-5 rounded-xl shadow-sm border"
            >
              {editingId === law.id ? (
                // ✏️ EDIT MODE
                <div className="space-y-2">
                  <input
                    value={editForm.topic}
                    onChange={(e) =>
                      setEditForm({ ...editForm, topic: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded"
                  />

                  <input
                    value={editForm.smallDesc}
                    onChange={(e) =>
                      setEditForm({ ...editForm, smallDesc: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded"
                  />

                  <textarea
                    value={editForm.longDesc}
                    onChange={(e) =>
                      setEditForm({ ...editForm, longDesc: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded"
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(law.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>

                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-400 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // 👀 VIEW MODE
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {law.topic}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {law.smallDesc}
                    </p>
                    <p className="text-sm mt-2">
                      {law.longDesc}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => editLaw(law)}
                      className="text-blue-500"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteLaw(law.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}