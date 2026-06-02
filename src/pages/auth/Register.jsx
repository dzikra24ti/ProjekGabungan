import { AiFillLock, AiOutlineMail, AiOutlineUser } from "react-icons/ai"; 
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="w-full">
      {/* JUDUL TEMA JAGO AYAM */}
      <div className="text-center mb-8">
        <h2 className="text-[#F59E0B] font-black text-3xl tracking-tighter italic">JAGO AYAM.</h2>
      </div>

      <h3 className="text-xl font-black text-gray-800 mb-6 text-center">
        Create Your Account 
      </h3>

      <form className="space-y-4">
        {/* INPUT EMAIL */}
        <div>
          <label className="block text-xs font-black text-gray-500 mb-2 uppercase tracking-wider">
            Email Address
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
              <AiOutlineMail size={20} />
            </span>
            <input
              type="email"
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-yellow-100 rounded-2xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all placeholder-gray-400 text-sm font-medium"
              placeholder="you@example.com"
            />
          </div>
        </div>

        {/* INPUT PASSWORD */}
        <div>
          <label className="block text-xs font-black text-gray-500 mb-2 uppercase tracking-wider">
            Password
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
              <AiFillLock size={20} />
            </span>
            <input
              type="password"
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-yellow-100 rounded-2xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all placeholder-gray-400 text-sm font-medium"
              placeholder="********"
            />
          </div>
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="pb-2">
          <label className="block text-xs font-black text-gray-500 mb-2 uppercase tracking-wider">
            Confirm Password
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
              <AiFillLock size={20} />
            </span>
            <input
              type="password"
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-yellow-100 rounded-2xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all placeholder-gray-400 text-sm font-medium"
              placeholder="********"
            />
          </div>
        </div>

        {/* TOMBOL REGISTER */}
        <button
          type="submit"
          className="w-full bg-[#F59E0B] hover:bg-yellow-600 text-white font-black py-4 px-4 rounded-2xl transition-all duration-300 shadow-lg shadow-yellow-200 active:scale-95 uppercase tracking-widest text-sm"
        >
          Daftar Sekarang
        </button>
      </form>

      {/* FOOTER REGISTER */}
      <p className="mt-8 text-center text-sm text-gray-500 font-medium">
        Sudah punya akun?{" "}
        <Link to="/login" className="text-yellow-600 font-black hover:underline">
          Masuk Disini
        </Link>
      </p>
    </div>
  );
}