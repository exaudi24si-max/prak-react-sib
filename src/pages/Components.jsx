import { useState } from "react";
import PageHeader from "../components/PageHeader";
import Container from "../components/Container";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import Card from "../components/Card";
import ProductCard from "../components/ProductCard";
import Table from "../components/Table";
import Footer from "../components/Footer";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import Alert from "../components/Alert";
import Modal from "../components/Modal";

export default function Components() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const headers = ["No", "Nama Produk", "Kategori", "Harga", "Aksi"];
  const products = [
    { id: 1, name: "Laptop Asus", category: "Elektronik", price: "Rp 8.000.000" },
    { id: 2, name: "Sepatu Sport", category: "Fashion", price: "Rp 450.000" },
    { id: 3, name: "Jam Tangan", category: "Aksesoris", price: "Rp 799.000" }
  ];

  return (
    <div>
      <PageHeader title="Components" breadcrumb="Components" />

      <Container className="space-y-10">
        {/* Section Component */}
        <section className="overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-2xl">
          <div className="relative overflow-hidden px-6 py-10 md:px-10 md:py-14">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.2),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.18),_transparent_20%)]" />
            <div className="relative max-w-3xl space-y-6">
              <span className="inline-block rounded-full border border-slate-600 bg-slate-800 px-4 py-1 text-xs uppercase tracking-[0.35em] text-cyan-300">
                Section Component
              </span>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Temukan Sepatu Impian Anda</h1>
              <p className="max-w-2xl text-slate-300">
                Dapatkan koleksi sepatu sport terbaru dengan kualitas terbaik dan layanan pengiriman cepat di Sedap. Semua produk ditampilkan dengan desain modern dan penjelasan ringkas.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button type="primary">Mulai Belanja</Button>
                <Button type="secondary">Lihat Promo</Button>
              </div>
            </div>
          </div>
        </section>

        {/* 1. Basic Component Section */}
        <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
          <div className="mb-6 flex flex-col gap-2">
            <span className="text-sm uppercase tracking-[0.25em] text-slate-500">1. Basic Component</span>
            <h2 className="text-2xl font-bold text-slate-900">Basic Components</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-4 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-semibold text-slate-800">Button Component</h3>
              <div className="flex flex-wrap gap-3">
                <Button type="success">Simpan</Button>
                <Button type="secondary">Edit</Button>
                <Button type="danger">Hapus</Button>
                <Button type="warning">Batal</Button>
              </div>
            </div>

            <div className="space-y-4 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-semibold text-slate-800">Badge Component</h3>
              <div className="flex flex-wrap gap-3">
                <Badge type="success">Aktif</Badge>
                <Badge type="warning">Pending</Badge>
                <Badge type="danger">Ditolak</Badge>
                <Badge type="secondary">Baru</Badge>
              </div>
            </div>

            <div className="space-y-4 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-semibold text-slate-800">Avatar Component</h3>
              <div className="flex items-center gap-4">
                <Avatar name="Budi" />
                <Avatar name="Siti" />
                <Avatar name="Andi" />
              </div>
            </div>
          </div>
        </section>

        {/* 2. Data Display Component Section */}
        <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
          <div className="mb-6 flex flex-col gap-2">
            <span className="text-sm uppercase tracking-[0.25em] text-slate-500">3. Data Display Component</span>
            <h2 className="text-2xl font-bold text-slate-900">Data Display Components</h2>
          </div>

          <div className="space-y-8">
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Card Wrapper</h3>
              <Card>
                <h4 className="text-xl font-bold text-slate-900">Judul Card</h4>
                <p className="mt-2 text-slate-600">Ini adalah isi dari card. Dengan komponen ini kita dapat menempatkan informasi penting secara rapi dan konsisten.</p>
              </Card>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Product Cards</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <ProductCard
                  image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=60"
                  title="Sepatu Sport"
                  category="Fashion"
                  price="Rp 450.000"
                  description="Sepatu sport modern dengan desain nyaman dan ringan untuk aktivitas sehari-hari."
                />
                <ProductCard
                  image="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=60"
                  title="Smartphone"
                  category="Elektronik"
                  price="Rp 4.500.000"
                  description="Smartphone dengan performa cepat, kamera jernih, dan baterai tahan lama."
                />
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center justify-between gap-4 mb-4">
                <h3 className="text-lg font-semibold text-slate-800">Table Grid</h3>
              </div>
              <Table headers={headers}>
                {products.map((product, index) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="border px-4 py-3 text-slate-600">{index + 1}</td>
                    <td className="border px-4 py-3 font-semibold text-slate-900">{product.name}</td>
                    <td className="border px-4 py-3">
                      <span className="inline-flex rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">
                        {product.category}
                      </span>
                    </td>
                    <td className="border px-4 py-3 font-bold text-slate-700">{product.price}</td>
                    <td className="border px-4 py-3">
                      <Button type="primary">Detail</Button>
                    </td>
                  </tr>
                ))}
              </Table>
            </div>
          </div>
        </section>

        {/* 4. Form Component Section */}
        <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
          <div className="mb-6 flex flex-col gap-2">
            <span className="text-sm uppercase tracking-[0.25em] text-slate-500">4. Form Component</span>
            <h2 className="text-2xl font-bold text-slate-900">Form Components</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
              <div className="space-y-5">
                <InputField
                  label="Nama Produk"
                  placeholder="Masukkan nama produk..."
                  value={productName}
                  onChange={(event) => setProductName(event.target.value)}
                />
                <SelectField
                  label="Kategori Produk"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  options={[
                    { value: "Fashion", label: "Fashion" },
                    { value: "Elektronik", label: "Elektronik" },
                    { value: "Aksesoris", label: "Aksesoris" }
                  ]}
                />
                <InputField
                  label="Deskripsi / Catatan"
                  placeholder="Masukkan deskripsi produk..."
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  textarea
                />
                <Button type="success">Kirim Form</Button>
              </div>
            </div>

            <div className="space-y-4 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-semibold text-slate-800">Form preview</h3>
              <p className="text-sm text-slate-500">Contoh form component yang umum digunakan untuk input data dan pemilihan kategori.</p>
              <div className="space-y-3">
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <span className="block text-sm font-medium text-slate-700">Produk</span>
                  <p className="text-sm text-slate-500">{productName || "Sepatu Sport"}</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <span className="block text-sm font-medium text-slate-700">Kategori</span>
                  <p className="text-sm text-slate-500">{category || "Fashion"}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Feedback Component Section */}
        <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
          <div className="mb-6 flex flex-col gap-2">
            <span className="text-sm uppercase tracking-[0.25em] text-slate-500">5. Feedback Component</span>
            <h2 className="text-2xl font-bold text-slate-900">Feedback Components</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Alert Component</h3>
              <Alert type="info">Form berhasil dikirim secara lokal!</Alert>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Modal Component</h3>
              <p className="text-sm text-slate-500 mb-4">Klik tombol untuk membuka modal dan melihat komponen pop-up sederhana.</p>
              <Button type="warning" onClick={() => setModalOpen(true)}>
                Buka Modal
              </Button>
            </div>
          </div>
        </section>

        {/* Footer Demo */}
        <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
          <div className="mb-6 flex flex-col gap-2">
            <span className="text-sm uppercase tracking-[0.25em] text-slate-500">6. Layout Component (Footer)</span>
            <h2 className="text-2xl font-bold text-slate-900">Footer Component</h2>
          </div>
          <Footer />
        </section>
      </Container>

      <Modal open={modalOpen} title="Modal Feedback" onClose={() => setModalOpen(false)}>
        Ini adalah contoh modal sederhana yang bisa digunakan untuk menampilkan informasi tambahan atau konfirmasi.
      </Modal>
    </div>
  );
}
