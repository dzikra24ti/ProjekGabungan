import { AiOutlineCheck, AiOutlineDollar, AiOutlineDashboard } from "react-icons/ai";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
    return (
        <div className="space-y-6 animate-in fade-in bg-stone-50 text-stone-800 font-sans">
            
            {/* 1. PEMANGGILAN PAGE HEADER MURNI */}
            <PageHeader 
                icon={<AiOutlineDashboard />}
                title="Overview Dashboard" 
                description="Ringkasan data finansial, volume penjualan, dan tingkat kepadatan antrean kedai hari ini secara real-time." 
            />

            {/* 2. RINGKASAN METRIK FINANSIAL */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-stone-200/60 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Omzet Hari Ini</p>
                        <p className="text-lg font-black tracking-tight text-stone-900">Rp 2.000.000</p>
                    </div>
                    <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center text-stone-600 shadow-inner">
                        <AiOutlineDollar className="text-lg" />
                    </div>
                </div>
                
                <div className="bg-white p-5 rounded-2xl border border-stone-200/60 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Volume Penjualan</p>
                        <p className="text-lg font-black tracking-tight text-stone-900">74 Transaksi</p>
                    </div>
                    <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center text-stone-600 shadow-inner">
                        <AiOutlineCheck className="text-lg" />
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-stone-200/60 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-black text-stone-500 uppercase tracking-widest mb-1">Tingkat Kepadatan</p>
                        <p className="text-sm font-extrabold tracking-wide text-stone-600 uppercase">Jam Sibuk (Ramai)</p>
                    </div>
                    <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center text-base">☕</div>
                </div>
            </section>

            {/* 3. GRAFIK ATAU INFORMASI PANDUAN SISTEM */}
            <div className="bg-white p-8 rounded-2xl border border-stone-200/60 shadow-sm text-center space-y-2">
                <div className="w-12 h-12 bg-stone-100 text-stone-700 rounded-xl flex items-center justify-center mx-auto text-lg font-bold border border-stone-200/40">
                    🪵
                </div>
                <h3 className="text-xs font-black text-stone-800 uppercase tracking-widest pt-2">Sistem Manajemen POS Patria Ready</h3>
                <p className="text-xs text-stone-400 max-w-md mx-auto leading-relaxed">
                    Silakan gunakan panel navigasi di sebelah kiri untuk menginput data pesanan baru pelanggan (Kasir Cepat) atau melihat log riwayat nota masuk.
                </p>
            </div>

        </div>
    );
}