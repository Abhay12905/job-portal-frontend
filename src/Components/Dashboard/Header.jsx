import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function Header({ toggleSidebar }) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const ref = useRef();

  // ✅ Get user from localStorage
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUser({
          name: storedUser.name || "User",
          avatar: storedUser.avatar || null
        });
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">

      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button 
          className="md:hidden text-gray-600 text-xl"
          onClick={toggleSidebar}
        >
          ☰
        </button>

        <div className="text-xl font-bold text-blue-600">
          JobFinder
        </div>
      </div>

      {/* CENTER */}
      <div className="hidden md:flex gap-6 text-gray-600">
        <Link to="/dashboard" className="hover:text-blue-500">Home</Link>
        <Link to="/about" className="hover:text-blue-500">About</Link>
        <Link to="/services" className="hover:text-blue-500">Services</Link>
        <Link to="/contact" className="hover:text-blue-500">Contact</Link>
      </div>

      {/* RIGHT */}
      <div ref={ref} className="relative flex items-center gap-3">

        {/* Profile */}
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img
            src={user?.logo}
            alt="profile"
            className="w-9 h-9 rounded-full border"
          />

          <span className="text-gray-700 font-medium hidden sm:block">
            {user?.name || "User"}
          </span>
        </div>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg w-48 py-2 z-50">

            <button
              onClick={() => navigate("/profile")}
              className="dropdown-item"
            >
              Profile
            </button>

            <button
              onClick={() => navigate("/settings")}
              className="dropdown-item"
            >
              Settings
            </button>

            <button
              onClick={() => navigate("/forgot-password")}
              className="dropdown-item"
            >
              Forgot Password
            </button>

            <hr className="my-2" />

            <button
              onClick={handleLogout}
              className="dropdown-item text-red-500"
            >
              Logout
            </button>
          </div>
        )}

        <style>{`
          .dropdown-item {
            width: 100%;
            text-align: left;
            padding: 10px 14px;
            font-size: 14px;
            color: #374151;
          }

          .dropdown-item:hover {
            background: #f3f4f6;
          }
        `}</style>
      </div>
    </div>
  );
}

export default Header;