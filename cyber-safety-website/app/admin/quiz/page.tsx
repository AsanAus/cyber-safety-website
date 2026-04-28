"use client";

import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/app/libs/firebase";
import { useRouter } from "next/navigation";

export default function QuizAdminPage() {
  const [sets, setSets] = useState<
    { id: string; Questions: { text: string; answer: boolean }[] }[]
  >([]);
  const [activeSet, setActiveSet] = useState<string>("");
  const [selectedSet, setSelectedSet] = useState<string>("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "Question Set"),
      (snapshot) => {
        const activeDoc = snapshot.docs.find((doc) => doc.id === "Active Set");

        const data = snapshot.docs
          .filter((doc) => doc.id !== "Active Set")
          .map((doc) => ({
            id: doc.id,
            Questions: (doc.data().Questions ?? []) as {
              text: string;
              answer: boolean;
            }[],
          }));
        setSets(data);

        if (activeDoc) {
          const val = activeDoc.data().Set ?? "";
          setActiveSet(val);
          setSelectedSet((prev) => prev || val); // only set on first load
        }
      },
    );

    return () => unsubscribe();
  }, []);

  const selectedSetData = sets.find((s) => s.id === selectedSet) ?? null;

  const handleActivate = async (id: string) => {
    await setDoc(doc(db, "Question Set", "Active Set"), { Set: id });
  };

  const handleDelete = async () => {
    if (!selectedSet) return;
    setDeleting(true);
    try {
      await deleteDoc(doc(db, "Question Set", selectedSet));
      // If deleted set was active, clear active set
      if (activeSet === selectedSet) {
        await setDoc(doc(db, "Question Set", "Active Set"), { Set: "" });
      }
      setSelectedSet("");
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Failed to delete:", err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <main className="flex-1 flex flex-row bg-[#fafafa] text-[#888780]">
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center px-4">
          <div className="bg-white border border-black/15 rounded-2xl p-8 max-w-sm w-full shadow-xl text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M8 4h4M3 7h14M5 7l1 10h8L15 7"
                  stroke="#dc2626"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-[#1a1a18] mb-2">
              Delete "{selectedSet}"?
            </h3>
            <p className="text-sm text-[#888780] mb-6 leading-relaxed">
              This will permanently remove the set and all{" "}
              <span className="font-semibold text-[#1a1a18]">
                {selectedSetData?.Questions?.length ?? 0} questions
              </span>{" "}
              inside it. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={deleting}
                className="flex-1 py-2.5 border border-black/15 rounded-xl text-sm text-[#1a1a18] hover:bg-[#f1efe8] transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition"
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      <aside className="w-64 border border-black/15 bg-[#f9f8f6]">
        <div className="p-3">
          <h2 className="text-md font-sans mb-4 text-center">QUESTION SETS</h2>
          <button
            onClick={() => {
              router.push("/admin/quiz/create?set=" + selectedSet);
            }}
            className="w-full border font-normal bg-white text-[#1a1a18] border-black/15 py-2 rounded mb-2 hover:bg-[#f1efe8]"
          >
            New Set
          </button>
        </div>

        <hr className="border-black/15" />

        {sets.map((set) => (
          <div
            className="p-3"
            onClick={() => setSelectedSet(set.id)}
            key={set.id}
          >
            <div
              className={`p-3 bg-white rounded-lg border cursor-pointer ${set.id === selectedSet ? "border-blue-500" : "border-black/15"}`}
            >
              <h3 className="text-lg font-semibold text-black">{set.id}</h3>
              <p className="text-sm text-gray-500 mb-2">
                {set.Questions?.length ?? 0} questions
              </p>
              {set.id === activeSet && (
                <span className="text-sm font-bold rounded-full px-2 py-1 bg-green-100 text-green-800 border border-green-300">
                  Active
                </span>
              )}
            </div>
          </div>
        ))}
      </aside>

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-normal mb-4 font-sans text-[#1a1a18]">
          Manage Questions
        </h1>
        <hr className="border-black/15 mb-4" />
        {selectedSetData ? (
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <h2 className="text-xl font-semibold text-[#1a1a18]">
                {selectedSetData.id}
              </h2>
              <div className="flex items-center gap-2">
                {selectedSetData.id !== activeSet && (
                  <button
                    onClick={() => handleActivate(selectedSetData.id)}
                    className="text-xs font-bold px-3 py-3 rounded-md bg-blue-100 text-blue-700 border border-blue-300 hover:bg-blue-200 "
                  >
                    Activate This Set
                  </button>
                )}

                {selectedSetData.id === activeSet && (
                  <span className="text-xs font-bold px-3 py-3 rounded-md bg-green-100 text-green-800 border border-green-300">
                    Active Set
                  </span>
                )}
                <button onClick={() => {router.push(`/admin/quiz/edit?set=${selectedSet}`)}} className="text-xs font-bold px-6 py-3 rounded-md bg-gray-200 text-gray-700 border border-gray-300 hover:bg-gray-300">
                  Edit
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="text-xs font-bold px-6 py-3 rounded-md bg-red-100 text-red-700 border border-red-300 hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="text-gray-500 text-sm mb-6">
              {selectedSetData.Questions?.length ?? 0} questions in this set
            </p>
            <div className="flex flex-col gap-3">
              {selectedSetData.Questions.map((q, i) => (
                <div
                  key={i}
                  className="bg-white border border-black/15 rounded-lg px-4 py-3"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xs text-gray-400 mt-1 shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-sm text-[#1a1a18] flex-1">{q.text}</p>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${q.answer ? "bg-green-100 text-green-800" : "bg-red-100 text-red-700"}`}
                    >
                      {q.answer ? "Fakta" : "Auta"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-400">
            Select a question set to view its questions
          </p>
        )}
      </div>
    </main>
  );
}
