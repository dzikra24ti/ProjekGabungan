import "./assets/tailwind.css";
import React, { Suspense } from "react";
import Loading from "./components/Loading";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout"; 
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
  const Sidebar = React.lazy(() => import("./components/Sidebar"))
  const Header = React.lazy(() => import("./components/Header"))
  const PageHeader = React.lazy(() => import("./components/PageHeader"))
  const Dashboard = React.lazy(() => import("./pages/Dashboard"))
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
          <Suspense fallback={<Loading />}>
          <Routes>
          <Route element={<MainLayout/>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="*" element={<NotFound />} />
            </Route>

          <Route element={<AuthLayout/>}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/forgot" element={<Forgot/>} />
          </Route>
          </Routes>
          </Suspense>
  )
}

