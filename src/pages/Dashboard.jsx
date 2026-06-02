import { AiOutlineCheck } from "react-icons/ai"; 
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
    return (
        <div className="space-y-8 animate-in fade-in">
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-[32px] shadow-sm border border-yellow-50">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Pendapatan Hari Ini</p>
                    <p className="text-2xl font-black text-gray-800">Rp 2.000.000</p>
                </div>
                <div className="bg-white p-6 rounded-[32px] shadow-sm border border-yellow-50">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Laba Bersih</p>
                    <p className="text-2xl font-black text-green-600">Rp 700.000</p>
                </div>
                <div className="bg-[#FFFBEB] p-6 rounded-[32px] border-2 border-dashed border-yellow-300 hidden lg:block">
                    <p className="text-xs font-bold text-yellow-700 uppercase tracking-widest mb-1">Status Kedai</p>
                    <p className="text-xl font-black text-yellow-700 italic">🔥 SANGAT RAMAI</p>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                <section className="bg-white p-8 rounded-[40px] shadow-xl shadow-yellow-900/5 border border-yellow-50">
                    <PageHeader title="Kasir Cepat"/>
                    <div className="space-y-5">

                        <div className="flex items-center justify-between p-2 hover:bg-yellow-50 rounded-2xl transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center text-2xl shadow-inner">🍗</div>
                                <div>
                                    <h3 className="font-extrabold text-sm text-gray-800">Paha Atas</h3>
                                    <p className="text-xs font-bold text-yellow-600 tracking-tighter">Rp 12.000</p>
                                </div>
                            </div>
                            <div className="flex items-center bg-gray-50 rounded-2xl p-1.5 border border-gray-100 shadow-sm">
                                <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-yellow-600">-</button>
                                <span className="w-8 text-center font-black text-sm">2</span>
                                <button className="w-8 h-8 bg-white shadow rounded-xl flex items-center justify-center text-yellow-600 font-bold">+</button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-2 hover:bg-yellow-50 rounded-2xl transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center text-2xl shadow-inner">🍚</div>
                                <div>
                                    <h3 className="font-extrabold text-sm text-gray-800">Nasi Putih</h3>
                                    <p className="text-xs font-bold text-yellow-600 tracking-tighter">Rp 5.000</p>
                                </div>
                            </div>
                            <div className="flex items-center bg-gray-50 rounded-2xl p-1.5 border border-gray-100 shadow-sm">
                                <button className="w-8 h-8 flex items-center justify-center text-gray-400">-</button>
                                <span className="w-8 text-center font-black text-sm">1</span>
                                <button className="w-8 h-8 bg-white shadow rounded-xl flex items-center justify-center text-yellow-600 font-bold">+</button>
                            </div>
                        </div>
                    </div>

                    <button className="w-full mt-10 bg-yellow-500 text-white py-5 rounded-[24px] font-black shadow-2xl shadow-yellow-900/20 active:scale-95 transition-all flex justify-between px-8">
                        <span>BAYAR</span>
                        <span>Rp 29.000</span>
                    </button>
                </section>

                <div className="space-y-8">

                    <section className="bg-[#FFFBEB] p-8 rounded-[40px] border border-yellow-200 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-sm font-black text-yellow-800/60 uppercase tracking-widest">🕒 Pesanan Terbaru</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center bg-white/50 p-4 rounded-2xl border border-white/50 shadow-sm transition-transform hover:scale-[1.02]">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-yellow-500 text-white rounded-xl flex items-center justify-center shadow-md shadow-yellow-100">
                                        <AiOutlineCheck />
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-extrabold text-gray-800 tracking-tight">2x Paha Atas, 1x Nasi</p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Baru Saja • Tunai</p>
                                    </div>
                                </div>
                                <p className="text-sm font-black text-yellow-700">Rp 29k</p>
                            </div>

                            <div className="flex justify-between items-center bg-white/50 p-4 rounded-2xl border border-white/50 shadow-sm transition-transform hover:scale-[1.02]">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-yellow-500 text-white rounded-xl flex items-center justify-center shadow-md shadow-yellow-100">
                                        <AiOutlineCheck />
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-extrabold text-gray-800 tracking-tight">1x Paket Puas</p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">5 Menit Lalu • QRIS</p>
                                    </div>
                                </div>
                                <p className="text-sm font-black text-yellow-700">Rp 18k</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}