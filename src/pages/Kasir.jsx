import { useState, useEffect } from "react";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import PageHeader from "../components/PageHeader";
import axios from "axios";

export default function Kasir() {
    // 1. STATE UTAMA
    const [daftarMenu, setDaftarMenu] = useState([]); // Menampung menu live dari Laravel
    const [nomorMeja, setNomorMeja] = useState("");
    const [keranjang, setKeranjang] = useState({}); // Menggunakan ID Produk database sebagai Key { 1: qty, 2: qty }
    const [loading, setLoading] = useState(true);

    // 2. AMBIL DATA MASTER MENU DARI LARAVEL
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/products")
            .then((response) => {
                setDaftarMenu(response.data);
                
                // Inisialisasi struktur object keranjang berdasarkan ID produk asli di database
                const strukturKeranjangAwal = {};
                response.data.forEach(menu => {
                    strukturKeranjangAwal[menu.id] = 0;
                });
                setKeranjang(strukturKeranjangAwal);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Gagal memuat master menu:", err);
                alert("Gagal terhubung ke server Laravel. Pastikan php artisan serve aktif!");
                setLoading(false);
            });
    }, []);

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
    
    const totalBayar = daftarMenu.reduce((total, menu) => {
        const qty = keranjang[menu.id] || 0;
        // Karena harga di database bernilai satuan (misal 14), kalikan 1000 untuk konversi ke Rupiah asli
        return total + (qty * (menu.price * 1000));
    }, 0);

    // 5. FUNGSI TOMBOL SIMPAN TRANSAKSI KE LARAVEL
    const handleSimpanTransaksi = (e) => {
        e.preventDefault();
        
        if (!nomorMeja.trim()) {
            alert("Harap isi Nomor Meja atau Nama Pelanggan terlebih dahulu!");
            return;
        }
        if (totalItem === 0) {
            alert("Harap pilih minimal 1 menu sebelum menyimpan transaksi!");
            return;
        }

        // Susun array items yang hanya berisi menu dengan kuantitas > 0
        const itemsDikirim = [];
        daftarMenu.forEach((menu) => {
            const qty = keranjang[menu.id] || 0;
            if (qty > 0) {
                itemsDikirim.push({
                    product_id: menu.id, // ID Numerik asli database (1, 2, 3, dst)
                    quantity: qty
                });
            }
        });

        // Payload data pembungkus sesuai validasi TransactionController Laravel
        const payload = {
            customer_name: nomorMeja,
            items: itemsDikirim
        };

        // Kirim data transaksi ke backend Laravel
        axios.post("http://127.0.0.1:8000/api/transactions", payload)
            .then((response) => {
                if (response.data.status === "success") {
                    alert(`Transaksi untuk ${nomorMeja} senilai Rp ${totalBayar.toLocaleString("id-ID")} BERHASIL disimpan ke database!`);
                    
                    // Reset form setelah transaksi tuntas mendarat di database
                    setNomorMeja("");
                    setKeranjang((prev) => {
                        const keranjangKosong = { ...prev };
                        Object.keys(keranjangKosong).forEach(key => {
                            keranjangKosong[key] = 0;
                        });
                        return keranjangKosong;
                    });
                }
            })
            .catch((error) => {
                console.error("Error Transaksi:", error);
                alert(error.response?.data?.message || "Terjadi kesalahan saat menyimpan transaksi.");
            });
    };

    if (loading) {
        return <div className="p-8 text-center font-bold text-stone-500">Menghubungkan ke server Warung Patria...</div>;
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-200">
            <PageHeader 
                title="Kasir Cepat (POS)" 
                description="Input pesanan menu real-time terikat nomor meja guna menghindari risiko salah antar makanan." 
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* SISI KIRI: INPUT IDENTITAS & SELEKSI DAFTAR MENU */}
                <div className="lg:col-span-7 space-y-6">
                    
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

                    <div className="bg-white p-6 rounded-2xl border border-stone-200/60 shadow-sm space-y-4">
                        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2">Daftar Menu Tersedia</p>
                        
                        <div className="divide-y divide-stone-100">
                            {daftarMenu.map((menu) => {
                                const qty = keranjang[menu.id] || 0;
                                const hargaRupiahAsli = menu.price * 1000;
                                return (
                                    <div key={menu.id} className="py-4 flex items-center justify-between first:pt-0 last:pb-0">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 bg-stone-50 border border-stone-200/60 rounded-2xl overflow-hidden flex items-center justify-center text-xl shadow-inner relative select-none shrink-0">
                                                {/* Menggunakan path file gambar lokal dari folder public Laravel */}
                                                <img 
                                                    src={`http://127.0.0.1:8000/${menu.thumbnail}`} 
                                                    alt={menu.title}
                                                    className="w-full h-full object-cover absolute inset-0 mix-blend-multiply"
                                                    onError={(e) => { e.target.style.display = 'none'; }}
                                                />
                                               
                                            </div>
                                            <div>
                                                <h3 className="font-black text-sm text-stone-900 tracking-tight">{menu.title}</h3>
                                                <p className="text-xs text-stone-500 font-bold mt-0.5">Rp {hargaRupiahAsli.toLocaleString("id-ID")}</p>
                                            </div>
                                        </div>
                                        
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

                {/* SISI KANAN: RINGKASAN STRUK BILL / TRANSAKSI */}
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

                            <div className="space-y-2 bg-stone-50 p-3 rounded-xl border border-stone-200/30 text-[11px]">
                                {daftarMenu.map((menu) => {
                                    const qty = keranjang[menu.id] || 0;
                                    if (qty === 0) return null;
                                    
                                    return (
                                        <div key={menu.id} className="flex justify-between text-stone-700">
                                            <span>{menu.title} (x{qty})</span>
                                            <span>Rp {(qty * (menu.price * 1000)).toLocaleString("id-ID")}</span>
                                        </div>
                                    );
                                })}
                                
                                {totalItem === 0 && (
                                    <p className="text-center text-stone-400 italic py-2">Belum ada item terpilih</p>
                                )}
                            </div>
                        </div>
                    </div>

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