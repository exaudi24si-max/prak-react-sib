import PageHeader from "../components/PageHeader";
import { MdErrorOutline } from "react-icons/md"; // Import ikon error
import { Link } from "react-router-dom"; // Import Link untuk navigasi

export default function NotFound() {
  return (
    <div id="dashboard-container" className="p-6">
      <PageHeader />

      {/* Container Error (Disesuaikan dengan style card di Dashboard) */}
      <div className="mt-8 bg-white rounded-3xl shadow-sm p-20 flex flex-col items-center justify-center text-center">
        
        {/* Ikon Error */}
        <MdErrorOutline className="text-green-500 text-[120px] mb-6 animate-pulse" />
        
        {/* Pesan Error */}
        <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-500 mb-8 font-medium font-poppins">
          Oops! Halaman yang Anda cari tidak ditemukan.
        </p>

        {/* Tombol Kembali (Matching dengan gaya Add Button) */}
        <Link
          to="/"
          className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-10 rounded-xl transition-all shadow-md active:scale-95"
        >
          Kembali ke Dashboard
        </Link>
        
      </div>
    </div>
  );
}