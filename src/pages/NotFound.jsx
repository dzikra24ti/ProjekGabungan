import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center animate-fade-in">
      {/* Ilustrasi atau Icon besar */}
      <div className="relative mb-8">
        <h1 className="text-[12rem] font-black text-yellow-100 leading-none">404</h1>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-6xl">🍗</span>
          <p className="text-2xl font-black text-gray-800 mt-4">Waduh, Nyasar!</p>
        </div>
      </div>

      <div className="max-w-md px-6">
        <h2 className="text-gray-600 font-medium mb-8">
          Halaman yang kamu cari tidak ditemukan atau mungkin sudah dipindah ke kandang lain.
        </h2>

        {/* Tombol kembali ke Dashboard */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-3 bg-[#F59E0B] text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-yellow-200 hover:bg-[#D97706] transition-all transform hover:-translate-y-1 active:scale-95"
        >
          <AiFillHome className="text-xl" />
          Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;