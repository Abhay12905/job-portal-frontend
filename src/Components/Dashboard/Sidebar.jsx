import { Link } from "react-router-dom";
import { navitem } from "./navitems";
import { useContext } from "react";
import { Authcontext } from "../../Authcontext/Authcontext";

export default function Sidebar({ isOpen, setIsOpen }) {

  const { role } = useContext(Authcontext);

  const visibleitems = navitem.filter((tab) =>
    tab.allowedRole.includes(role)
  );

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`fixed md:static top-0 left-0 w-64 bg-white shadow-xl p-6 transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
      >
        <h2 className="text-xl font-bold text-gray-700 mb-8">Dashboard</h2>

        <ul className="space-y-3 text-gray-600">

          {visibleitems.map((item) => (
            <li
              key={item.path}
              className="p-3 rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-200 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}

        </ul>
      </div>
    </>
  );
}