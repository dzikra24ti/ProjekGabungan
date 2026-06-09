import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

export default function ProductDetail() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        axios
            .get(`https://dummyjson.com/products/${id}`)
            .then((response) => {
                if (response.status !== 200) {
                    setError(response.message)
                    return
                }
                setProduct(response.data)
            })
            .catch((err) => {
                setError(err.message)
            })
    }, [id])

    if (error) return <div className="text-red-600 p-4">{error}</div>
    if (!product) return <div className="p-4">Loading...</div>

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg max-w-lg mx-auto mt-6 flex flex-col items-center">
            {/* Pembungkus gambar agar ukuran terkontrol dan berpusat */}
            <div className="w-64 h-64 flex items-center justify-center overflow-hidden rounded-xl mb-4 bg-stone-50 p-2 border border-stone-100">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="max-w-full max-h-full object-contain"
                />
            </div>
            
            {/* Informasi Produk */}
            <div className="w-full text-left">
                <h2 className="text-2xl font-bold mb-2 text-stone-900">{product.title}</h2>
                <p className="text-gray-600 mb-1">Kategori: {product.category}</p>
                <p className="text-gray-600 mb-1">Brand: {product.brand}</p>
                <p className="text-stone-900 font-semibold text-lg mt-2">
                    Harga: Rp {(product.price * 1000).toLocaleString("id-ID")}
                </p>
            </div>
        </div>
    )
}