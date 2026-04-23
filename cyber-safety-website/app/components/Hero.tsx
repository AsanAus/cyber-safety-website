import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center pt-24 pb-16">
      {/* LEFT CONTENT */}
      <div>
        <div className="inline-block bg-yellow-600/20 text-yellow-400 px-4 py-1 rounded-full text-sm mb-4">
          Program Literasi Digital Malaysia
        </div>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Jadilah <span className="text-yellow-400">Wira Siber</span>
          <br />
          Masa Hadapan!
        </h1>

        <p className="mt-6 text-gray-300 max-w-lg">
          Internet ni tempat yang best, tapi kena tahu cara guna dengan betul.
          Jom kita belajar sama-sama macam mana nak jadi{" "}
          <span className="text-yellow-400 font-semibold">
            bijak, selamat, dan bertanggungjawab
          </span>{" "}
          di dunia digital!
        </p>

        {/* BUTTONS */}
        <div className="flex gap-4 mt-8">
          <Link href="/discovery#zonpelajar">
            <button className="bg-orange-400 px-6 py-3 rounded-full font-semibold hover:bg-orange-500">
              🚀 Mula Perjalanan
            </button>
          </Link>

          <Link href="/quiz">
            <button className="border border-white/30 px-6 py-3 rounded-full font-semibold hover:bg-white/10">
              🎯 Cuba Cabaran
            </button>
          </Link>
        </div>

        {/* STATS */}
        <div className="flex gap-10 mt-12 text-center">
          <div>
            <h3 className="text-2xl font-bold text-yellow-400">6</h3>
            <p className="text-sm text-gray-300">Modul Pembelajaran</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-yellow-400">3</h3>
            <p className="text-sm text-gray-300">Mini Games Interaktif</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-yellow-400">100%</h3>
            <p className="text-sm text-gray-300">Percuma untuk Pelajar</p>
          </div>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="relative">
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="/hero.jpeg"
            alt="Hero"
            width={600}
            height={400}
            className="object-cover w-full h-full"
          />
        </div>

        {/* FLOATING BADGE */}
        <div className="absolute bottom-4 left-4 bg-white text-black px-4 py-2 rounded-2xl shadow-md text-sm">
          <span className="font-semibold">Bijak Digital</span>
          <br />
          <span className="text-xs text-gray-500">Wira Siber Malaysia</span>
        </div>
      </div>
    </section>
  );
}
