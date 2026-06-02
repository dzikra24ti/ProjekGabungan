import "../assets/tailwind.css"; 
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PageHeader from "../components/PageHeader";
import { Outlet } from "react-router-dom"; // Pastikan baris ini ADA

function MainLayout() {
  return (
    <div className="bg-gray-100 min-h-screen overflow-x-hidden">
      <Sidebar />

      <div className="flex flex-col min-h-screen ml-20 md:ml-64 transition-all duration-300">
        <Header />

        <main className="p-6 md:p-10"> 
    <Outlet />
  </main>

        <main className="p-4 md:p-8">
          <PageHeader />
          <div className="mt-6">
          </div>
        </main>
      </div>
    </div>
  );
}

export default MainLayout;