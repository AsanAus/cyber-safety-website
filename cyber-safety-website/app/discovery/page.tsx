import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import About from "@/app/components/About";
import Zon from "@/app/components/Zon";
import Wirapenjahat from "@/app/components/Wirapenjahat";
import Sudutpenjaga from "@/app/components/Sudutpenjaga";
import RuangSuara from "@/app/components/RuangSuara";
import PetiSuara from "@/app/components/PetiSuara";

export default function Home() {
  return (
    <main className="bg-[#0b3d2e] min-h-screen text-white">

      {/* Glow Effect */}
        <div className="absolute w-100 h-100 bg-green-400 opacity-20 blur-3xl rounded-full -top-25 -left-25" />
        <div className="absolute w-75 h-75 bg-emerald-300 opacity-20 blur-3xl rounded-full -bottom-20 -right-20" />

      <Hero />

      <div className="bg-[#0b3d2e]">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-20"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C300,120 1140,0 1440,60 L1440,120 L0,120 Z"
            fill="#f5f1eb"
          />
        </svg>
      </div>

      <Zon />

      <Wirapenjahat />

      <Sudutpenjaga />

    </main>
  );
}
