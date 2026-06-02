import { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import PageHeader from "../components/PageHeader";

export default function Kasir() {
    // 1. DATA MASTER MENU KEDAI (Lengkap dengan Gambar & Harga)
    const DAFTAR_MENU = [
        {
            id: "teh_telor",
            nama: "Teh Telor Bebek",
            harga: 14000,
            emoji: "🥚",
            gambar: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=150&auto=format&fit=crop&q=60" // Teh/Kopi kocok tradisional
        },
        {
            id: "bandrek",
            nama: "Bandrek Susu Rempah",
            harga: 12000,
            emoji: "🪵",
            gambar: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=150&auto=format&fit=crop&q=60" // Minuman rempah hangat
        },
        {
            id: "kopi_kasar",
            nama: "Kopi Kasar Tradisional",
            harga: 8000,
            emoji: "☕",
            gambar: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=150&auto=format&fit=crop&q=60"
        },
        {
            id: "roti_bakar",
            nama: "Roti Bakar Srikaya",
            harga: 10000,
            emoji: "🍞",
            gambar: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?w=150&auto=format&fit=crop&q=60"
        },
        {
            id: "indomie",
            nama: "Indomie Rebus Telor",
            harga: 13000,
            emoji: "🍜",
            gambar: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=150&auto=format&fit=crop&q=60"
        }
    ];

    // 2. STATE UTAMA
    const [nomorMeja, setNomorMeja] = useState("");
    
    // State keranjang belanja menggunakan Object berbasis ID menu { id_menu: jumlah }
    const [keranjang, setKeranjang] = useState({
        teh_telor: 0,
        bandrek: 0,
        kopi_kasar: 0,
        roti_bakar: 0,
        indomie: 0
    });

    // 3. FUNGSI UPDATE KUANTITAS (TAMBAH / KURANG)
    const ubahKuantitas = (id, aksi) => {
        setKeranjang((prev) => {
            const jumlahSekarang = prev[id] || 0;
            let jumlahBaru = aksi === "tambah" ? jumlahSekarang + 1 : jumlahSekarang - 1;
            
            return {
                ...prev,
                [id]: Math.max(0, jumlahBaru) // Memastikan tidak minus
            };
        });
    };

    // 4. PERHITUNGAN OTOMATIS (DERIVED STATE)
    const totalItem = Object.values(keranjang).reduce((a, b) => a + b, 0);
    
    const totalBayar = DAFTAR_MENU.reduce((total, menu) => {
        const qty = keranjang[menu.id] || 0;
        return total + (qty * menu.harga);
    }, 0);

    // 5. FUNGSI TOMBOL SIMPAN TRANSAKSI
    const handleSimpanTransaksi = (e) => {
        e.preventDefault();
        if (!nomorMeja.trim()) {
            alert("Harap isi Nomor Meja atau Nama Pelanggan terlebih dahulu!");
            return;
        }
        if (totalBayar === 0) {
            alert("Harap pilih minimal 1 menu sebelum menyimpan transaksi!");
            return;
        }
        
        alert(`Transaksi untuk ${nomorMeja} senilai Rp ${totalBayar.toLocaleString("id-ID")} berhasil disimpan!`);
        
        // Reset form setelah simpan tuntas
        setNomorMeja("");
        setKeranjang({
            teh_telor: 0,
            bandrek: 0,
            kopi_kasar: 0,
            roti_bakar: 0,
            indomie: 0
        });
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-200">
            {/* Navigasi Header Halaman */}
            <PageHeader 
                title="Kasir Cepat (POS)" 
                description="Input pesanan menu real-time terikat nomor meja guna menghindari risiko salah antar makanan." 
            />

            {/* INTEGRATED POS LAYOUT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* SISI KIRI: INPUT IDENTITAS & SELEKSI DAFTAR MENU (7 COLUMN) */}
                <div className="lg:col-span-7 space-y-6">
                    
                    {/* INPUT IDENTIFIKASI MEJA / ANTRIAN */}
                    <div className="bg-white p-5 rounded-2xl border border-stone-200/60 shadow-sm space-y-3">
                        <div className="flex items-center gap-2 text-stone-700 font-bold text-xs uppercase tracking-wider">
                            <AiOutlineUser className="text-base text-stone-400" />
                            <label htmlFor="identitas">Data Identifikasi Pelanggan *</label>
                        </div>
                        <input 
                            id="identitas"
                            type="text"
                            placeholder="Misal: Meja 04 / Sdr. Rian"
                            value={nomorMeja}
                            onChange={(e) => setNomorMeja(e.target.value)}
                            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold focus:outline-none focus:bg-white focus:border-stone-400 focus:ring-4 focus:ring-stone-100 transition-all placeholder:text-stone-300"
                        />
                    </div>

                    {/* DAFTAR MENU UTAMA KEDAI */}
                    <div className="bg-white p-6 rounded-2xl border border-stone-200/60 shadow-sm space-y-4">
                        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2">Daftar Menu Tersedia</p>
                        
                        <div className="divide-y divide-stone-100">
                            {DAFTAR_MENU.map((menu) => {
                                const qty = keranjang[menu.id] || 0;
                                return (
                                    <div key={menu.id} className="py-4 flex items-center justify-between first:pt-0 last:pb-0">
                                        <div className="flex items-center gap-4">
                                            {/* RENDER GAMBAR MENU DENGAN BACKUP EMOJI */}
                                            <div className="w-14 h-14 bg-stone-50 border border-stone-200/60 rounded-2xl overflow-hidden flex items-center justify-center text-xl shadow-inner relative select-none shrink-0">
                                                <img 
                                                    src={menu.gambar} 
                                                    alt={menu.nama}
                                                    className="w-full h-full object-cover absolute inset-0"
                                                    onError={(e) => { e.target.style.display = 'none'; }} // Menyembunyikan gambar jika jaringan error/offline
                                                />
                                                <span className="relative z-0">{menu.emoji}</span>
                                            </div>
                                            <div>
                                                <h3 className="font-black text-sm text-stone-900 tracking-tight">{menu.nama}</h3>
                                                <p className="text-xs text-stone-500 font-bold mt-0.5">Rp {menu.harga.toLocaleString("id-ID")}</p>
                                            </div>
                                        </div>
                                        
                                        {/* COUNTER */}
                                        <div className="flex items-center bg-stone-100/80 border border-stone-200/60 rounded-xl p-1 shadow-inner">
                                            <button 
                                                onClick={() => ubahKuantitas(menu.id, "kurang")} 
                                                className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-800 transition-colors"
                                            >
                                                <AiOutlineMinus className="text-xs" />
                                            </button>
                                            <span className="w-8 text-center font-black text-xs text-stone-800">{qty}</span>
                                            <button 
                                                onClick={() => ubahKuantitas(menu.id, "tambah")} 
                                                className="w-8 h-8 bg-white shadow-sm rounded-lg flex items-center justify-center text-stone-700 hover:text-stone-900 active:scale-95 transition-transform"
                                            >
                                                <AiOutlinePlus className="text-xs" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* SISI KANAN: RINGKASAN STRUK BILL / TRANSAKSI (5 COLUMN) */}
                <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-stone-200/60 shadow-sm flex flex-col justify-between space-y-6 sticky top-6">
                    <div>
                        <div className="flex justify-between items-center mb-4 pb-3 border-b border-stone-100">
                            <h3 className="text-xs font-black text-stone-400 uppercase tracking-widest flex items-center gap-2">
                                <AiOutlineShoppingCart className="text-base" /> Ringkasan Nota
                            </h3>
                            <span className="text-[9px] font-black text-stone-600 bg-stone-100 px-2 py-0.5 rounded uppercase tracking-wider">
                                Draft Nota
                            </span>
                        </div>

                        {/* DETAIL STRUK */}
                        <div className="space-y-3 text-xs font-bold text-stone-600">
                            <div className="flex justify-between">
                                <span className="text-stone-400">Identitas Meja:</span>
                                <span className={nomorMeja ? "text-stone-900" : "text-stone-300 italic"}>
                                    {nomorMeja ? nomorMeja : "Belum diisi"}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-stone-400">Total Kuantitas:</span>
                                <span className="text-stone-800">{totalItem} Porsi</span>
                            </div>

                            <hr className="border-stone-100 my-2" />

                            {/* List Rincian Belanja yang Kuantitasnya > 0 */}
                            <div className="space-y-2 bg-stone-50 p-3 rounded-xl border border-stone-200/30 text-[11px]">
                                {DAFTAR_MENU.map((menu) => {
                                    const qty = keranjang[menu.id] || 0;
                                    if (qty === 0) return null; // Sembunyikan item jika porsi masih 0
                                    
                                    return (
                                        <div key={menu.id} className="flex justify-between text-stone-700">
                                            <span>{menu.nama} (x{qty})</span>
                                            <span>Rp {(qty * menu.harga).toLocaleString("id-ID")}</span>
                                        </div>
                                    );
                                })}
                                
                                {totalItem === 0 && (
                                    <p className="text-center text-stone-400 italic py-2">Belum ada item terpilih</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* FOOTER TOTAL HARGA & SUBMIT */}
                    <div className="space-y-4 pt-4 border-t border-stone-100">
                        <div className="flex justify-between items-baseline">
                            <span className="text-xs font-black text-stone-400 uppercase tracking-wider">Total Bayar:</span>
                            <span className="text-xl font-black text-stone-900 tracking-tight">
                                Rp {totalBayar.toLocaleString("id-ID")}
                            </span>
                        </div>

                        <button 
                            onClick={handleSimpanTransaksi}
                            className="w-full bg-stone-800 hover:bg-stone-900 text-stone-50 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-md shadow-stone-900/10 active:scale-[0.99]"
                        >
                            Simpan & Cetak Transaksi
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}