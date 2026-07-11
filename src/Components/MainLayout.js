import React from 'react'
import { Sidebar } from './Sidebar'
import {Outlet} from 'react-router'
export const MainLayout = () => {
    return (
        <div className='flex h-screen'>

            <Sidebar />

            <div className="flex-1 h-screen">
                <Outlet />
            </div>

        </div>
    )
}
