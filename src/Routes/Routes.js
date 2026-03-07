import React from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router'
import { MainLayout } from '../Components/MainLayout'
import { ListadoMarcas } from '../Components/ListadoMarcas'
import { Test1 } from '../Components/Test1'
import { Test2 } from '../Components/Test2'
import ListadoPerfumes from '../Components/ListadoPerfumes'
import PanelPerfumes from '../Components/PanelPerfumes'
export const RutasApp = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<MainLayout />}>

                        <Route index element={<Navigate to="/perfumes" replace />} />
                        
                        <Route index element={<ListadoPerfumes />} />
                        {/* <Route path='perfumes' element={<ListadoPerfumes />} /> */}
                        <Route path='add' element={<PanelPerfumes />} />

                        <Route path='perfumes'>

                            <Route index element={<ListadoPerfumes />} />

                            <Route path='add' element={<PanelPerfumes />} />

                        </Route>
                        {/* <Route path='perfumes/add' element={<PanelPerfumes />} /> */}

                        <Route path='marcas' element={<ListadoMarcas />} />

                        {/* <Route path='test1' element={<Test1 />} />
                        <Route path='test2' element={<ListadoPerfumes />} /> */}
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
