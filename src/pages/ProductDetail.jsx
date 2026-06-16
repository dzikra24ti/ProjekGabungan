import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

export default function ProductDetail() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        // Mengubah URL dummyjson menjadi endpoint Laravel lokal lewat web.php
        axios
            .get(`http://127.0.0.1:8000/api/products/${id}`)
            .then((response) => {
                if (response.status !== 200) {
                    setError(response.data?.message || "Gagal memuat data")
                    return
                }
                setProduct(response.data)
            })
            .catch((err) => {
                setError(err.response?.data?.message || err.message || "Terjadi kesalahan")
            })
    }, [id])

    if (error) return <div className="text-red-600 p-4 font-semibold">{error}</div>
    if (!product) return <div className="p-4 text-stone-500">Loading...</div>

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg max-w-lg mx-auto mt-6 flex flex-col items-center border border-stone-100">
            {/* Pembungkus gambar agar ukuran terkontrol dan berpusat */}
            <div className="w-64 h-64 flex items-center justify-center overflow-hidden rounded-xl mb-4 bg-stone-50 p-2 border border-stone-100">
                <img
                    /* Menggabungkan base URL Laravel port 8000 dengan path gambar dari database */
                    src={`http://127.0.0.1:8000/${product.thumbnail}`}
                    alt={product.title}
                    /* mix-blend-multiply membantu menyatukan background gambar putih dengan box keabuan */
                    className="max-w-full max-h-full object-contain mix-blend-multiply"
                />
            </div>
            
            {/* Informasi Produk */}
            <div className="w-full text-left">
                <h2 className="text-2xl font-black mb-2 text-stone-900 uppercase tracking-tight">{product.title}</h2>
                <p className="text-stone-500 font-medium text-sm mb-1">Kategori: {product.category}</p>
                <p className="text-stone-500 font-medium text-sm mb-1">Brand: {product.brand}</p>
                <p className="text-stone-500 font-medium text-sm mb-3">Sisa Stok: {product.stock} porsi</p>
                
                <p className="text-stone-900 font-black text-xl mt-2 pt-3 border-t border-stone-100">
                    Harga: Rp {(product.price * 1000).toLocaleString("id-ID")}
                </p>
            </div>
        </div>
    )
}