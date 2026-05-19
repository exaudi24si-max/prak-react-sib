export default function SelectField({ label, value, onChange, options = [] }) {
  return (
    <div className="flex flex-col gap-2">
      {label ? <label className="text-sm font-medium text-slate-700">{label}</label> : null}
      <select
        value={value}
        onChange={onChange}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      >
        <option value="">Pilih kategori produk</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
