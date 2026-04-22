import { useState } from "react";
import PageHeader from "../components/PageHeader";

const generateCustomers = () => {
  const loyalties = ["Bronze", "Silver", "Gold"];
  const firstNames = ["Andi","Budi","Cici","Dodi","Eka","Fani","Gita","Hadi","Indah","Joko","Kiki","Lina","Maya","Nina","Oscar"];
  const customers = [];
  for (let i = 1; i <= 30; i++) {
    const firstName = firstNames[i % firstNames.length];
    customers.push({
      id: i,
      name: `${firstName} ${Math.floor(Math.random() * 100)}`,
      email: `customer${i}@example.com`,
      phone: `0812${String(i).padStart(3,'0')}${String(i).padStart(3,'0')}`,
      loyalty: loyalties[Math.floor(Math.random() * 3)],
    });
  }
  return customers;
};

export default function Customers() {
  const [customers, setCustomers] = useState(generateCustomers());
  const [showForm, setShowForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: "", email: "", phone: "", loyalty: "Bronze" });

  const handleAdd = () => {
    if (!newCustomer.name || !newCustomer.email) return;
    const newId = customers.length + 1;
    setCustomers([...customers, { id: newId, ...newCustomer }]);
    setNewCustomer({ name: "", email: "", phone: "", loyalty: "Bronze" });
    setShowForm(false);
  };

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
            <select value={newCustomer.loyalty} onChange={(e) => setNewCustomer({...newCustomer, loyalty: e.target.value})} className="border p-2 w-full mb-4 rounded">
              <option>Bronze</option><option>Silver</option><option>Gold</option>
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
              <tr key={c.id} className="border-b">
                <td className="p-3">{c.id}</td>
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.email}</td>
                <td className="p-3">{c.phone}</td>
                <td className="p-3"><span className={`px-2 py-1 rounded-full text-xs ${c.loyalty==='Gold'?'bg-yellow-200':c.loyalty==='Silver'?'bg-gray-200':'bg-orange-200'}`}>{c.loyalty}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}