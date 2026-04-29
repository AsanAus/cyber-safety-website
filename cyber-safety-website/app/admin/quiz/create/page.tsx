"use client";

import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "@/app/libs/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Question = {
  text: string;
  answer: boolean;
};

export default function CreateQuiz() {
  const router = useRouter();
  const [setName, setSetName] = useState("");
  const [questions, setQuestions] = useState<Question[]>([
    { text: "", answer: false },
  ]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [existingSets, setExistingSets] = useState<string[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "Question Set"), (snapshot) => {
      setExistingSets(
        snapshot.docs.filter((d) => d.id !== "Active Set").map((d) => d.id),
      );
    });
    return () => unsub();
  }, []);

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
    if (!setName.trim()) return setError("Please enter a set name.");

    // Check for duplicate set name
    if (existingSets.includes(setName.trim())) {
      return setError(
        `"${setName.trim()}" already exists. Choose a different name.`,
      );
    }

    if (questions.some((q) => !q.text.trim()))
      return setError("All questions must have text.");

    setSaving(true);
    try {
      await setDoc(doc(db, "Question Set", setName.trim()), {
        Questions: questions,
      });
      router.push("/admin/quiz");
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="flex-1 bg-[#f9f8f6] text-[#888780] p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-sans text-[#1a1a18] mb-6">
          Create New Set
        </h1>

        {/* Set name */}
        <div className="mb-6">
          <label className="text-xs uppercase tracking-wider text-[#888780] mb-2 block">
            Set name
          </label>
          <input
            type="text"
            placeholder="e.g. Set C"
            value={setName}
            onChange={(e) => setSetName(e.target.value)}
            className="w-full border border-black/15 bg-white rounded-lg px-4 py-2.5 text-[#1a1a18] text-sm focus:outline-none focus:border-blue-400"
          />
        </div>

        {/* Questions */}
        <div className="space-y-3 mb-4">
          {questions.map((q, idx) => (
            <div
              key={idx}
              className="bg-white border border-black/15 rounded-lg p-4"
            >
              <div className="flex items-start gap-3">
                <span className="text-xs text-[#888780] mt-2.5 w-5 shrink-0">
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
                    className="w-full border border-black/15 rounded-lg px-3 py-2 text-sm text-[#1a1a18] focus:outline-none focus:border-blue-400"
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
                  className="text-[#888780] hover:text-red-500 disabled:opacity-20 disabled:cursor-not-allowed text-sm mt-1 shrink-0"
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
          className="w-full py-2.5 border border-dashed border-black/20 rounded-lg text-sm text-[#888780] hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition mb-6"
        >
          + Add question
        </button>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2.5 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => router.push("/admin/quiz")}
            className="flex-1 py-2.5 border border-black/15 rounded-lg text-sm text-[#1a1a18] hover:bg-[#f1efe8] transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-lg text-sm font-semibold transition"
          >
            {saving ? "Saving..." : "Save Set"}
          </button>
        </div>
      </div>
    </main>
  );
}
