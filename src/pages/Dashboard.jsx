import { useEffect, useState } from "react"
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import { getDashboardSummary } from "../services/supabaseService"

export default function Dashboard() {
  const [summary, setSummary] = useState({
    totalOrders: 0,
    totalDelivered: 0,
    totalCanceled: 0,
    totalRevenue: 0,
  })

  useEffect(() => {
    async function loadSummary() {
      const { data, error } = await getDashboardSummary()
      if (!error && data) {
        setSummary(data)
      }
    }

    loadSummary()
  }, [])

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card Orders */}
        <div className="flex items-center gap-5 bg-white rounded-2xl shadow-sm border border-garis p-6 hover:shadow-md transition-shadow">
          <div className="bg-emerald-100 text-hijau rounded-full p-4 flex-shrink-0">
            <FaShoppingCart size={28} />
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold font-poppins text-teks">{summary.totalOrders}</span>
            <span className="text-sm text-teks-samping mt-1">Total Orders</span>
          </div>
        </div>

        {/* Card Delivered */}
        <div className="flex items-center gap-5 bg-white rounded-2xl shadow-sm border border-garis p-6 hover:shadow-md transition-shadow">
          <div className="bg-blue-50 text-biru rounded-full p-4 flex-shrink-0">
            <FaTruck size={28} />
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold font-poppins text-teks">{summary.totalDelivered}</span>
            <span className="text-sm text-teks-samping mt-1">Total Delivered</span>
          </div>
        </div>

        {/* Card Canceled */}
        <div className="flex items-center gap-5 bg-white rounded-2xl shadow-sm border border-garis p-6 hover:shadow-md transition-shadow">
          <div className="bg-red-50 text-merah rounded-full p-4 flex-shrink-0">
            <FaBan size={28} />
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold font-poppins text-teks">{summary.totalCanceled}</span>
            <span className="text-sm text-teks-samping mt-1">Total Canceled</span>
          </div>
        </div>

        {/* Card Revenue */}
        <div className="flex items-center gap-5 bg-white rounded-2xl shadow-sm border border-garis p-6 hover:shadow-md transition-shadow">
          <div className="bg-orange-50 text-kuning rounded-full p-4 flex-shrink-0">
            <FaDollarSign size={28} />
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold font-poppins text-teks">Rp {summary.totalRevenue.toLocaleString('id-ID')}</span>
            <span className="text-sm text-teks-samping mt-1">Total Revenue</span>
          </div>
        </div>

      </div>
    </div>
  );
}