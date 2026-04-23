export default function Sudutpenjaga() {
  return (
    <>
      <section id="sudutpenjaga" className="bg-[#0b3d2e] text-white px-8 py-20">
        <div className="max-w-6xl mx-auto">
          {/* HEADER */}
          <div className="text-center mb-16">
            <div className="inline-block bg-yellow-600/20 text-yellow-400 px-4 py-1 rounded-full text-sm mb-4">
              SUDUT PENJAGA
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Untuk Ibu Bapa & Guru 👨‍👩‍👧‍👦
            </h2>

            <p className="text-gray-300 max-w-2xl mx-auto">
              Maklumat penting tentang undang-undang digital Malaysia, ancaman
              AI, dan cara melindungi anak-anak kamu di dunia siber.
            </p>
          </div>

          {/* CONTENT GRID */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* LEFT IMAGE */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/sudut-penjaga.png" // replace with your image
                alt="Sudut Penjaga"
                className="w-full h-full object-cover"
              />
            </div>

            {/* RIGHT CONTENT */}
            <div>
              <h3 className="text-xl font-semibold mb-6">
                Cara Lindungi Anak Kamu Online
              </h3>

              <div className="space-y-4">
                {/* ITEM 1 */}
                <div className="flex gap-4 bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition">
                  <div className="w-8 h-8 flex items-center justify-center bg-orange-500 text-white rounded-full font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold">Buka komunikasi</h4>
                    <p className="text-sm text-gray-300">
                      Bercakap dengan anak tentang pengalaman mereka online.
                      Jangan tunjuk reaksi negatif supaya mereka tidak takut
                      untuk cerita masalah.
                    </p>
                  </div>
                </div>

                {/* ITEM 2 */}
                <div className="flex gap-4 bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition">
                  <div className="w-8 h-8 flex items-center justify-center bg-orange-500 text-white rounded-full font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold">
                      Tetapkan peraturan digital
                    </h4>
                    <p className="text-sm text-gray-300">
                      Buat "Perjanjian Digital Keluarga" — masa skrin, app yang
                      dibenarkan, dan apa yang boleh/tidak boleh dikongsi
                      online.
                    </p>
                  </div>
                </div>

                {/* ITEM 3 */}
                <div className="flex gap-4 bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition">
                  <div className="w-8 h-8 flex items-center justify-center bg-orange-500 text-white rounded-full font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold">Pantau tanpa mengintip</h4>
                    <p className="text-sm text-gray-300">
                      Gunakan kawalan ibu bapa (parental controls). Letakkan
                      peranti di kawasan umum rumah.
                    </p>
                  </div>
                </div>

                {/* ITEM 4 */}
                <div className="flex gap-4 bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition">
                  <div className="w-8 h-8 flex items-center justify-center bg-orange-500 text-white rounded-full font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold">Ajar cara report</h4>
                    <p className="text-sm text-gray-300">
                      Pastikan anak tahu cara melaporkan kandungan atau pengguna
                      mencurigakan di platform yang mereka gunakan.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UNDANG-UNDANG + AI ANCAMAN + CONTACT */}
      <section className="bg-[#0b3d2e] text-white px-8 pb-24">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* ===================== */}
          {/* UNDANG-UNDANG */}
          {/* ===================== */}
          <div>
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              ⚖️ Rujukan Undang-undang Malaysia
            </h3>
            <p className="text-gray-300 mb-6 text-sm">
              Buli Siber dan Penyebaran Berita Palsu adalah JENAYAH SEBENAR di
              Malaysia.
            </p>

            <div className="space-y-4">
              {/* ITEM */}
              <div className="bg-green-900/40 border border-green-700 rounded-xl p-4 flex justify-between items-center hover:bg-green-800/50 transition">
                <div>
                  <p className="font-semibold">
                    Akta Komunikasi dan Multimedia 1998 (Akta 588)
                  </p>
                  <p className="text-xs text-yellow-400">Seksyen 211 & 233</p>
                </div>
                <span>⌄</span>
              </div>

              <div className="bg-green-900/40 border border-green-700 rounded-xl p-4 flex justify-between items-center hover:bg-green-800/50 transition">
                <div>
                  <p className="font-semibold">Akta Jenayah Komputer 1997</p>
                  <p className="text-xs text-yellow-400">Seksyen 3, 4 & 5</p>
                </div>
                <span>⌄</span>
              </div>

              <div className="bg-green-900/40 border border-green-700 rounded-xl p-4 flex justify-between items-center hover:bg-green-800/50 transition">
                <div>
                  <p className="font-semibold">
                    Akta Hasutan 1948 (Pindaan 2015)
                  </p>
                  <p className="text-xs text-yellow-400">Seksyen 4</p>
                </div>
                <span>⌄</span>
              </div>
            </div>
          </div>

          {/* ===================== */}
          {/* AI ANCAMAN */}
          {/* ===================== */}
          <div>
            <h3 className="text-xl font-bold mb-6">
              🛡️ Ancaman AI yang Perlu Kamu Tahu
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* CARD */}
              <div className="bg-green-900/40 border border-green-700 rounded-xl p-5">
                <p className="font-semibold mb-1">🎭 Deepfake</p>
                <span className="text-xs bg-red-500 px-2 py-1 rounded-full">
                  Kritikal
                </span>
                <p className="text-sm text-gray-300 mt-2">
                  AI boleh cipta video palsu yang nampak real. Penjenayah boleh
                  salah guna muka kamu.
                </p>
              </div>

              <div className="bg-green-900/40 border border-green-700 rounded-xl p-5">
                <p className="font-semibold mb-1">🎤 Voice Cloning</p>
                <span className="text-xs bg-yellow-500 px-2 py-1 rounded-full">
                  Tinggi
                </span>
                <p className="text-sm text-gray-300 mt-2">
                  AI boleh tiru suara untuk menipu ahli keluarga.
                </p>
              </div>

              <div className="bg-green-900/40 border border-green-700 rounded-xl p-5">
                <p className="font-semibold mb-1">⚠️ Predator Online</p>
                <span className="text-xs bg-red-500 px-2 py-1 rounded-full">
                  Kritikal
                </span>
                <p className="text-sm text-gray-300 mt-2">
                  Penjenayah guna AI untuk buat profil palsu dan manipulasi
                  emosi.
                </p>
              </div>

              <div className="bg-green-900/40 border border-green-700 rounded-xl p-5">
                <p className="font-semibold mb-1">📧 Phishing Pintar</p>
                <span className="text-xs bg-yellow-500 px-2 py-1 rounded-full">
                  Tinggi
                </span>
                <p className="text-sm text-gray-300 mt-2">
                  Email/scam yang nampak sangat real guna AI.
                </p>
              </div>
            </div>
          </div>

          {/* ===================== */}
          {/* CONTACT */}
          {/* ===================== */}
          <div className="bg-linear-to-r from-green-800 to-green-900 rounded-2xl p-8 border border-yellow-500/30">
            <h3 className="text-lg font-semibold mb-6">
              📞 Hubungi Jika Berlaku Insiden Siber
            </h3>

            <div className="grid md:grid-cols-3 gap-6 text-center">
              {/* CONTACT 1 */}
              <div className="bg-black/20 rounded-xl p-4">
                <p className="text-sm text-gray-300">CyberSecurity Malaysia</p>
                <p className="text-xl font-bold text-yellow-400">
                  1-300-88-2999
                </p>
                <p className="text-xs text-gray-400">Aduan insiden siber</p>
              </div>

              {/* CONTACT 2 */}
              <div className="bg-black/20 rounded-xl p-4">
                <p className="text-sm text-gray-300">MCMC Aduan</p>
                <p className="text-xl font-bold text-yellow-400">
                  1-800-18-8878
                </p>
                <p className="text-xs text-gray-400">
                  Aduan kandungan internet
                </p>
              </div>

              {/* CONTACT 3 */}
              <div className="bg-black/20 rounded-xl p-4">
                <p className="text-sm text-gray-300">Polis Diraja Malaysia</p>
                <p className="text-xl font-bold text-yellow-400">999</p>
                <p className="text-xs text-gray-400">Kecemasan jenayah siber</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
