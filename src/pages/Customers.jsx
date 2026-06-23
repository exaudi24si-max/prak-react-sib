import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { getCustomers, createCustomer } from "../services/supabaseService";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: "", email: "", phone: "", loyalty: "Bronze", address: "" });

  useEffect(() => {
    async function loadCustomers() {
      const { data, error } = await getCustomers();
      if (!error && data) {
        setCustomers(data);
      }
      setLoading(false);
    }
    loadCustomers();
  }, []);

  const handleAdd = async () => {
    if (!newCustomer.name || !newCustomer.email) return;

    const { data, error } = await createCustomer({
      name: newCustomer.name,
      email: newCustomer.email,
      phone: newCustomer.phone,
      loyalty: newCustomer.loyalty,
      address: newCustomer.address,
    });

    if (error) {
      window.alert(error.message || "Gagal menambahkan customer.");
      return;
    }

    if (data) {
      const newRow = {
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        loyalty: data.loyalty,
        address: data.address || '',
        joined: data.joined || '-',
      };
      setCustomers([newRow, ...customers]);
    }

    setNewCustomer({ name: "", email: "", phone: "", loyalty: "Bronze", address: "" });
    setShowForm(false);
  };

  if (loading) {
    return (
      <div>
        <PageHeader title="Customers" breadcrumb="Customers" />
        <div className="flex justify-center mt-12">
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Customers" breadcrumb="Customers">
        <button onClick={() => setShowForm(true)} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          Add Customer
        </button>
      </PageHeader>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Tambah Customer</h2>
            <input type="text" placeholder="Nama" value={newCustomer.name} onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})} className="border p-2 w-full mb-2 rounded" />
            <input type="email" placeholder="Email" value={newCustomer.email} onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})} className="border p-2 w-full mb-2 rounded" />
            <input type="text" placeholder="Phone" value={newCustomer.phone} onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})} className="border p-2 w-full mb-2 rounded" />
            <input type="text" placeholder="Alamat" value={newCustomer.address} onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})} className="border p-2 w-full mb-2 rounded" />
            <select value={newCustomer.loyalty} onChange={(e) => setNewCustomer({...newCustomer, loyalty: e.target.value})} className="border p-2 w-full mb-4 rounded">
              <option>Bronze</option><option>Silver</option><option>Gold</option><option>Platinum</option>
            </select>
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
              <th className="p-3">Customer ID</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Loyalty</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.id} className="border-b hover:bg-slate-50">
                <td className="p-3">{c.id?.slice(0, 8)}...</td>
                <td className="p-3">
                  <Link to={`/customers/${c.id}`} className="text-slate-900 font-medium hover:text-blue-600">
                    {c.name}
                  </Link>
                </td>
                <td className="p-3">{c.email}</td>
                <td className="p-3">{c.phone}</td>
                <td className="p-3"><span className={`px-2 py-1 rounded-full text-xs ${c.loyalty==='Gold'?'bg-yellow-200':c.loyalty==='Silver'?'bg-gray-200':c.loyalty==='Platinum'?'bg-purple-200':'bg-orange-200'}`}>{c.loyalty}</span></td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-400">Belum ada data customer</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}