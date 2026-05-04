"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function About() {
  const [activeTab, setActiveTab] = useState("A");

  return (
    <section id="kenalikami" className="bg-[#f5f1eb] py-20 px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <div className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
          Kenali Kami
        </div>
        <h2 className=" text-[#0b3d2e] text-3xl md:text-4xl font-bold mb-4">
          Siapa Kami & Apa Yang Kami Buat?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Bijak Digital adalah projek literasi digital yang direka khas untuk
          pelajar sekolah Malaysia. Kami nak pastikan kamu tahu cara guna
          internet dengan selamat dan bertanggungjawab.
        </p>
      </div>

      {/* TAB BUTTONS */}
      <div className="flex justify-center gap-4 mb-10">
        <button
          onClick={() => setActiveTab("A")}
          className={`px-6 py-2 rounded-full font-medium transition ${
            activeTab === "A"
              ? "bg-[#0b3d2e] text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Kumpulan A
        </button>

        <button
          onClick={() => setActiveTab("B")}
          className={`px-6 py-2 rounded-full font-medium transition ${
            activeTab === "B"
              ? "bg-[#0b3d2e] text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Kumpulan B
        </button>
      </div>

      {/* CONTENT */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto"
      >
        <div className="grid md:grid-cols-3 gap-6">
          {activeTab === "A" ? <GroupACards /> : <GroupBCards />}
        </div>
      </motion.div>
    </section>
  );
}

function Section({ title, children }: any) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
      <div className="text-gray-600 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function Card({ title, children, color }: any) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border hover:shadow-xl hover:-translate-y-1 transition duration-300">
      <h3 className={`text-lg font-semibold mb-3 ${color}`}>{title}</h3>
      <div className="text-gray-600 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function GroupACards() {
  return (
    <>
      <Card
        title={
          <>
            🌐 <br />
            Siapa Kami
          </>
        }
        color="text-[#0b3d2e]"
      >
        Pelajar Tahun 1 Fakulti Undang-Undang, Universiti Malaya bagi kursus
        LIA1007 sesi 2025/2026 di bawah bimbingan Dr. Zalina Binti Abdul Halim.
      </Card>

      <Card
        title={
          <>
            📖 <br /> Apa Yang Kami Lakukan
          </>
        }
        color="text-[#0b3d2e]"
      >
        <ul className="list-disc pl-5 space-y-1">
          <li>Bengkel interaktif di SK King George V</li>
          <li>Permainan seperti “AI atau Tidak?”</li>
          <li>Kajian soal selidik atas talian</li>
          <li>Pembangunan laman web interaktif</li>
        </ul>
      </Card>

      <Card
        title={
          <>
            🎯 <br /> Misi Kami
          </>
        }
        color="text-[#0b3d2e]"
      >
        Meningkatkan kesedaran keselamatan internet serta membentuk generasi
        muda yang beretika dan berdaya tahan dalam dunia digital.
      </Card>
    </>
  );
}

function GroupBCards() {
  return (
    <>
      <Card
        title={
          <>
            🌐 <br />
            Siapa Kami
          </>
        }
        color="text-[#0b3d2e]"
      >
        Pelajar Kumpulan 2 OCC 2 bagi projek SULAM yang dipantau oleh Dr. Zalina
        Binti Abdul Halim.
      </Card>

      <Card
        title={
          <>
            📖 <br />
            Apa Yang Kami Lakukan
          </>
        }
        color="text-[#0b3d2e]"
      >
        <ul className="list-disc pl-5 space-y-1">
          <li>Bengkel di SMK La Salle</li>
          <li>Pendedahan isu siber buli & berita palsu</li>
          <li>Kajian soal selidik pelajar</li>
          <li>Pembangunan laman web pendidikan</li>
        </ul>
      </Card>

      <Card
        title={
          <>
            🎯 <br /> Misi Kami
          </>
        }
        color="text-[#0b3d2e]"
      >
        <ul className="list-disc pl-5 space-y-1">
          <li>Meningkatkan kesedaran ancaman pengantunan seksual</li>
          <li>Memberi pendedahan penyalahgunaan internet</li>
          <li>Meningkatkan kefahaman isu digital semasa</li>
        </ul>
      </Card>
    </>
  );
}
