import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { createProduct, getProducts } from "../services/supabaseService";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  // BUG FIX #1: Rename 'tittle' → 'title'
  const [newProduct, setNewProduct] = useState({
    title: "",
    code: "",
    category: "",
    brand: "",
    price: 0,
    stock: 0,
  });

  useEffect(() => {
    async function loadProducts() {
      const { data, error } = await getProducts();
      if (!error) {
        setProducts(data);
      }
    }

    loadProducts();
  }, []);

  const handleAdd = async () => {
    if (!newProduct.title || !newProduct.code) return;

    const { data, error } = await createProduct({
      ...newProduct,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
    });

    if (error) {
      window.alert(error.message || "Gagal menambahkan produk.")
      return;
    }

    const { data: updatedProducts, error: fetchError } = await getProducts();
    if (!fetchError) {
      setProducts(updatedProducts);
    }

    setNewProduct({ title: "", code: "", category: "", brand: "", price: 0, stock: 0 });
    setShowForm(false);
  };

  return (
    <div>
      <PageHeader title="Products" breadcrumb="Products">
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Add Product
        </button>
      </PageHeader>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Tambah Produk</h2>
            <input
              type="text"
              placeholder="Judul Produk"
              value={newProduct.title}
              onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
              className="border p-2 w-full mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Kode Produk"
              value={newProduct.code}
              onChange={(e) => setNewProduct({ ...newProduct, code: e.target.value })}
              className="border p-2 w-full mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Kategori"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="border p-2 w-full mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Brand"
              value={newProduct.brand}
              onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
              className="border p-2 w-full mb-2 rounded"
            />
            <input
              type="number"
              placeholder="Harga"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
              className="border p-2 w-full mb-2 rounded"
            />
            <input
              type="number"
              placeholder="Stok"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
              className="border p-2 w-full mb-4 rounded"
            />

            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-300 rounded">
                Batal
              </button>
              <button onClick={handleAdd} className="px-4 py-2 bg-green-600 text-white rounded">
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Product ID</th>
              <th>Title</th>
              <th>Code</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b hover:bg-slate-50">
                <td className="p-3">{p.id}</td>
                <td className="p-3">
                  <Link
                    to={`/products/${p.id}`}
                    className="text-slate-900 font-medium hover:text-blue-600"
                  >
                    {p.title}
                  </Link>
                </td>
                <td className="p-3">{p.code}</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">{p.brand}</td>
                <td className="p-3 text-emerald-600">Rp {p.price.toLocaleString("id-ID")}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      p.stock > 20 ? "bg-green-200" : "bg-red-200"
                    }`}
                  >
                    {p.stock}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
