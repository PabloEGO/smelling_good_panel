import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { PrivateRoute } from './PrivateRoute'
import { MainLayout } from '../Components/MainLayout'
import { ListadoMarcas } from '../Components/ListadoMarcas'
import ListadoPerfumes from '../Components/ListadoPerfumes'
import PanelPerfumes from '../Components/PanelPerfumes'
import { Login } from '../Components/Login'
import { NoFound } from '../Components/NoFound'
export const RutasApp = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />}></Route>
                    <Route path='*' element={<NoFound />} />
                        <Route path='/main' element={
                            <PrivateRoute>
                            <MainLayout />
                            </PrivateRoute>}>
                            <Route index element={<ListadoPerfumes />} />
                            <Route path='add' element={<PanelPerfumes />} />
                            <Route path='perfumes'>
                                <Route index element={<ListadoPerfumes />} />
                                <Route path='add' element={<PanelPerfumes />} />
                            </Route>
                            <Route path='marcas' element={<ListadoMarcas />} />
                        </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
