"use client";

import { useState, useEffect, useRef } from "react";
import { db } from "@/app/libs/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  doc,
} from "firebase/firestore";

type Result = {
  text: string;
  correct: boolean;
  rightAnswer: boolean;
};

type Question = {
  text: string;
  answer: boolean;
  icon?: string;
};

// MiniGame.tsx — accept and use it
export default function MiniGame({
  name,
  kelas,
  questionSet,
}: {
  name: string;
  kelas: string;
  questionSet: string;
}) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    message: string;
  } | null>(null);
  const [results, setResults] = useState<Result[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [cardState, setCardState] = useState<"idle" | "correct" | "wrong">(
    "idle",
  );
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);

  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    console.log("MiniGame mounted with questionSet:", questionSet);
    const docRef = doc(db, "Question Set", questionSet);
    const unsub = onSnapshot(docRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setQuestions(data.Questions as Question[]);
      }
      setLoading(false);
    });
    return () => unsub();
  }, [questionSet]);

  // Start overall timer once on mount
  useEffect(() => {
    startTimeRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return parseFloat(((Date.now() - startTimeRef.current) / 1000).toFixed(1));
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return m > 0 ? `${m}m ${sec}s` : `${sec}s`;
  };


  const saveResults = async (finalScore: number, finalTime: number) => {
    setSaving(true);
    setSaveError(false);
    try {
      await addDoc(collection(db, "quizResults"), {
        name,
        kelas,
        score: finalScore,
        totalQuestions: questions.length,
        timeTaken: finalTime,
        questionSet,
        accuracy: parseFloat(
          ((finalScore / questions.length) * 100).toFixed(1),
        ),
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Error saving quiz results:", error);
      setSaveError(true);
    } finally {
      setSaving(false);
    }
  };

  const handleAnswer = (choice: boolean) => {
    if (answered) return;
    const q = questions[current];
    const correct = choice === q.answer;

    setAnswered(true);
    setCardState(correct ? "correct" : "wrong");
    setFeedback({
      correct,
      message: correct
        ? `✅ Betul! ${q.answer ? "Ini memang fakta." : "Ini memang auta."}`
        : `❌ Salah! Jawapan yang betul: ${q.answer ? "Fakta" : "Auta"}`,
    });

    // ✅ Compute final score inline — don't rely on stale `score` state
    const finalScore = correct ? score + 1 : score;
    if (correct) setScore(finalScore);

    setResults((prev) => [
      ...prev,
      { text: q.text, correct, rightAnswer: q.answer },
    ]);

    if (current === questions.length - 1) {
      const finalTime = stopTimer();
      setElapsed(Math.round(finalTime));
      saveResults(finalScore, finalTime);
      setTimeout(() => setShowResult(true), 900);
    }
  };

  const handleNext = () => {
    setCurrent((c) => c + 1);
    setAnswered(false);
    setFeedback(null);
    setCardState("idle");
  };

  const restart = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    window.location.reload();
  };

  const pct = questions.length > 0 ? score / questions.length : 0;
  const resultInfo =
    pct === 1
      ? {
          title: "Luar biasa! Sempurna! 🏆",
          msg: "Anda berjaya jawab semua soalan dengan betul. Hebat!",
          color: "green",
        }
      : pct >= 0.67
        ? {
            title: "Bagus! Hampir sempurna 👏",
            msg: "Anda punya pengetahuan yang baik. Teruskan belajar!",
            color: "amber",
          }
        : pct >= 0.5
          ? {
              title: "Boleh tahan! 🤔",
              msg: "Ada ruang untuk penambahbaikan. Jangan putus asa!",
              color: "amber",
            }
          : {
              title: "Perlu banyak belajar! 💪",
              msg: "Cuba semula dan pelajari fakta-fakta penting ini.",
              color: "red",
            };

  const circleStyle: Record<string, string> = {
    green: "bg-green-100 border-green-500",
    amber: "bg-yellow-100 border-yellow-400",
    red: "bg-red-100 border-red-500",
  };
  const scoreTextStyle: Record<string, string> = {
    green: "text-green-700",
    amber: "text-yellow-700",
    red: "text-red-700",
  };

  // Loading state while fetching questions
  if (loading) {
    return (
      <section className="bg-[#f5f1eb] px-8 min-h-screen flex items-center justify-center">
        <div className="text-center text-gray-400">
          <div className="w-8 h-8 border-4 border-orange-300 border-t-orange-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm">Memuatkan soalan...</p>
        </div>
      </section>
    );
  }

  if (showResult) {
    return (
      <section className="bg-[#f5f1eb] text-[#0b3d2e] px-8 pb-20 min-h-screen">
        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-md text-center">
            <div
              className={`w-24 h-24 rounded-full border-4 flex flex-col items-center justify-center mx-auto mb-5 ${circleStyle[resultInfo.color]}`}
            >
              <span
                className={`text-3xl font-bold leading-none ${scoreTextStyle[resultInfo.color]}`}
              >
                {score}
              </span>
              <span className="text-xs text-gray-500">
                / {questions.length}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              {resultInfo.title}
            </h2>
            <p className="text-sm text-gray-500 mb-1">{resultInfo.msg}</p>
            <p className="text-sm font-semibold text-gray-700 mb-5">
              {name} · {kelas}
            </p>

            {/* Total time */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl px-5 py-4 mb-4 flex items-center justify-between">
              <div className="text-left">
                <p className="text-xs text-orange-400 font-semibold uppercase tracking-wider mb-0.5">
                  Masa Keseluruhan
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {formatTime(elapsed)}
                </p>
              </div>
              <span className="text-3xl">⏱️</span>
            </div>

            {/* Save status */}
            {saving && (
              <div className="text-sm text-gray-400 mb-4">
                Menyimpan keputusan...
              </div>
            )}
            {saveError && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-xl mb-4">
                Gagal simpan keputusan. Semak sambungan internet anda.
              </div>
            )}
            {!saving && !saveError && (
              <div className="text-sm text-green-600 mb-4">
                ✅ Keputusan berjaya disimpan!
              </div>
            )}

            {/* Review list */}
            <div className="text-left flex flex-col gap-2 mb-6 max-h-56 overflow-y-auto pr-1">
              {results.map((r, i) => (
                <div
                  key={i}
                  className="flex gap-3 items-start bg-gray-50 rounded-xl px-4 py-3 text-sm"
                >
                  <span className="mt-0.5 shrink-0">
                    {r.correct ? "✅" : "❌"}
                  </span>
                  <span className="text-gray-600 leading-snug flex-1">
                    {r.text}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={restart}
              className="w-full py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-base transition"
            >
              Kembali
            </button>
          </div>
        </div>
      </section>
    );
  }

  const q = questions[current];

  return (
    <section className="bg-[#f5f1eb] text-[#0b3d2e] px-8">
      <div className="max-w-xl mx-auto pb-20">
        <div className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-semibold tracking-wider mb-4">
          MINI GAME
        </div>

        <h2 className="text-3xl font-bold mb-1">Fakta atau Auta? 🎲</h2>
        <p className="text-gray-500 text-sm mb-5">
          Baca setiap penyataan dan tentukan sama ada ia benar atau palsu.
        </p>

        {/* Dot indicators */}
        <div className="flex gap-2 mb-5">
          {questions.map((_, i) => {
            const isDone = i < current;
            const isActive = i === current;
            const wasCorrect = results[i]?.correct;
            return (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-orange-500 scale-125"
                    : isDone
                      ? wasCorrect
                        ? "bg-green-500"
                        : "bg-red-400"
                      : "bg-gray-300"
                }`}
              />
            );
          })}
        </div>

        {/* Score + overall timer */}
        <div className="flex items-center justify-between mb-5">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-1 text-sm font-medium text-gray-500">
            Skor:{" "}
            <span className="font-bold text-gray-800">
              {score} / {questions.length}
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 py-1 text-sm font-medium text-gray-500">
            ⏱️{" "}
            <span className="font-bold text-gray-800 tabular-nums">
              {formatTime(elapsed)}
            </span>
          </div>
        </div>

        {/* Card */}
        <div
          className={`bg-white rounded-2xl p-8 shadow-md transition-all duration-300 ${
            cardState === "correct"
              ? "border-2 border-green-500 shadow-green-100"
              : cardState === "wrong"
                ? "border-2 border-red-400 shadow-red-100"
                : "border border-gray-100"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
            Soalan {current + 1} daripada {questions.length}
          </p>
          <div className="py-8">
            <p className="text-lg font-semibold text-gray-800 leading-snug mb-6">
              "{q.text}"
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => handleAnswer(true)}
              disabled={answered}
              className="flex-1 py-3.5 rounded-xl bg-green-700 hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm transition-all hover:-translate-y-0.5 active:scale-95"
            >
              ✔ Fakta
            </button>
            <button
              onClick={() => handleAnswer(false)}
              disabled={answered}
              className="flex-1 py-3.5 rounded-xl bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm transition-all hover:-translate-y-0.5 active:scale-95"
            >
              ✖ Auta
            </button>
          </div>

          {feedback && (
            <div
              className={`mt-4 flex items-center gap-2 text-sm font-semibold px-4 py-3 rounded-xl ${
                feedback.correct
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {feedback.message}
            </div>
          )}

          {answered && current < questions.length - 1 && (
            <button
              onClick={handleNext}
              className="mt-3 w-full py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold text-sm transition"
            >
              Seterusnya →
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
