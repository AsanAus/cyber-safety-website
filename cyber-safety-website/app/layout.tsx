import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/app/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bijak Digital",
  description: "Platform Kesedaran Keselamatan Siber",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col">
        <Navigation/>
        <div className="flex-1">
          {children}
        </div>
        
        {/* FOOTER */}
      <footer className="bg-[#06281f] text-white px-8 pt-16 pb-6">
        <div className="max-w-6xl mx-auto">
          {/* TOP GRID */}
          <div className="grid md:grid-cols-3 gap-10 mb-12">
            {/* LEFT */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                
                <img src="/logo.png" alt="Logo" width={50} height={50} />

                <div>
                  <h3 className="font-bold text-lg">Bijak Digital</h3>
                  <p className="text-sm text-gray-400">
                    Wira Siber Masa Hadapan
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-400 mb-6">
                Platform literasi digital percuma untuk pelajar Malaysia.
                Belajar, bermain, dan jadi Wira Siber!
              </p>

              {/* SOCIAL ICONS */}
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-green-800 rounded-lg flex items-center justify-center hover:bg-green-700 cursor-pointer">
                  📘
                </div>
                <div className="w-10 h-10 bg-green-800 rounded-lg flex items-center justify-center hover:bg-green-700 cursor-pointer">
                  📸
                </div>
                <div className="w-10 h-10 bg-green-800 rounded-lg flex items-center justify-center hover:bg-green-700 cursor-pointer">
                  🎵
                </div>
                <div className="w-10 h-10 bg-green-800 rounded-lg flex items-center justify-center hover:bg-green-700 cursor-pointer">
                  ▶️
                </div>
              </div>
            </div>

            {/* NAVIGATION */}
            <div>
              <h4 className="font-semibold mb-4">Navigasi</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer"> Laman Utama</li>
                <li className="hover:text-white cursor-pointer">Kenali Kami</li>
                <li className="hover:text-white cursor-pointer">Zon Pelajar</li>
                <li className="hover:text-white cursor-pointer">
                  Sudut Penjaga
                </li>
                <li className="hover:text-white cursor-pointer">
                  Cabaran Digital
                </li>
                <li className="hover:text-white cursor-pointer">Survey</li>
              </ul>
            </div>

            {/* USEFUL LINKS */}
            <div>
              <h4 className="font-semibold mb-4">Sumber Berguna</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer">
                  CyberSecurity Malaysia ↗
                </li>
                <li className="hover:text-white cursor-pointer">
                  MCMC Malaysia ↗
                </li>
                <li className="hover:text-white cursor-pointer">
                  Kementerian Pendidikan Malaysia ↗
                </li>
                <li className="hover:text-white cursor-pointer">
                  Talian Kasih 15999 ↗
                </li>
              </ul>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="border-t border-white/10 pt-6 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center gap-3">
            <p>
              © 2026 Bijak Digital. Hak Cipta Terpelihara. Di bawah bimbingan Dr. Zalina Binti Abdul Halim.
            </p>

            <p className="text-xs text-gray-500">
              Program Literasi Digital Malaysia | Untuk kegunaan pendidikan
              sahaja
            </p>
          </div>
        </div>
      </footer>
        </body>
        
    </html>
    

    
  );
}
