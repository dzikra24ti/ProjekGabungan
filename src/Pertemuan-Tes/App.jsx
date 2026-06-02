  import React, { Suspense } from "react"; // Tambahkan ini
  import Loading from "./components/Loading";
  const Sidebar = React.lazy(() => import("./components/Sidebar"))
  const Header = React.lazy(() => import("./components/Header"))
  const PageHeader = React.lazy(() => import("./components/PageHeader"))
  const Dashboard = React.lazy(() => import("./pages/Dashboard"))
  const Riwayat = React.lazy(() => import("./pages/Riwayat"))
  const Pengeluaran = React.lazy(() => import("./pages/Pengeluaran"))
  const Laporan = React.lazy(() => import("./pages/Laporan"))
  const NotFound = React.lazy(() => import("./pages/Notfound"))
  import MainLayout from "./layouts/MainLayout";
  import AuthLayout from "./layouts/AuthLayout";
  const Login = React.lazy(() => import("./pages/auth/Login"))
  const Forgot = React.lazy(() => import("./pages/auth/Forgot"))
  const Register = React.lazy(() => import("./pages/auth/Register"))
  import { Route, Routes } from "react-router-dom";

  function App() {
    return (
      <Suspense fallback={<Loading />}>
      <Routes>
          <Route path="/" element={<Login />} />
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/riwayat" element={<Riwayat />} />
          <Route path="/pengeluaran" element={<Pengeluaran />} />
          <Route path="/laporan" element={<Laporan />} />
        </Route>

        <Route path="*" element={<NotFound />} />

        <Route element={<AuthLayout/>}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register/>} />
              <Route path="/forgot" element={<Forgot/>} />
          </Route>

      </Routes>
      </Suspense>
    );
  }
  export default App;