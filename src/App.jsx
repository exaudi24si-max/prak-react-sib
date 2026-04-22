import { Route, Routes } from 'react-router-dom';
import Sidebar from './layouts/Sidebar';
import Header from './layouts/Header';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import NotFound from './pages/NotFound';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <div id="app-container" className="bg-gray-100 min-h-screen flex">
      <div id="layout-wrapper" className="flex flex-row flex-1">
        <Sidebar />
        <div id="main-content" className="flex-1 p-4">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/error/400" element={<ErrorPage code="400" description="Bad Request - Permintaan tidak valid" />} />
            <Route path="/error/401" element={<ErrorPage code="401" description="Unauthorized - Anda tidak memiliki akses" />} />
            <Route path="/error/403" element={<ErrorPage code="403" description="Forbidden - Akses dilarang" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;