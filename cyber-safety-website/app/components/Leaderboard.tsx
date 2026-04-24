"use client";

import { useState, useEffect } from "react";
import { db } from "@/app/libs/firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  where,
    getDocs,
} from "firebase/firestore";

type LeaderboardEntry = {
  id: string;
  name: string;
  kelas: string;
  score: number;
  totalQuestions: number;
  timeTaken: number;
  questionSet: string;
  accuracy: number;
};

function formatTime(s?: number) {
  if (s == null) return "0.0s"; // handle undefined/null

  const m = Math.floor(s / 60);
  const sec = (s % 60).toFixed(1);

  return m > 0 ? `${m}m ${sec}s` : `${s.toFixed(1)}s`;
}

const MEDAL = ["🥇", "🥈", "🥉"];
const RANK_BG = [
  "bg-yellow-50 border-yellow-300",
  "bg-gray-50 border-gray-300",
  "bg-orange-50 border-orange-300",
];
const RANK_SCORE_COLOR = [
  "text-yellow-600",
  "text-gray-500",
  "text-orange-500",
];
export default function Leaderboard({
  highlightName,
  activeSet,
}: {
  highlightName?: string;
  activeSet: string;
}) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Add this temporary useEffect to Leaderboard.tsx
  useEffect(() => {

    const check = async () => {
      const snap = await getDocs(collection(db, "quizResults"));
      console.log("Total docs in quizResults:", snap.size);
      snap.forEach((d) => console.log(d.id, d.data()));
    };
    check();
  }, []);

  useEffect(() => {
    //if (!activeSet) return;

    console.log("Querying for activeSet:", activeSet);
    const q = query(
      collection(db, "quizResults"),
      where("questionSet", "==", activeSet),
      orderBy("score", "desc"),
      orderBy("timeTaken", "asc"),
      limit(10),
    );

    const unsub = onSnapshot(q, (snap) => {
      setEntries(
        snap.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() }) as LeaderboardEntry,
        ),
      );
      setLoading(false);
    });

    return () => unsub();
  }, [activeSet]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <div className="w-8 h-8 border-4 border-orange-300 border-t-orange-600 rounded-full animate-spin mb-4" />
        <p className="text-sm">Memuatkan papan mata...</p>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        <div className="text-5xl mb-4">🏆</div>
        <p className="text-sm">Belum ada peserta lagi. Jadilah yang pertama!</p>
      </div>
    );
  }

  const top3 = entries.slice(0, 3);
  const rest = entries.slice(3);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Podium for top 3 */}
      <div className="flex items-end justify-center gap-3 mb-8">
        {/* 2nd place */}
        {top3[1] && (
          <div className="flex flex-col items-center flex-1">
            <div className="text-2xl mb-1">🥈</div>
            <div
              className={`w-full rounded-t-2xl border-2 px-3 py-4 text-center ${RANK_BG[1]}`}
              style={{ minHeight: "110px" }}
            >
              <p className="font-bold text-gray-800 text-sm leading-tight truncate">
                {top3[1].name}
              </p>
              <p className="text-xs text-gray-400 mb-2 truncate">
                {top3[1].kelas}
              </p>
              <p className={`text-2xl font-black ${RANK_SCORE_COLOR[1]}`}>
                {((top3[1].score / top3[1].totalQuestions) * 100).toFixed(0)}%
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {formatTime(top3[1].timeTaken)}
              </p>
            </div>
            <div className="w-full h-12 bg-gray-200 rounded-b-xl flex items-center justify-center">
              <span className="text-gray-500 font-black text-xl">2</span>
            </div>
          </div>
        )}

        {/* 1st place - taller */}
        {top3[0] && (
          <div className="flex flex-col items-center flex-1">
            <div className="text-3xl mb-1 animate-bounce">🥇</div>
            <div
              className={`w-full rounded-t-2xl border-2 px-3 py-5 text-center ${RANK_BG[0]} shadow-lg`}
              style={{ minHeight: "140px" }}
            >
              <p className="font-bold text-gray-800 text-sm leading-tight truncate">
                {top3[0].name}
              </p>
              <p className="text-xs text-gray-400 mb-2 truncate">
                {top3[0].kelas}
              </p>
              <p className={`text-2xl font-black ${RANK_SCORE_COLOR[0]}`}>
                {((top3[0].score / top3[0].totalQuestions) * 100).toFixed(0)}%
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {formatTime(top3[0].timeTaken)}
              </p>
            </div>
            <div className="w-full h-16 bg-yellow-400 rounded-b-xl flex items-center justify-center">
              <span className="text-yellow-800 font-black text-2xl">1</span>
            </div>
          </div>
        )}

        {/* 3rd place */}
        {top3[2] && (
          <div className="flex flex-col items-center flex-1">
            <div className="text-2xl mb-1">🥉</div>
            <div
              className={`w-full rounded-t-2xl border-2 px-3 py-4 text-center ${RANK_BG[2]}`}
              style={{ minHeight: "90px" }}
            >
              <p className="font-bold text-gray-800 text-sm leading-tight truncate">
                {top3[2].name}
              </p>
              <p className="text-xs text-gray-400 mb-2 truncate">
                {top3[2].kelas}
              </p>
              <p className={`text-2xl font-black ${RANK_SCORE_COLOR[2]}`}>
                {((top3[2].score / top3[2].totalQuestions) * 100).toFixed(0)}%
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {formatTime(top3[2].timeTaken)}
              </p>
            </div>
            <div className="w-full h-8 bg-orange-300 rounded-b-xl flex items-center justify-center">
              <span className="text-orange-800 font-black text-xl">3</span>
            </div>
          </div>
        )}
      </div>

      {/* Ranks 4–10 */}
      {rest.length > 0 && (
        <div className="flex flex-col gap-2">
          {rest.map((entry, i) => {
            const rank = i + 4;
            const isHighlighted = entry.name === highlightName;
            return (
              <div
                key={entry.id}
                className={`flex items-center gap-4 rounded-2xl px-5 py-3 border transition-all ${
                  isHighlighted
                    ? "bg-green-50 border-green-400 shadow-sm"
                    : "bg-white border-gray-100"
                }`}
              >
                <span className="text-gray-400 font-bold w-5 text-sm text-center shrink-0">
                  {rank}
                </span>
                <div className="flex-1 min-w-0">
                  <p
                    className={`font-semibold text-sm truncate ${isHighlighted ? "text-green-700" : "text-gray-800"}`}
                  >
                    {entry.name}
                    {isHighlighted && (
                      <span className="ml-2 text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                        Kamu
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {entry.kelas}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-gray-800 text-sm">
                    {entry.score}/{entry.totalQuestions}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatTime(entry.timeTaken)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
