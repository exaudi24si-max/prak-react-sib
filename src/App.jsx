import React, { Suspense } from 'react';
import reactlogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import "./assets/tailwind.css";
import { Route, Routes } from 'react-router-dom';
import Loading from './components/Loading';

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Customers = React.lazy(() => import("./pages/Customers"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));
const Login = React.lazy(() => import("./pages/Auth/Login"));
const Register = React.lazy(() => import("./pages/Auth/Register"));
const Forgot = React.lazy(() => import("./pages/Auth/Forgot"));
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/error/400" element={<ErrorPage code="400" description="Bad Request - Permintaan tidak valid" />} />
          <Route path="/error/401" element={<ErrorPage code="401" description="Unauthorized - Anda tidak memiliki akses" />} />
          <Route path="/error/403" element={<ErrorPage code="403" description="Forbidden - Akses dilarang" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>
      </Routes>
    </Suspense>

  );
}

export default App;