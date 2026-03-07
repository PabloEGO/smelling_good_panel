import React from 'react'
import { NavLink } from 'react-router'
export const Sidebar = () => {
  return (
    <div className='w-64 bg-gray-500 h-screen p-4'>
        <nav className='flex flex-col gap-3'>
            <NavLink to= "perfumes">Perfumes</NavLink>
            <NavLink to="marcas">Marcas</NavLink>
        </nav>
    </div>
  )
}


