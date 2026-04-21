import Link from "next/link";
import About from "@/app/components/About";

export default function Home() {
  return (
    <main className="bg-[#0b3d2e] min-h-screen text-white">

      {/* HERO */}
      <section className="relative px-6 py-28 text-center overflow-hidden">

        {/* Glow Effect */}
        <div className="absolute w-100 h-100 bg-green-400 opacity-20 blur-3xl rounded-full -top-25 -left-25" />
        <div className="absolute w-75 h-75 bg-emerald-300 opacity-20 blur-3xl rounded-full -bottom-20 -right-20" />

        <p className="text-yellow-300 font-semibold mb-4 tracking-widest">
          SELAMAT DATANG KE <span className="text-green-300 ">BIJAK DIGITAL</span>
        </p>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Kesedaran Keselamatan Siber
          <br />
          untuk Semua
        </h1>

        <p className="max-w-2xl mx-auto text-gray-200 text-lg mb-10">
          Lindungi diri anda di dunia digital. Pelajari tentang ancaman siber,
          elakkan penipuan, dan bina tabiat teknologi yang lebih selamat.
        </p>

        <Link href="/discovery">
          <button className="bg-green-400 text-[#0b3d2e] px-8 py-3 rounded-full font-semibold hover:bg-green-300 transition shadow-lg">
            🚀 Mula Sekarang
          </button>
        </Link>
      </section>

      {/* ABOUT */}

      <About />


      {/* FEATURES */}
      <section className="px-6 py-24">
        <h2 className="text-3xl font-bold text-center mb-16">
          Terokai Platform Kami
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {/* CARD */}
          <Link href="/discovery">
            <div className="group bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl hover:scale-105 transition cursor-pointer shadow-lg">
              <h3 className="text-xl font-bold mb-3 text-yellow-300">
                📘 Maklumat
              </h3>
              <p className="text-gray-200">
                Ketahui tentang scam, phishing dan ancaman siber lain.
              </p>
            </div>
          </Link>

          {/* CARD */}
          <Link href="/quiz">
            <div className="group bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl hover:scale-105 transition cursor-pointer shadow-lg">
              <h3 className="text-xl font-bold mb-3 text-yellow-300">
                🎮 Kuiz
              </h3>
              <p className="text-gray-200">
                Uji pengetahuan anda melalui situasi dunia sebenar.
              </p>
            </div>
          </Link>

          {/* CARD */}
          <Link href="/survey">
            <div className="group bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl hover:scale-105 transition cursor-pointer shadow-lg">
              <h3 className="text-xl font-bold mb-3 text-yellow-300">
                📊 Tinjauan
              </h3>
              <p className="text-gray-200">
                Kongsikan pengalaman anda untuk bantu komuniti.
              </p>
            </div>
          </Link>

        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <div className="max-w-3xl mx-auto bg-linear-to-r from-green-400/20 to-emerald-300/20 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-xl">

          <h2 className="text-3xl font-bold mb-4">
            Jom jadi pengguna digital yang bijak 🔐
          </h2>

          <p className="text-gray-200 mb-8">
            Ambil langkah pertama untuk melindungi diri anda sekarang.
          </p>

          <Link href="/discovery">
            <button className="bg-green-400 text-[#0b3d2e] px-8 py-3 rounded-full font-semibold hover:bg-green-300 transition">
              Mula Sekarang
            </button>
          </Link>

        </div>
      </section>

    </main>
  );
}