import React, { Suspense } from 'react';
import "./assets/tailwind.css";
import { Route, Routes } from 'react-router-dom';
import Loading from './components/Loading';
import Note from './pages/Auth/Note';
import ProtectedRoute from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Customers = React.lazy(() => import("./pages/Customers"));
const Components = React.lazy(() => import("./pages/Components"));
const CustomerDetail = React.lazy(() => import("./pages/CustomerDetail"));
const Products = React.lazy(() => import("./pages/Products"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
const FiturXyz = React.lazy(() => import("./pages/FiturXyz"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));
const Login = React.lazy(() => import("./pages/Auth/Login"));
const Register = React.lazy(() => import("./pages/Auth/Register"));
const Forgot = React.lazy(() => import("./pages/Auth/Forgot"));
const PingDB = React.lazy(() => import("./pages/Debug/PingDB"));
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));


function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/debug/ping" element={<PingDB />} />

        {/* ─── PROTECTED: Harus login dulu ─── */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/:id" element={<CustomerDetail />} />
            <Route path="/components" element={<Components />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/fitur-xyz" element={<FiturXyz />} />
            <Route path="/notes" element={<Note />} />
            <Route path="/error/400" element={<ErrorPage code="400" description="Bad Request - Permintaan tidak valid" />} />
            <Route path="/error/401" element={<ErrorPage code="401" description="Unauthorized - Anda tidak memiliki akses" />} />
            <Route path="/error/403" element={<ErrorPage code="403" description="Forbidden - Akses dilarang" />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>

        {/* ─── GUEST ONLY: Jika sudah login → redirect ke dashboard ─── */}
        <Route element={<GuestRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
          </Route>
        </Route>

      </Routes>
    </Suspense>
  );
}

export default App;