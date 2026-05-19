import { useParams, Link } from "react-router-dom";
import { getCustomerById } from "../data/customers";

export default function CustomerDetail() {
  const { id } = useParams();
  const customer = getCustomerById(id);

  if (!customer) {
    return (
      <main className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">Customer tidak ditemukan</h1>
          <p className="mt-3 text-slate-600">Silakan kembali ke halaman pelanggan dan pilih customer yang tersedia.</p>
          <Link to="/customers" className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
            Kembali ke Customers
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">{customer.name}</h1>
              <p className="mt-2 text-slate-600">Detail customer untuk ID <span className="font-medium text-slate-900">{customer.id}</span></p>
            </div>
            <Link to="/customers" className="inline-flex items-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
              Kembali ke Customers
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-6">
              <p className="text-sm text-slate-500">Email</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{customer.email}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-6">
              <p className="text-sm text-slate-500">Phone</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{customer.phone}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-6">
              <p className="text-sm text-slate-500">Loyalty</p>
              <p className="mt-2 inline-flex rounded-full bg-emerald-100 px-4 py-2 text-slate-900 font-semibold">{customer.loyalty}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-6">
              <p className="text-sm text-slate-500">Joined</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{customer.joined}</p>
            </div>
          </div>

          <div className="mt-8 rounded-3xl bg-slate-100 p-6">
            <p className="text-sm text-slate-500">Address</p>
            <p className="mt-2 text-slate-900">{customer.address}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
