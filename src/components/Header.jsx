import { AiOutlineSetting, AiOutlineDatabase, AiOutlineMuted } from "react-icons/ai";

export default function Header() {
    // Mendapatkan tanggal hari ini secara dinamis
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = new Date().toLocaleDateString('id-ID', options);

    return (
        <header className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm shadow-stone-900/5">
            
            {/* Sisi Kiri: Branding & Status Database */}
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-stone-800 rounded-xl flex items-center justify-center text-xl text-stone-100 shadow-md">
                    ☕
                </div>
                <div>
                    <span className="text-xs font-black text-stone-400 uppercase tracking-widest block">Sistem POS v1.0</span>
                    <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-stone-800 tracking-tight">Warung Patria</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Sistem Online"></span>
                    </div>
                </div>
            </div>

            {/* Sisi Kanan: Info Waktu & Aksi Quick Tools */}
            <div className="flex items-center gap-6">
                {/* Penunjuk Tanggal Aktif */}
                <div className="hidden md:block text-right">
                    <p className="text-xs font-bold text-stone-700">{dateString}</p>
                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mt-0.5">Database Lokal Terkoneksi</p>
                </div>

                {/* Garis Pembatas Vertikal */}
                <div className="hidden md:block w-px h-8 bg-stone-200"></div>

                {/* Tombol Navigasi Utilitas */}
                <div className="flex items-center gap-2">
                    <button className="p-2.5 text-stone-500 hover:text-stone-800 hover:bg-stone-50 rounded-xl transition-all" title="Status Sinkronisasi Data">
                        <AiOutlineDatabase className="text-lg" />
                    </button>
                    <button className="p-2.5 text-stone-500 hover:text-stone-800 hover:bg-stone-50 rounded-xl transition-all" title="Pengaturan Sistem">
                        <AiOutlineSetting className="text-lg" />
                    </button>
                </div>
            </div>

        </header>
    );
}