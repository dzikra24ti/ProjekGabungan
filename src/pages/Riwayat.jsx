import { AiOutlineHistory, AiOutlineSearch, AiOutlineCalendar } from "react-icons/ai";
import PageHeader from "../components/PageHeader";

export default function Riwayat() {
    // Data transaksi kedai dengan ID urut dari nomor 1
    const dataRiwayat = [
        { id: "01", waktu: "19:15", pelanggan: "Siti", item: "1x Teh Telor Bebek", total: 14000, status: "Selesai" },
        { id: "02", waktu: "19:30", pelanggan: "Meja 01", item: "3x Bandrek Susu", total: 36000, status: "Selesai" },
        { id: "03", waktu: "20:12", pelanggan: "Budi", item: "1x Bandrek, 1x Teh Telor", total: 26000, status: "Selesai" },
        { id: "04", waktu: "20:45", pelanggan: "Meja 04", item: "2x Teh Telor Bebek", total: 28000, status: "Selesai" },
    ];

    // Opsional: Membalik urutan agar transaksi terbaru (ID terbesar) muncul paling atas di tabel
    const riwayatTerbaru = [...dataRiwayat].reverse();

    return (
        <div className="space-y-6 animate-in fade-in bg-stone-50 text-stone-800 font-sans">
            
            {/* 1. HEADER HALAMAN */}
            <PageHeader 
                icon={<AiOutlineHistory />}
                title="Riwayat Transaksi" 
                description="Daftar seluruh rekaman nota penjualan dan pemesanan pelanggan yang berhasil disimpan." 
            />

            {/* 2. BAR FILTER & PENCARIAN */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 rounded-2xl border border-stone-200/60 shadow-sm">
                <div className="relative w-full sm:w-72">
                    <AiOutlineSearch className="absolute left-3.5 top-3 text-stone-400 text-base" />
                    <input 
                        type="text" 
                        placeholder="Cari ID nota atau pelanggan..." 
                        className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold focus:outline-none focus:border-stone-400 transition-colors placeholder:text-stone-400 shadow-inner"
                    />
                </div>
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-white border border-stone-200 text-stone-600 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-stone-50 transition-colors shadow-sm">
                    <AiOutlineCalendar className="text-sm" /> Hari Ini
                </button>
            </div>

            {/* 3. TABEL DATA RIWAYAT */}
            <div className="bg-white rounded-2xl border border-stone-200/60 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-stone-50/70 border-b border-stone-200/60 text-[10px] font-black text-stone-400 uppercase tracking-widest">
                                <th className="py-4 px-6">ID Nota</th>
                                <th className="py-4 px-6">Waktu</th>
                                <th className="py-4 px-6">Pelanggan / Meja</th>
                                <th className="py-4 px-6">Pesanan</th>
                                <th className="py-4 px-6 text-right">Total Bayar</th>
                                <th className="py-4 px-6 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 text-xs font-bold text-stone-700">
                            {riwayatTerbaru.map((row, index) => (
                                <tr key={index} className="hover:bg-stone-50/40 transition-colors">
                                    {/* Menambahkan simbol # di depan ID nomor urut */}
                                    <td className="py-4 px-6 font-black text-stone-900">#{row.id}</td>
                                    <td className="py-4 px-6 text-stone-400 font-medium">{row.waktu}</td>
                                    <td className="py-4 px-6">{row.pelanggan}</td>
                                    <td className="py-4 px-6 font-medium text-stone-600">{row.item}</td>
                                    <td className="py-4 px-6 text-right font-black text-stone-900">
                                        Rp {row.total.toLocaleString("id-ID")}
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-stone-100 text-stone-700 border border-stone-200/40 uppercase tracking-wider">
                                            ● {row.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}