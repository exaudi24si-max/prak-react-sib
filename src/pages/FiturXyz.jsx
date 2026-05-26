import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";

export default function FiturXyz() {
  return (
    <div className="space-y-6">
      <PageHeader title="Fitur XYZ" breadcrumb="Fitur XYZ" />

      <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Status</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">Aktif</h2>
              <p className="mt-2 text-sm text-slate-600">Fitur XYZ sudah siap ditampilkan dan diintegrasikan ke dashboard Anda.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Versi</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">1.0.0</h2>
              <p className="mt-2 text-sm text-slate-600">Versi awal yang menampilkan statistik dasar dan kontrol tindakan.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Keterangan</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">UI Panel</h2>
              <p className="mt-2 text-sm text-slate-600">Gunakan tombol di bawah untuk melihat contoh aksi dan gaya komponen.</p>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-50 p-6">
            <p className="text-base font-medium text-slate-900">Aksi Tersedia</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button variant="default">Simpan</Button>
              <Button variant="outline">Edit</Button>
              <Button variant="ghost">Batal</Button>
              <Button variant="destructive">Hapus</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}