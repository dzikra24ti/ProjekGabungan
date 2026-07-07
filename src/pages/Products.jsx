import { MdNoFood } from "react-icons/md";
 import { BsFillExclamationDiamondFill } from "react-icons/bs"; 
import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient"; // Menggunakan Supabase Client Anda

export default function Products() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setError(null);
                
                // Menyiapkan dasar query pemanggilan data ke tabel products
                let supabaseQuery = supabase
                    .from("products")
                    .select("*")
                    .order("title", { ascending: true });

                // Jika kolom input pencarian diisi, gunakan filter pencocokan huruf (case-insensitive)
                if (query.trim() !== "") {
                    supabaseQuery = supabaseQuery.ilike("title", `%${query}%`);
                }

                const { data, error: supabaseError } = await supabaseQuery;

                if (supabaseError) throw supabaseError;

                setProducts(data || []);
            } catch (err) {
                console.error("Gagal mengambil data produk dari Supabase:", err);
                setError(err.message || "Koneksi ke database terputus");
            }
        };

        // Mekanisme Debounce 500ms agar tidak membanjiri request Supabase setiap ketikan huruf
        const timeout = setTimeout(() => {
            fetchProducts();
        }, 500);

        return () => clearTimeout(timeout);
    }, [query]);

    const errorInfo = error ? (
        <div className="bg-red-50 border border-red-200 mb-5 p-5 text-sm font-bold text-red-600 rounded-2xl flex items-center shadow-sm">
            <BsFillExclamationDiamondFill className="text-red-600 me-3 text-lg shrink-0" />
            {error}
        </div>
    ) : null;

    return (
        <div className="space-y-6 animate-in fade-in duration-200">
            <PageHeader
                icon={<MdNoFood />}
                title="Products"
                description="Menu Anti Lapar"
            />

            {errorInfo}

            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari menu Warung Patria..."
                className="mb-4 p-3.5 w-full bg-white rounded-2xl shadow-sm border border-stone-200 outline-none focus:ring-2 focus:ring-stone-800 transition-all text-sm font-medium text-stone-900 placeholder-stone-300"
            />

            <div className="overflow-hidden rounded-2xl shadow-sm border border-stone-200/60">
                <table className="min-w-full divide-y divide-stone-100">
                    <thead>
                        <tr className="bg-stone-900 text-stone-100 text-left text-xs font-black uppercase tracking-wider">
                            <th className="px-6 py-4">#</th>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Brand</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-stone-100 text-sm font-medium text-stone-800">
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-12 text-stone-400 italic">
                                    Menu tidak ditemukan atau database kosong.
                                </td>
                            </tr>
                        ) : (
                            products.map((item, index) => {
                                const hargaRupiahAsli = Number(item.price);
                                return (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-stone-50/80 transition-colors duration-150"
                                    >
                                        <td className="px-6 py-4 text-stone-400 font-bold">
                                            {index + 1}.
                                        </td>
                                        <td className="px-6 py-4 font-black">
                                            <Link to={`/products/${item.id}`} className="text-emerald-600 hover:text-emerald-700 hover:underline">
                                                {item.title}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 text-stone-500 font-semibold">{item.category || "-"}</td>
                                        <td className="px-6 py-4 font-black text-stone-900">
                                            Rp {hargaRupiahAsli.toLocaleString("id-ID")}
                                        </td>
                                        <td className="px-6 py-4 text-stone-400 text-xs uppercase tracking-wider font-bold">
                                            {item.brand || "Warung Patria"}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}