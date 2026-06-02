import "../assets/tailwind.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PageHeader from "../components/PageHeader";
import { Outlet } from "react-router-dom";
function MainLayout() {
  return (
    <div id="app-container" className="bg-gray-100 min-h-screen flex">
      <div id="layout-wrapper" className="flex flex-row flex-1">
        <Sidebar />
        <div id="main-content" className="flex-1 p-4">
          <Header />
          <PageHeader />

          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
