export default function About() {
  
  return (
    <>
      {/* ================= KENALI KAMI ================= */}
      <section id="kenalikami" className="bg-[#f5f1eb] text-[#0b3d2e] px-8 py-20">
        <div className="max-w-6xl mx-auto text-center">

          <div className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
            KENALI KAMI
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Siapa Kami & Apa Yang Kami Buat?
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Bijak Digital adalah projek literasi digital yang direka khas untuk
            pelajar sekolah Malaysia. Kami nak pastikan kamu tahu cara guna
            internet dengan selamat dan bertanggungjawab.
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: "🎯",
                title: "Misi Kami",
                desc: "Melahirkan generasi muda Malaysia yang bijak, selamat, dan bertanggungjawab dalam menggunakan teknologi digital.",
                color: "text-green-700",
              },
              {
                icon: "❤️",
                title: "Nilai Kami",
                desc: "Kami percaya setiap pelajar berhak tahu cara melindungi diri di internet — dalam bahasa yang mudah difahami.",
                color: "text-orange-500",
              },
              {
                icon: "📖",
                title: "Pendekatan Kami",
                desc: "Belajar melalui permainan, simulasi, dan cabaran interaktif — bukan buku teks yang membosankan!",
                color: "text-red-500",
              },
              {
                icon: "🌐",
                title: "Skop Kami",
                desc: "Merangkumi topik AI, buli siber, berita palsu, privasi data, dan undang-undang digital Malaysia.",
                color: "text-green-700",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-left"
              >
                <div className={`${card.color} text-2xl mb-4`}>
                  {card.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PEMANDU WIRA ================= 
      <section className="bg-[#f5f1eb] text-[#0b3d2e] px-8 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-12">
            Pemandu Wira Kamu
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🧑‍💻",
                name: "Abang Cyber",
                role: "Pemandu Wira Digital",
                quote: "Jom kita belajar cara nak jadi bijak di internet!",
                color: "text-green-700",
              },
              {
                icon: "👩‍💻",
                name: "Kakak Cyber",
                role: "Pakar Keselamatan Siber",
                quote: "Aku akan tunjuk cara protect diri kamu online!",
                color: "text-orange-500",
              },
              {
                icon: "🧑‍⚖️",
                name: "Encik Bijak",
                role: "Penasihat Undang-undang Digital",
                quote: "Tahu hak dan tanggungjawab kamu di dunia siber.",
                color: "text-red-500",
              },
            ].map((person, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 hover:-translate-y-1 transition"
              >
                <div className="text-4xl mb-4">{person.icon}</div>
                <h3 className="font-semibold text-lg">{person.name}</h3>
                <p className={`${person.color} text-sm mb-2`}>
                  {person.role}
                </p>
                <p className="text-gray-500 italic text-sm">
                  "{person.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ================= CTA ================= */}
      <section className="bg-[#f5f1eb] px-8 pb-20">
        <div className="max-w-5xl mx-auto bg-[#0b3d2e] text-white rounded-2xl p-10 text-center shadow-lg">
          <p className="text-yellow-400 font-semibold mb-2">
            TENTANG KAMI
          </p>

          <h2 className="text-3xl font-bold mb-4">
            Pasukan Projek Ini
          </h2>

          <p className="text-gray-200">
            Kami sekumpulan pelajar yang komited meningkatkan kesedaran keselamatan siber.
            Platform ini direka untuk pembelajaran interaktif, mudah difahami dan menyeronokkan.
          </p>
        </div>

        
      </section>
    </>
  );
}