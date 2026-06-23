import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getProductById } from "../services/supabaseService"

export default function ProductDetail() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadProduct() {
            const { data, error } = await getProductById(id)
            if (error) {
                setError(error.message)
                return
            }
            setProduct(data)
        }

        loadProduct()
    }, [id])

    if (error) return <div className="text-red-600 p-4">{error}</div>
    if (!product) return <div className="p-4">Loading...</div>

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg max-w-lg mx-auto mt-6">
            {/* FIX: fallback image jika thumbnail kosong (Supabase tidak menyimpan field ini) */}
            <img
                src={product.thumbnail || `https://placehold.co/600x300/e2e8f0/64748b?text=${encodeURIComponent(product.title)}`}
                alt={product.title}
                className="rounded-xl mb-4 w-full h-48 object-cover"
            />
            <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-1">Kategori: {product.category}</p>
            <p className="text-gray-600 mb-1">Brand: {product.brand}</p>
            <p className="text-gray-800 font-semibold text-lg">
                Harga: Rp {Number(product.price).toLocaleString('id-ID')}
            </p>
            <p className="text-gray-600 mb-1">
                Stok: <span className={`font-semibold ${product.stock > 20 ? 'text-green-600' : 'text-red-600'}`}>{product.stock}</span>
            </p>
        </div>
    )
}