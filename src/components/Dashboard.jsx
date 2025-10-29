import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; 

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen relative">
      {/* Mobile portrait */}
      <button
        className="absolute top-4 left-4 md:hidden z-50 bg-gray-800 text-white p-2 rounded"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static bg-gray-100 border-r h-full w-3/4 md:w-1/5 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 p-4 z-40`}
      >
        <h2 className="text-lg font-semibold mb-4">My Account</h2>
        <nav className="flex flex-col space-y-2">

          <NavLink
            to="/dashboard/profile" className={({ isActive }) =>
              `p-2 rounded ${isActive ? "bg-gray-300" : "hover:bg-gray-200"}`}  onClick={() => setSidebarOpen(false)}>
            My Profile
          </NavLink>

          <NavLink to="/dashboard/address" className={({ isActive }) =>
              `p-2 rounded ${isActive ? "bg-gray-300" : "hover:bg-gray-200"}`}  onClick={() => setSidebarOpen(false)}>
          My Addresses</NavLink>

          <NavLink
            to="/dashboard/wishlist" className={({ isActive }) =>
              `p-2 rounded ${isActive ? "bg-gray-300" : "hover:bg-gray-200"}` } onClick={() => setSidebarOpen(false)}>
            Wishlist
          </NavLink>

          <NavLink
            to="/dashboard/orders" className={({ isActive }) =>
              `p-2 rounded ${isActive ? "bg-gray-300" : "hover:bg-gray-200"}`} onClick={() => setSidebarOpen(false)} >
            Order History
          </NavLink>

          <NavLink
            to="/dashboard/cart"
            className={({ isActive }) =>
              `p-2 rounded ${isActive ? "bg-gray-300" : "hover:bg-gray-200"}`} onClick={() => setSidebarOpen(false)}>
            Cart
          </NavLink>

        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Right Content  */}
      <main className="flex-1 p-6 overflow-y-auto md:ml-0 mt-12 md:mt-0">
        <Outlet />
      </main>
    </div>
  );
}
