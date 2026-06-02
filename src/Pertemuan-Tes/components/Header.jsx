import { AiFillBell } from "react-icons/ai"; 
export default function Header() {
  return (
    <div className="p-6 flex justify-between items-center bg-transparent">
      <div>
        <h1 className="text-2xl font-extrabold text-[#2D1606]">Halo, Juragan! </h1>
        <p className="text-sm text-gray-400 font-medium italic">Ayam gorengmu sudah wangi hari ini.</p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold">Admin Jagoan</p>
          <p className="text-[10px] text-yellow-600 font-bold">POS VERSION 1.2</p>
        </div>
        <div className="relative w-12 h-12 bg-white rounded-2xl shadow-sm border border-yellow-100 flex items-center justify-center cursor-pointer hover:bg-yellow-50 transition-colors">
         <AiFillBell className="text-yellow-500 text-2xl" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </div>
      </div>
    </div>
  );
} 