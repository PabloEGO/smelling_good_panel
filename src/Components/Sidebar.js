import React from 'react'
import { NavLink } from 'react-router'
export const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-[#0b0f14] text-white flex flex-col justify-between p-4">
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center font-bold text-black">
            S
          </div>
          <div>
            <h1 className="text-sm font-bold leading-none">
              SMELLING GOOD
            </h1>
            <p className="text-[10px] text-yellow-500">
              Nombre Usuario
            </p>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          {/* <NavLink to="perfumes">
            <button className="flex items-center gap-3 px-4 py-2 rounded-lg bg-yellow-600/20 text-yellow-400">
              <span>📦</span>
              Perfumes
            </button>
          </NavLink> */}
          <NavLink
            to="/perfumes" end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg ${isActive ? "bg-yellow-600/20 text-yellow-400" : "text-white"
              }`
            }
          >
            Perfumes
          </NavLink>

          {/* <NavLink to="marcas">
            <button className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/5 transition">
              <span>🏷️</span>
              Marcas
            </button>
          </NavLink> */}
          <NavLink to="/marcas" className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg ${isActive ? "bg-yellow-600/20 text-yellow-400" : "text-white"
              }`
            }
          >
            Marcas
          </NavLink>
        </nav>
      </div>

      {/* Bottom */}
      <div>
        <button className="flex items-center gap-3 text-red-400 hover:bg-red-500/10 px-4 py-2 rounded-lg transition w-full">
          <span>🚪</span>
          Cerrar sesión
        </button>
      </div>

    </div>
  )
}


