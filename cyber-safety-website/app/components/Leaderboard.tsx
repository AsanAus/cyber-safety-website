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
} from "firebase/firestore";
import LottieAnim from "./LottieAnim";
import * as animationData from "../../animations/Trophy.json";
import * as confettiData from "../../animations/Confetti.json";

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
  if (s == null) return "0.0s";
  const m = Math.floor(s / 60);
  const sec = (s % 60).toFixed(1);
  return m > 0 ? `${m}m ${sec}s` : `${s.toFixed(1)}s`;
}

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
const PODIUM_HEIGHT = ["140px", "110px", "90px"];
const PODIUM_BAR_BG = ["bg-yellow-400", "bg-gray-200", "bg-orange-300"];
const PODIUM_BAR_TEXT = ["text-yellow-800", "text-gray-500", "text-orange-800"];
const PODIUM_BAR_H = ["h-16", "h-12", "h-8"];

function PodiumCard({
  entry,
  rank,
  highlightName,
  showTrophy,
}: {
  entry: LeaderboardEntry;
  rank: number;
  highlightName?: string;
  showTrophy?: boolean;
}) {
  const idx = rank - 1;
  const isHighlighted = entry.name === highlightName;

  return (
    <div className="flex flex-col items-center flex-1">
      
      {showTrophy && (
        <div className="w-24 mb-1">
          <LottieAnim animationData={animationData} loop={true} />
        </div>
        
      )}

      <div
        className={`w-full rounded-t-2xl border-2 px-3 text-center transition-all ${RANK_BG[idx]} ${
          isHighlighted ? "ring-2 ring-green-400 ring-offset-1" : ""
        }`}
        style={{
          minHeight: PODIUM_HEIGHT[idx],
          paddingTop: "1rem",
          paddingBottom: "1rem",
        }}
      >
        <p className="font-bold text-gray-800 text-sm leading-tight text-wrap">
          {entry.name}
          {isHighlighted && (
            <span className="ml-1 text-xs bg-green-100 text-green-600 px-1.5 py-0.5 rounded-full">
              Anda
            </span>
          )}
        </p>
        <p className="text-xs text-gray-400 mb-2 truncate">{entry.kelas}</p>
        <p className={`text-2xl font-black ${RANK_SCORE_COLOR[idx]}`}>
          {((entry.score / entry.totalQuestions) * 100).toFixed(0)}%
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {formatTime(entry.timeTaken)}
        </p>
      </div>
      <div
        className={`w-full ${PODIUM_BAR_H[idx]} ${PODIUM_BAR_BG[idx]} rounded-b-xl flex items-center justify-center`}
      >
        <span className={`${PODIUM_BAR_TEXT[idx]} font-black text-xl`}>
          {rank}
        </span>
      </div>
    </div>
  );
}

export default function Leaderboard({
  highlightName,
  activeSet,
}: {
  highlightName?: string;
  activeSet: string;
}) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!activeSet) return;

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

  // Podium order: 2nd, 1st, 3rd (visual left-to-right)
  // Only show slots that exist
  const podiumSlots: { entry: LeaderboardEntry; rank: number }[] = [];
  if (top3[1]) podiumSlots.push({ entry: top3[1], rank: 2 });
  if (top3[0]) podiumSlots.push({ entry: top3[0], rank: 1 });
  if (top3[2]) podiumSlots.push({ entry: top3[2], rank: 3 });

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-semibold tracking-wider mb-3">
          PAPAN MATA
        </div>
        <h2 className="text-3xl font-bold text-[#0b3d2e]">Wira Digital 🏆</h2>
        <p className="text-gray-500 text-sm mt-1">
          Top 10 peserta terbaik — skor tertinggi, masa terpantas.
        </p>
      </div>

      
      {/* Podium */}
      <div className="flex items-end justify-center gap-3 mb-8">
        <div className="absolute -left-2">
          <LottieAnim animationData={confettiData} loop={false} />
        </div>
        {podiumSlots.map(({ entry, rank }) => (
          <PodiumCard
            key={entry.id}
            entry={entry}
            rank={rank}
            highlightName={highlightName}
            showTrophy={rank === 1}
          />
        ))}
        <div className="absolute -right-2">
          <LottieAnim animationData={confettiData} loop={false} />
        </div>
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
                    {((entry.score / entry.totalQuestions) * 100).toFixed(0)}%
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
