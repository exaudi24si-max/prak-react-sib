// export default function PageHeader(props) {
//     return (
//         /* 2. Terapkan layout dan flexbox untuk container utama */
//         <div id="pageheader-container" className="flex items-center justify-between p-4">
            
//             {/* 3. Styling untuk Sisi Kiri */}
//             <div id="pageheader-left" className="flex flex-col">
//                 <span id="pageheader-title" className="text-3xl font-semibold">
//                     {props.title}
//                 </span>
//                 <div id="breadcrumb-links" className="flex items-center font-medium space-x-2 mt-2">
//                     <span id="breadcrumb-home" className="text-gray-500">Dashboard</span>
//                     <span id="breadcrumb-separator" className="text-gray-500">/</span>
//                     <span id="breadcrumb-current" className="text-gray-500">Order List</span>
//                 </div>
//             </div>

//             {/* 4. Styling untuk Sisi Kanan (Tombol) */}
//             <div id="action-button">
//                 <button id="add-button" className="bg-green-600 text-white px-4 py-2 rounded-lg transition-colors hover:bg-green-700">
//                     Add Button
//                 </button>
//             </div>
//         </div>
//     );
// }
export default function PageHeader({ title, breadcrumb, children }) {
  const renderBreadcrumb = () => {
    if (!breadcrumb) return null;
    if (typeof breadcrumb === 'string') {
      return (
        <div className="flex items-center font-medium space-x-2 mt-2">
          <span className="text-gray-500">Dashboard</span>
          <span className="text-gray-500">/</span>
          <span className="text-gray-500">{breadcrumb}</span>
        </div>
      );
    }
    if (Array.isArray(breadcrumb)) {
      return (
        <div className="flex items-center font-medium space-x-2 mt-2">
          <span className="text-gray-500">Dashboard</span>
          {breadcrumb.map((item, idx) => (
            <span key={idx} className="flex items-center space-x-2">
              <span className="text-gray-500">/</span>
              <span className="text-gray-500">{item}</span>
            </span>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex flex-col">
        <span className="text-3xl font-semibold">{title}</span>
        {renderBreadcrumb()}
      </div>
      <div className="flex space-x-2">
        {children}
      </div>
    </div>
  );
}