import Link from "next/link";
import About from "@/app/components/About";
import Welcome from "@/app/components/Welcome";

export default function Home() {
  return (
    <main id="home" className="bg-[#0b3d2e] min-h-screen text-white">
      {/* Glow Effect */}
      <div className="absolute w-100 h-100 bg-green-400 opacity-20 blur-3xl rounded-full -top-25 -left-25" />
      <div className="absolute w-75 h-75 bg-emerald-300 opacity-20 blur-3xl rounded-full -bottom-20 -right-20" />

      <Welcome />

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

      {/* ABOUT */}

      <About />

      {/* FEATURES */}
      <section className="bg-[#f5f1eb] pt-24">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <div className="inline-block bg-[#0b3d2e] text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
            Navigasi Utama
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Terokai Platform Kami!
          </h2>

          <p className="text-gray-500 max-w-xl mx-auto">
            Pilih bahagian di bawah untuk mula belajar, bermain dan memahami
            dunia digital dengan lebih selamat.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* CARD */}
          <Link href="/discovery">
            <div className="group bg-gray-50 border p-8 rounded-3xl hover:shadow-xl hover:-translate-y-2 transition cursor-pointer">
              <div className="text-4xl mb-4">📘</div>

              <h3 className="text-xl font-bold mb-2 text-[#0b3d2e]">
                Maklumat
              </h3>

              <p className="text-gray-600 text-sm mb-4">
                Ketahui tentang scam, phishing dan ancaman siber lain.
              </p>

              <span className="text-sm text-indigo-600 font-medium group-hover:underline">
                Teroka →
              </span>
            </div>
          </Link>

          {/* CARD */}
          <Link href="/quiz">
            <div className="group bg-gray-50 border p-8 rounded-3xl hover:shadow-xl hover:-translate-y-2 transition cursor-pointer">
              <div className="text-4xl mb-4">🎮</div>

              <h3 className="text-xl font-bold mb-2 text-[#0b3d2e]">Kuiz</h3>

              <p className="text-gray-600 text-sm mb-4">
                Uji pengetahuan anda melalui situasi dunia sebenar.
              </p>

              <span className="text-sm text-indigo-600 font-medium group-hover:underline">
                Mula →
              </span>
            </div>
          </Link>

          {/* CARD */}
          <Link href="/survey">
            <div className="group bg-gray-50 border p-8 rounded-3xl hover:shadow-xl hover:-translate-y-2 transition cursor-pointer">
              <div className="text-4xl mb-4">📊</div>

              <h3 className="text-xl font-bold mb-2 text-[#0b3d2e]">
                Tinjauan
              </h3>

              <p className="text-gray-600 text-sm mb-4">
                Kongsikan pengalaman anda untuk bantu komuniti.
              </p>

              <span className="text-sm text-indigo-600 font-medium group-hover:underline">
                Sertai →
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f5f1eb] px-6 py-24 text-center">
        <div className="max-w-6xl mx-auto border border-gray-300 rounded-3xl p-12 backdrop-blur-md bg-orange-400">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Jom jadi pengguna digital yang bijak 🔐
          </h2>

          <p className="text-black mb-8">
            Ambil langkah pertama untuk melindungi diri anda daripada ancaman
            siber.
          </p>

          <Link href="/discovery">
            <button className="bg-[#0b3d2e] text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition shadow-md">
              Mula Sekarang
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
