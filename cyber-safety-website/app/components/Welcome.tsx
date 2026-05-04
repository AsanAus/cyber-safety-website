"use client";

import Lottie from "lottie-react";
import animationData from "@/public/lottie/Welcome.json";

export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-6 items-center min-h-[80vh]">
      {/* LEFT CONTENT */}
      <div className="space-y-4">
        <div className="inline-block bg-yellow-600/20 text-yellow-400 px-4 py-1 rounded-full text-sm">
          Selamat Datang ke Bijak Digital!
        </div>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Kesedaran <br/><span className="text-yellow-400">Keselamatan Siber</span>
          <br />
          untuk Semua!
        </h1>

        <p className="text-gray-300 max-w-lg">
          Lindungi diri anda di dunia digital. Pelajari tentang ancaman siber,
          elakkan penipuan, dan bina tabiat teknologi yang lebih selamat.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative flex justify-center items-center">
        {/* Glow (center properly) */}
        <div className="absolute w-80 h-80 bg-green-500/20 blur-3xl rounded-full"></div>

        {/* Lottie */}
        <Lottie
          animationData={animationData}
          loop
          className="relative w-full max-w-sm md:max-w-md"
        />
      </div>
    </section>
  );
}
