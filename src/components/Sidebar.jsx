import { BiNote } from "react-icons/bi";
import { MdDashboard, MdShoppingCart, MdPeople, MdInventory, MdAdd, MdErrorOutline, MdApps, MdLogout } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { signOutUser } from "../services/supabaseService";

export default function Sidebar() {
  const navigate = useNavigate()

  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-4 space-x-2
        ${
          isActive
            ? "text-blue bg-green-200 font-extrabold"
            : "text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
        }`;

  const handleLogout = async () => {
    await signOutUser()
    navigate("/login")
  }

  return (
    <div
      id="sidebar"
      className="flex flex-col min-h-screen w-90 bg-white p-10 shadow-lg"
    >
      <div id="sidebar-logo" className="flex flex-col">
        <span id="logo-title" className="font-poppins text-[48px] text-gray-900">
          Sedap <b id="logo-dot" className="text-hijau">.</b>
        </span>
        <span id="logo-subtitle" className="font-semibold text-gray-400">
          Modern Admin Dashboard
        </span>
      </div>

      <div id="sidebar-menu" className="mt-10">
        <ul id="menu-list" className="space-y-3">
          <li>
            <NavLink id="menu-1" to="/" className={menuClass}>
              <MdDashboard className="mr-4 text-xl" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink id="menu-2" to="/orders" className={menuClass}>
              <MdShoppingCart className="mr-4 text-xl" />
              <span>Orders</span>
            </NavLink>
          </li>
          <li>
            <NavLink id="menu-3" to="/customers" className={menuClass}>
              <MdPeople className="mr-4 text-xl" />
              <span>Customers</span>
            </NavLink>
          </li>
          <li>
            <NavLink id="menu-components" to="/components" className={menuClass}>
              <MdApps className="mr-4 text-xl" />
              <span>Components</span>
            </NavLink>
          </li>
          <li>
            <NavLink id="menu-4" to="/products" className={menuClass}>
              <MdInventory className="mr-4 text-xl" />
              <span>Products</span>
            </NavLink>
          </li>
          <li>
            <NavLink id="menu-fitur-xyz" to="/fitur-xyz" className={menuClass}>
              <MdApps className="mr-4 text-xl" />
              <span>Fitur XYZ</span>
            </NavLink>
          </li>
          <li>
            <NavLink id="menu-notes" to="/notes" className={menuClass}>
              <BiNote className="mr-4 text-xl" />
              <span>Note</span>
            </NavLink>
          </li>
          {/* Menu Error */}
          <li>
            <NavLink to="/error/400" className={menuClass}>
              <MdErrorOutline className="mr-4 text-xl" />
              <span>Error 400</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/error/401" className={menuClass}>
              <MdErrorOutline className="mr-4 text-xl" />
              <span>Error 401</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/error/403" className={menuClass}>
              <MdErrorOutline className="mr-4 text-xl" />
              <span>Error 403</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div id="sidebar-footer" className="mt-auto">
        <div className="bg-hijau px-4 py-2 rounded-md shadow-lg mb-10 flex items-center">
          <div className="text-white text-sm">
            <span>Please organize your menus through button below!</span>
            <div className="flex justify-center items-center p-2 mt-2 bg-white rounded-md space-x-2">
              <MdAdd className="text-gray-500" />
              <span className="text-gray-500">Add Menus</span>
            </div>
          </div>
          <img className="w-20 h-20 rounded-full ml-4" src="https://avatar.iran.liara.run/public/28" alt="avatar" />
        </div>

        {/* Tombol Logout */}
        <button
          id="logout-button"
          onClick={handleLogout}
          className="flex items-center w-full rounded-xl p-4 space-x-2 text-red-500 hover:bg-red-50 hover:font-semibold transition-colors mb-4"
        >
          <MdLogout className="mr-4 text-xl" />
          <span>Logout</span>
        </button>

        <span className="font-bold text-gray-400">Sedap Restaurant Admin Dashboard</span>
        <p className="font-light text-gray-400">&copy; 2025 All Right Reserved</p>
      </div>
    </div>
  );
}