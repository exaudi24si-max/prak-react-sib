const alertStyles = {
  info: "bg-blue-50 border-blue-200 text-blue-700",
  success: "bg-emerald-50 border-emerald-200 text-emerald-700",
  warning: "bg-amber-50 border-amber-200 text-amber-700",
  danger: "bg-red-50 border-red-200 text-red-700",
};

export default function Alert({ type = "info", children }) {
  return (
    <div className={`rounded-2xl border px-4 py-4 text-sm font-medium ${alertStyles[type] || alertStyles.info}`}>
      {children}
    </div>
  );
}
