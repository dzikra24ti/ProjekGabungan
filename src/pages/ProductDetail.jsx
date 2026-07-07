import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; // Menggunakan Supabase Client Anda

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                setError(null);
                
                // Mengambil satu data produk dari Supabase berdasarkan ID dari URL
                const { data, error: supabaseError } = await supabase
                    .from("products")
                    .select("*")
                    .eq("id", id)
                    .single(); // .single() memastikan data dikembalikan dalam bentuk object, bukan array

                if (supabaseError) throw supabaseError;

                setProduct(data);
            } catch (err) {
                console.error("Gagal memuat detail produk dari Supabase:", err);
                setError(err.message || "Gagal memuat detail data menu.");
            }
        };

        if (id) {
            fetchProductDetail();
        }
    }, [id]);

    if (error) return <div className="text-red-600 p-6 font-bold text-center">⚠️ {error}</div>;
    if (!product) return <div className="p-6 text-stone-500 font-bold text-center animate-pulse">Loading menu...</div>;

    const hargaRupiahAsli = Number(product.price);

    return (
        <div className="p-6 bg-white rounded-2xl shadow-sm max-w-lg mx-auto mt-6 flex flex-col items-center border border-stone-200/60 animate-in fade-in duration-200">
            {/* Pembungkus gambar agar ukuran terkontrol dan berpusat */}
            <div className="w-64 h-64 flex items-center justify-center overflow-hidden rounded-2xl mb-4 bg-stone-50 p-2 border border-stone-100">
                <img
                    /* Membaca path file gambar langsung dari folder public lokal React */
                    src={`/${product.thumbnail}`}
                    alt={product.title}
                    className="max-w-full max-h-full object-contain mix-blend-multiply"
                    onError={(e) => { e.target.style.display = 'none'; }}
                />
            </div>
            
            {/* Informasi Produk */}
            <div className="w-full text-left space-y-1">
                <h2 className="text-2xl font-black text-stone-900 uppercase tracking-tight mb-2">{product.title}</h2>
                <p className="text-stone-500 font-bold text-sm">
                    Kategori: <span className="text-stone-800">{product.category || "-"}</span>
                </p>
                <p className="text-stone-500 font-bold text-sm">
                    Brand: <span className="text-stone-800">{product.brand || "Warung Patria"}</span>
                </p>
                
                <p className="text-stone-900 font-black text-xl mt-3 pt-4 border-t border-stone-100">
                    Harga: Rp {hargaRupiahAsli.toLocaleString("id-ID")}
                </p>
            </div>
        </div>
    );
}