"use client";

import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/app/libs/firebase";
import { useRouter, useSearchParams } from "next/navigation";

type Question = {
  text: string;
  answer: boolean;
};

export default function EditQuiz() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setId = searchParams.get("set");

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!setId) return;

    const unsub = onSnapshot(doc(db, "Question Set", setId), (snap) => {
      if (snap.exists()) {
        setQuestions((snap.data().Questions ?? []) as Question[]);
      }
      setLoading(false);
    });

    return () => unsub();
  }, [setId]);

  const handleQuestionChange = (
    idx: number,
    field: keyof Question,
    value: string | boolean,
  ) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === idx ? { ...q, [field]: value } : q)),
    );
  };

  const handleAddQuestion = () => {
    setQuestions((prev) => [...prev, { text: "", answer: false }]);
  };

  const handleRemoveQuestion = (idx: number) => {
    if (questions.length === 1) return;
    setQuestions((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    setError("");
    setSuccess(false);
    if (questions.some((q) => !q.text.trim())) {
      return setError("All questions must have text.");
    }
    setSaving(true);
    try {
      await updateDoc(doc(db, "Question Set", setId!), {
        Questions: questions,
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      router.push("/admin/quiz");
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!setId) {
    return (
      <main className="flex-1 bg-[#f9f8f6] p-8 flex items-center justify-center">
        <p className="text-gray-400 text-sm">No set specified.</p>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="flex-1 bg-[#f9f8f6] p-8 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <div className="w-7 h-7 border-4 border-gray-200 border-t-blue-400 rounded-full animate-spin" />
          <p className="text-sm">Loading questions...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-[#f9f8f6] text-[#888780] p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-[#1a1a18]">
              Edit — {setId}
            </h1>
            <p className="text-sm text-[#888780] mt-1">
              {questions.length} question{questions.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => router.push("/admin/quiz")}
              className="px-4 py-2.5 border border-black/15 rounded-xl text-sm text-[#1a1a18] hover:bg-[#f1efe8] transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Success toast */}
        {success && (
          <div className="bg-green-50 border border-green-300 text-green-700 text-sm px-4 py-3 rounded-xl mb-4 flex items-center gap-2">
            ✅ Changes saved successfully.
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        {/* Questions */}
        <div className="flex flex-col gap-3 mb-4">
          {questions.map((q, idx) => (
            <div
              key={idx}
              className="bg-white border border-black/15 rounded-xl p-4"
            >
              <div className="flex items-start gap-3">
                <span className="text-xs text-gray-400 mt-2.5 w-5 shrink-0 text-center">
                  {idx + 1}
                </span>
                <div className="flex-1 flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Write question here..."
                    value={q.text}
                    onChange={(e) =>
                      handleQuestionChange(idx, "text", e.target.value)
                    }
                    className="w-full border border-black/15 rounded-lg px-3 py-2 text-sm text-[#1a1a18] focus:outline-none focus:border-blue-400 transition"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleQuestionChange(idx, "answer", true)}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition ${
                        q.answer
                          ? "bg-green-100 text-green-800 border-green-400"
                          : "bg-white text-[#888780] border-black/15 hover:border-green-300"
                      }`}
                    >
                      ✔ Fakta
                    </button>
                    <button
                      onClick={() => handleQuestionChange(idx, "answer", false)}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition ${
                        !q.answer
                          ? "bg-red-100 text-red-700 border-red-400"
                          : "bg-white text-[#888780] border-black/15 hover:border-red-300"
                      }`}
                    >
                      ✖ Auta
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveQuestion(idx)}
                  disabled={questions.length === 1}
                  className="text-[#888780] hover:text-red-500 disabled:opacity-20 disabled:cursor-not-allowed text-sm mt-1 shrink-0 transition"
                  title="Remove question"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add question */}
        <button
          onClick={handleAddQuestion}
          className="w-full py-2.5 border border-dashed border-black/20 rounded-xl text-sm text-[#888780] hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition mb-6"
        >
          + Add question
        </button>
      </div>
    </main>
  );
}
