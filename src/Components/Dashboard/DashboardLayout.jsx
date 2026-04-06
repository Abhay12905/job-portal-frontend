import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">

      <Header toggleSidebar={() => setIsOpen(!isOpen)} />

      <div className="flex">

        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        <div className="flex-1 p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default DashboardLayout;