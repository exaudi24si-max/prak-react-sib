import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { createOrder, getOrders } from "../services/supabaseService";

// BUG FIX #3: Hapus fungsi generateOrders() — dead code yang tidak pernah digunakan

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  // BUG FIX #3: Sederhanakan state — hapus customerName & orderDate
  // (member_id diambil dari session, created_at otomatis dari Supabase)
  const [newOrder, setNewOrder] = useState({ status: "Pending", totalPrice: "" });

  useEffect(() => {
    async function loadOrders() {
      const { data, error } = await getOrders()
      if (!error) {
        setOrders(data)
      }
    }

    loadOrders()
  }, [])

  const handleAdd = async () => {
    if (!newOrder.totalPrice) return;

    const { data, error } = await createOrder({
      totalPrice: Number(newOrder.totalPrice),
      status: newOrder.status,
    })

    if (error) {
      window.alert(error.message || "Gagal membuat order.")
      return
    }

    const { data: updatedOrders, error: fetchError } = await getOrders()
    if (!fetchError) {
      setOrders(updatedOrders)
    }

    setNewOrder({ status: "Pending", totalPrice: "" });
    setShowForm(false);
  };

  return (
    <div>
      <PageHeader title="Orders" breadcrumb="Orders">
        <button onClick={() => setShowForm(true)} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          Add Order
        </button>
      </PageHeader>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Tambah Order</h2>
            <select value={newOrder.status} onChange={(e) => setNewOrder({...newOrder, status: e.target.value})} className="border p-2 w-full mb-2 rounded">
              <option>Pending</option><option>Completed</option><option>Cancelled</option>
            </select>
            <input type="number" placeholder="Total Price (Rp)" value={newOrder.totalPrice} onChange={(e) => setNewOrder({...newOrder, totalPrice: e.target.value})} className="border p-2 w-full mb-4 rounded" />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-300 rounded">Batal</button>
              <button onClick={handleAdd} className="px-4 py-2 bg-green-600 text-white rounded">Simpan</button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Order ID</th>
              <th>Customer Name</th>
              <th>Status</th>
              <th>Total Price</th>
              <th>Order Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} className="border-b">
                <td className="p-3">{o.id}</td>
                <td className="p-3">{o.customerName}</td>
                <td className="p-3"><span className={`px-2 py-1 rounded-full text-xs ${o.status==='Completed'?'bg-green-200':o.status==='Cancelled'?'bg-red-200':'bg-yellow-200'}`}>{o.status}</span></td>
                <td className="p-3">Rp {o.totalPrice.toLocaleString()}</td>
                <td className="p-3">{o.orderDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}