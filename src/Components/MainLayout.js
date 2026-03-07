import React from 'react'
import { Sidebar } from './Sidebar'
import {Outlet} from 'react-router'
export const MainLayout = () => {
    return (
        <div className='flex'>

            <Sidebar />

            <div className="flex-1">
                <Outlet />
            </div>

        </div>
    )
}
