"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function SurveyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#f5f1eb] text-[#0b3d2e] px-6 py-16">
      <div className="text-center mb-12">
        <div className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
          Survey
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Bahagian Tinjauan
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto">
          Pilih kategori pelajar untuk memulakan tinjauan keselamatan siber.
        </p>
      </div>

      {/* SURVEY CARDS */}
      <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8">
        {/* SEKOLAH RENDAH */}
        <Link
          href="/survey/a"
          className="
  w-full md:w-105
  group
  bg-white
  rounded-3xl
  p-8
  shadow-md
  border border-green-100
  hover:shadow-2xl
  hover:-translate-y-2
  transition-all duration-300
"
        >
          <div className="text-5xl mb-5">🧒</div>

          <h2 className="text-2xl font-bold mb-3 group-hover:text-green-700">
            Sekolah Kebangsaan King George V
          </h2>

          <p className="text-[#4b6358] leading-relaxed">
            Tinjauan khas untuk murid sekolah rendah berkaitan penggunaan
            internet dan keselamatan siber.
          </p>

          <div className="mt-6 inline-block bg-green-700 text-white px-5 py-2 rounded-xl group-hover:bg-green-800">
            Mulakan →
          </div>
        </Link>

        {/* SEKOLAH MENENGAH */}
        <Link
          href="/survey/b"
          className="
  w-full md:w-105
  group
  bg-white
  rounded-3xl
  p-8
  shadow-md
  border border-green-100
  hover:shadow-2xl
  hover:-translate-y-2
  transition-all duration-300
"
        >
          <div className="text-5xl mb-5">🎓</div>

          <h2 className="text-2xl font-bold mb-3 group-hover:text-green-700">
            Sekolah Menengah Kebangsaan La Salle
          </h2>

          <p className="text-[#4b6358] leading-relaxed">
            Tinjauan untuk pelajar sekolah menengah mengenai kesedaran
            keselamatan digital dan ancaman siber.
          </p>

          <div className="mt-6 inline-block bg-green-700 text-white px-5 py-2 rounded-xl group-hover:bg-green-800">
            Mulakan →
          </div>
        </Link>

        {/* SEKOLAH Rendah */}
        <Link
          href="/survey/c"
          className="
  w-full md:w-105
  group
  bg-white
            rounded-3xl
            p-8
            shadow-md
            border border-green-100
            hover:shadow-2xl
            hover:-translate-y-2
            transition-all duration-300
          "
        >
          <div className="text-5xl mb-5">🧒</div>

          <h2 className="text-2xl font-bold mb-3 group-hover:text-green-700">
             Sekolah Kebangsaan (2) Sultan Alam Shah.
          </h2>

          <p className="text-[#4b6358] leading-relaxed">
            Tinjauan khas untuk murid sekolah rendah berkaitan penggunaan
            internet dan keselamatan siber.
          </p>

          <div className="mt-6 inline-block bg-green-700 text-white px-5 py-2 rounded-xl group-hover:bg-green-800">
            Mulakan →
          </div>
        </Link>
      </div>
    </main>
  );
}
