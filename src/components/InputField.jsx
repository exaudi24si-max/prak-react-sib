export default function InputField({
  label,
  placeholder = "",
  value,
  onChange,
  type = "text",
  textarea = false,
  rows = 4,
}) {
  return (
    <div className="flex flex-col gap-2">
      {label ? <label className="text-sm font-medium text-slate-700">{label}</label> : null}
      {textarea ? (
        <textarea
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      )}
    </div>
  );
}
