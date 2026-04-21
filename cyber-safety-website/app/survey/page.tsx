"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function SurveyPage() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#f5f1eb] text-[#0b3d2e] p-8">

      <h1 className="text-3xl font-bold text-center mb-6">
        Bahagian Tinjauan
      </h1>

      <p className="text-center mb-10">
        Sila pilih jenis tinjauan yang ingin dijawab.
      </p>

      <div className="flex flex-col md:flex-row gap-4 justify-center">

        <Link
          href="/survey/a"
          className="bg-green-700 text-white px-6 py-3 rounded-xl text-center hover:bg-green-800"
        >
          Survey A
        </Link>

        <Link
          href="/survey/b"
          className="bg-green-700 text-white px-6 py-3 rounded-xl text-center hover:bg-green-800"
        >
          Survey B
        </Link>

      </div>

    </main>
  );
}