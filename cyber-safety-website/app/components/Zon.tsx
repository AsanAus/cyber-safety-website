export default function Zon() {
  const tips = [
    {
      no: "01",
      title: "Semak URL website",
      desc: "Pastikan ada 'https://' dan nama domain betul sebelum masukkan maklumat.",
    },
    {
      no: "02",
      title: "Jangan share password",
      desc: "Walaupun dengan kawan baik! Password tu macam kunci rumah.",
    },
    {
      no: "03",
      title: "Fikir dua kali sebelum post",
      desc: "Apa yang kamu post online boleh kekal selamanya.",
    },
    {
      no: "04",
      title: "Report buli siber",
      desc: "Jangan diam — lapor kepada orang dewasa yang dipercayai.",
    },
  ];

  const tutorials = [
    {
      type: "Tutorial Video",
      title: "Cara Kesan Profil Palsu",
      desc: "Pelajari tanda-tanda akaun palsu di media sosial dan cara melindungi diri kamu.",
      time: "2 minit",
      color: "text-green-700",
    },
    {
      type: "Panduan Interaktif",
      title: "Guna AI untuk Homework (Cara Betul)",
      desc: "AI boleh bantu kamu belajar, tapi ada cara yang betul dan salah.",
      time: "3 minit",
      color: "text-orange-500",
    },
    {
      type: "Infografik",
      title: "Kenali Berita Palsu (Hoax)",
      desc: "Macam mana nak tahu berita itu betul atau auta? Ada 5 cara mudah!",
      time: "1 minit",
      color: "text-red-500",
    },
  ];

  return (
    <section id="zonpelajar" className="bg-[#f5f1eb] text-[#0b3d2e] px-8 py-20">
      <div className="max-w-6xl mx-auto">

        {/* ================= HEADER ================= */}
        <div className="text-center mb-12">
          <div className="inline-block bg-green-800 text-white px-4 py-1 rounded-full text-sm mb-4">
            ZON PELAJAR
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Belajar Sambil Seronok! 🎮
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Jom kita tengok macam mana nak jadi hebat di internet! Tiada kuliah membosankan — hanya tutorial pendek, permainan, dan cabaran seru!
          </p>
        </div>

        {/* ================= TOP CONTENT ================= */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-16">

          {/* IMAGE */}
          <div className="rounded-2xl overflow-hidden shadow-md">
            <img
              src="/zone-pelajar.png"
              alt="Zon Pelajar"
              className="w-full h-full object-cover"
            />
          </div>

          {/* CONTENT */}
          <div className="space-y-4">

            {/* QUOTE */}
            <div className="bg-white rounded-xl p-4 border shadow-sm">
              <p className="font-semibold text-sm mb-1">
                🧑‍💻 Abang Cyber berkata:
              </p>
              <p className="text-sm text-gray-600">
                "Jom kita tengok macam mana nak kekal selamat di internet! Kamu tak perlu jadi pakar IT — cukup tahu 5 perkara asas untuk selamat online."
              </p>
            </div>

            {/* TIPS */}
            <div className="grid grid-cols-2 gap-4">
              {tips.map((tip, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border shadow-sm">
                  <p className="text-xs text-orange-500 font-semibold">{tip.no}</p>
                  <h4 className="font-semibold text-sm">{tip.title}</h4>
                  <p className="text-xs text-gray-500">{tip.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ================= TUTORIAL ================= 
        <div>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            📚 Tutorial & Panduan
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {tutorials.map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-lg transition"
              >
                <p className={`text-xs mb-2 ${item.color}`}>
                  {item.type}
                </p>

                <h4 className="font-semibold mb-2">
                  {item.title}
                </h4>

                <p className="text-sm text-gray-600 mb-4">
                  {item.desc}
                </p>

                <div className="flex justify-between text-xs text-gray-400">
                  <span>⏱ {item.time}</span>
                  <span className={`${item.color} font-semibold cursor-pointer`}>
                    ▶ Mula
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div> */}

      </div>
    </section>

            
  );
}