    import { MdNoFood } from "react-icons/md";
    // Mengimpor icon peringatan yang sebelumnya luput di-import
    import { BsFillExclamationDiamondFill } from "react-icons/bs"; 
    import { useState, useEffect } from "react";
    import axios from "axios";
    import PageHeader from "../components/PageHeader";
    import { Link } from "react-router-dom";

    export default function Products() {
        const [products, setProducts] = useState([]);
        const [error, setError] = useState(null);
        const [query, setQuery] = useState("");

        useEffect(() => {
            const timeout = setTimeout(() => {
                // Mengubah URL menembak ke API Laravel lokal Anda dengan parameter query 'q'
                axios
                    .get(`http://127.0.0.1:8000/api/products?q=${query}`)
                    .then((response) => {
                        if (response.status !== 200) {
                            setError(response.data.message || "Gagal mengambil data");
                            return;
                        }
                        // Karena Laravel langsung mengembalikan Array, tidak perlu .products lagi
                        setProducts(response.data); 
                    })
                    .catch((err) => {
                        setError(err.response?.data?.message || err.message || "Koneksi terputus");
                    });
            }, 500);

            return () => clearTimeout(timeout);
        }, [query]);

        const errorInfo = error ? (
            <div className="bg-red-200 mb-5 p-5 text-sm font-light text-gray-600 rounded flex items-center">
                <BsFillExclamationDiamondFill className="text-red-600 me-2 text-lg" />
                {error}
            </div>
        ) : null;

        return (
            <div>
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
                    className="mb-4 p-3 w-full bg-white rounded-2xl shadow-lg border border-stone-100 outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                />

                <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-100">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr className="bg-neutral-900 text-white text-left text-sm font-semibold tracking-wide">
                                <th className="px-6 py-3">#</th>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Category</th>
                                <th className="px-6 py-3">Price</th>
                                <th className="px-6 py-3">Info</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100 text-sm text-gray-800">
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-8 text-gray-400 font-medium">
                                        Menu tidak ditemukan atau server mati.
                                    </td>
                                </tr>
                            ) : (
                                products.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-neutral-50 transition-colors duration-200"
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-500">
                                            {index + 1}.
                                        </td>
                                        <td className="px-6 py-4 font-semibold">
                                            {/* Link mengarah ke detail ID produk di database */}
                                            <Link to={`/products/${item.id}`} className="text-emerald-600 hover:text-emerald-700 hover:underline">
                                                {item.title}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">{item.category}</td>
                                        <td className="px-6 py-4 font-black text-neutral-900">
                                            {/* Menyesuaikan harga asli rupiah (Contoh: 14 * 1000 = Rp 14.000) */}
                                            Rp {(item.price ).toLocaleString("id-ID")}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">{item.brand}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }