export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white/90 backdrop-blur-md text-black rounded-b-2xl ">
      <div className="flex items-center gap-2 font-semibold">
        <div className="w-8 h-8 bg-green-700 rounded-full"></div>
        <span>Bijak Digital</span>
      </div>

      <div className="hidden md:flex gap-6 text-sm font-medium">
        <a href="#" className="text-green-700 font-semibold">Utama</a>
        <a href="#">Kenali Kami</a>
        <a href="#">Zon Pelajar</a>
        <a href="#">Sudut Penjaga</a>
        <a href="#">Cabaran Digital</a>
        <a href="#">Ruang Suara</a>
      </div>

      <button className="bg-orange-500 text-black px-4 py-2 rounded-full font-semibold hover:bg-orange-600">
        Mula Cabaran!
      </button>
    </nav>
  );
}