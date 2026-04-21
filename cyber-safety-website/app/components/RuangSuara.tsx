export default function RuangSuara() {
  return (
    <>
      {/* RUANG SUARA */}
      <section className="bg-[#f5f1eb] text-[#0b3d2e] px-8 py-20">
        <div className="max-w-6xl mx-auto">
          {/* HEADER */}
          <div className="text-center mb-12">
            <div className="inline-block bg-green-800 text-white px-4 py-1 rounded-full text-sm mb-4">
              RUANG SUARA
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Apa Kata Mereka? 💬
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto">
              Dengar pengalaman pelajar, guru, dan ibu bapa yang telah menyertai
              program Bijak Digital.
            </p>
          </div>

          {/* STATS */}
          <div className="grid md:grid-cols-4 gap-6 mb-12 text-center">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-2xl font-bold">12+</h3>
              <p className="text-sm text-gray-500">Sekolah Terlibat</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-2xl font-bold">500+</h3>
              <p className="text-sm text-gray-500">Pelajar Dididik</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-2xl font-bold">95%</h3>
              <p className="text-sm text-gray-500">Kepuasan Pelajar</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-2xl font-bold">3</h3>
              <p className="text-sm text-gray-500">Daerah Dicapai</p>
            </div>
          </div>

          {/* TESTIMONIALS */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* CARD 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-md border">
              <h4 className="font-semibold mb-1">Cik Norhaida binti Ahmad</h4>
              <p className="text-xs text-gray-500 mb-2">
                Guru Kaunseling, SMK Wangsa Maju
              </p>
              <p className="text-yellow-500 mb-3">★★★★★</p>

              <p className="text-sm text-gray-600 italic">
                "Program ini sangat berguna untuk pelajar. Penyampaian santai
                dan interaktif membuatkan mereka lebih faham."
              </p>

              <div className="mt-4 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full inline-block">
                ✨ Pelajar lebih terbuka berbincang
              </div>
            </div>

            {/* CARD 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-md border">
              <h4 className="font-semibold mb-1">Encik Razif bin Hamid</h4>
              <p className="text-xs text-gray-500 mb-2">
                Ibu Bapa, Kuala Lumpur
              </p>
              <p className="text-yellow-500 mb-3">★★★★★</p>

              <p className="text-sm text-gray-600 italic">
                "Anak saya mula semak berita palsu sendiri. Saya rasa lebih
                lega."
              </p>

              <div className="mt-4 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full inline-block">
                ✨ Anak ajar ibu bapa pula
              </div>
            </div>

            {/* CARD 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-md border">
              <h4 className="font-semibold mb-1">
                Nurul Izzah binti Kamarudin
              </h4>
              <p className="text-xs text-gray-500 mb-2">Pelajar Tingkatan 4</p>
              <p className="text-yellow-500 mb-3">★★★★★</p>

              <p className="text-sm text-gray-600 italic">
                "Sekarang aku dah jadi fact-checker dalam keluarga!"
              </p>

              <div className="mt-4 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full inline-block">
                ✨ Jadi fact-checker keluarga
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-linear-to-r from-orange-400 to-orange-500 rounded-2xl p-10 text-center text-black shadow-lg">
            <h3 className="text-xl md:text-2xl font-bold mb-3">
              Nak Jemput Program Bijak Digital ke Sekolah Kamu?
            </h3>

            <p className="mb-6 text-sm">
              Kami sedia hadir ke sekolah kamu untuk sesi interaktif yang lebih
              mendalam. Hubungi kami sekarang!
            </p>

            <button className="bg-[#0b3d2e] text-white px-6 py-3 rounded-full font-semibold hover:bg-black transition">
              📩 Hubungi Kami
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
