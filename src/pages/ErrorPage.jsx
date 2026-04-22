import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";

export default function ErrorPage({ code, description, image }) {
  return (
    <div className="p-6">
      <PageHeader title={`Error ${code}`} breadcrumb={`Error ${code}`} />
      <div className="mt-8 bg-white rounded-3xl shadow-sm p-20 flex flex-col items-center justify-center text-center">
        {image ? (
          <img src={image} alt={`Error ${code}`} className="w-40 h-40 mb-6" />
        ) : (
          <div className="text-red-500 text-[120px] mb-6">⚠️</div>
        )}
        <h1 className="text-6xl font-extrabold text-gray-800 mb-4">{code}</h1>
        <p className="text-xl text-gray-500 mb-8 font-medium">{description}</p>
        <Link
          to="/"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-10 rounded-xl transition-all"
        >
          Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
}